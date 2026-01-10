/**
 * OpenAI Service
 * Handles all OpenAI API interactions with smart retry logic
 * Refinements #2, #4, #5: Response deduplication, smart retry, performance optimization
 */

const OpenAI = require('openai')

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

const SYSTEM_PROMPT = `You are FutureEdge AI — a fast, friendly, multilingual student assistant.

Rules:
- Answer ALL questions, not only academic.
- If user asks general knowledge, answer it fully.
- Detect the user's language automatically.
- Reply in the SAME language as the user.
- If user writes in Hindi → reply in Hindi.
- If user writes in Hinglish → reply in Hinglish.
- Be friendly, human, and supportive.
- Use light humor occasionally (no slang, no abuse).
- NEVER repeat the same response.
- NEVER say "I can help you with…".
- Always try to answer directly.
- If question is unclear, politely ask for clarification.

Tone:
- Calm
- Student-friendly
- Clear explanations
- Short paragraphs
- Examples when useful

Speed priority:
- Keep answers concise unless user asks for details.

You are NOT a demo bot.
You are a real assistant like ChatGPT.`

// Response hash tracking (Refinement #2)
const userResponseHashes = new Map()

function hashString(str) {
    let hash = 0
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + char
        hash = hash & hash // Convert to 32bit integer
    }
    return hash.toString()
}

/**
 * Call OpenAI with retry logic
 * Refinement #4: Only retry for 429 and timeout, not for invalid key/malformed requests
 */
async function callOpenAIWithRetry(messages, temperature = 0.6, retries = 1) {
    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000) // 8 second timeout

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: messages,
            temperature: temperature,
            max_tokens: 400, // Refinement #5: max 400 for speed
        }, { signal: controller.signal })

        clearTimeout(timeoutId)
        return completion.choices[0].message.content

    } catch (error) {
        // Refinement #4: Smart retry logic
        const shouldRetry = (error.status === 429 || error.name === 'AbortError') && retries > 0

        if (shouldRetry) {
            console.log(`Retrying after ${error.status === 429 ? '429' : 'timeout'}...`)
            await new Promise(resolve => setTimeout(resolve, 2000)) // Wait 2 seconds
            return callOpenAIWithRetry(messages, temperature, retries - 1)
        }

        // Don't retry for invalid key, malformed request, etc.
        throw error
    }
}

/**
 * Generate AI response with deduplication
 * Refinement #2: Check if response is same as last one, regenerate if needed
 */
async function generateAIResponse(userId, userMessage, conversationHistory, detectedLanguage) {
    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: 'user', content: userMessage }
    ]

    try {
        // First attempt with normal temperature
        let response = await callOpenAIWithRetry(messages, 0.6, 1)

        // Refinement #2: Check for duplicate response
        const responseHash = hashString(response)
        const lastHash = userResponseHashes.get(userId)

        if (lastHash === responseHash) {
            console.log('Duplicate response detected, regenerating with higher temperature...')
            // Force regeneration with slightly higher temperature
            response = await callOpenAIWithRetry(messages, 0.7, 1)
        }

        // Store new response hash
        userResponseHashes.set(userId, hashString(response))

        // Clean up old hashes (keep only last 100 users)
        if (userResponseHashes.size > 100) {
            const firstKey = userResponseHashes.keys().next().value
            userResponseHashes.delete(firstKey)
        }

        return response

    } catch (error) {
        console.error('OpenAI API Error:', error)

        // Refinement #4: Graceful error messages, not generic fallback
        if (error.status === 401 || error.message?.includes('API key')) {
            throw new Error('API_KEY_ERROR')
        } else if (error.status === 429) {
            throw new Error('RATE_LIMIT_ERROR')
        } else if (error.name === 'AbortError') {
            throw new Error('TIMEOUT_ERROR')
        } else {
            throw new Error('GENERAL_ERROR')
        }
    }
}

module.exports = {
    generateAIResponse
}
