/**
 * Rate Limiting Middleware
 * Refinement #3: Suppress duplicate rate-limit messages within 5 seconds
 */

const { getErrorMessage } = require('../utils/languageDetector')

// Track user requests
const userRequests = new Map()
// Track last rate-limit message time (Refinement #3)
const lastRateLimitMessages = new Map()

function rateLimitMiddleware(req, res, next) {
    const userId = req.ip || req.connection.remoteAddress
    const now = Date.now()
    const lastRequest = userRequests.get(userId) || 0

    // Check if within cooldown period (3 seconds)
    if (now - lastRequest < 3000) {
        // Refinement #3: Don't repeat rate limit message within 5 seconds
        const lastRateLimitMsg = lastRateLimitMessages.get(userId) || 0
        if (now - lastRateLimitMsg < 5000) {
            // Suppress duplicate message, just return 429 without body
            return res.status(429).json({
                reply: "",  // Empty to suppress on frontend
                language: req.detectedLanguage || 'en'
            })
        }

        // Send rate limit message
        lastRateLimitMessages.set(userId, now)
        return res.status(429).json({
            reply: getErrorMessage('rate_limit', req.detectedLanguage || 'en'),
            language: req.detectedLanguage || 'en'
        })
    }

    // Update last request time
    userRequests.set(userId, now)

    // Clean up old entries (keep only last 1000 users)
    if (userRequests.size > 1000) {
        const oldestUser = userRequests.keys().next().value
        userRequests.delete(oldestUser)
        lastRateLimitMessages.delete(oldestUser)
    }

    next()
}

module.exports = rateLimitMiddleware
