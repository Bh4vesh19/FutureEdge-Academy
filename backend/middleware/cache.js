/**
 * Response Caching Middleware
 * Prevents duplicate OpenAI calls for identical messages
 */

const cache = new Map()

function hashMessage(userId, message) {
    return `${userId}:${message.trim().toLowerCase()}`
}

function cacheMiddleware(req, res, next) {
    const userId = req.ip || req.connection.remoteAddress
    const { message } = req.body

    if (!message) {
        return next()
    }

    const cacheKey = hashMessage(userId, message)
    const cachedResponse = cache.get(cacheKey)

    if (cachedResponse) {
        console.log('Cache hit for message:', message.substring(0, 30))
        return res.json(cachedResponse)
    }

    // Store original send function
    const originalSend = res.json.bind(res)

    // Override send to cache successful responses
    res.json = (data) => {
        if (data.reply && !data.reply.includes('⚠️') && !data.reply.includes('⏳')) {
            // Only cache successful responses, not errors
            cache.set(cacheKey, data)

            // Auto-expire after 10 minutes
            setTimeout(() => cache.delete(cacheKey), 600000)

            // Clean up old entries (keep only last 500)
            if (cache.size > 500) {
                const oldestKey = cache.keys().next().value
                cache.delete(oldestKey)
            }
        }
        return originalSend(data)
    }

    next()
}

module.exports = cacheMiddleware
