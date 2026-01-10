/**
 * Chat API Route
 * Handles all chat requests with language detection and quick responses
 * Refinements #1, #6, #7: Language consistency, greeting handling, friendly errors
 */

const express = require('express')
const router = express.Router()
const { generateAIResponse } = require('../services/openai.service')
const { detectLanguage, getErrorMessage } = require('../utils/languageDetector')
const { isGreeting, getQuickGreeting } = require('../utils/quickResponses')

router.post('/chat', async (req, res) => {
    try {
        const { message, history = [] } = req.body
        const userId = req.ip || req.connection.remoteAddress

        // Input validation
        if (!message || typeof message !== 'string') {
            return res.status(400).json({
                reply: "Please provide a valid message.",
                language: 'en'
            })
        }

        if (message.length > 500) {
            return res.status(400).json({
                reply: "Message is too long. Please keep it under 500 characters.",
                language: 'en'
            })
        }

        // Refinement #1: Detect language ONCE and store in request context
        const detectedLanguage = detectLanguage(message)
        req.detectedLanguage = detectedLanguage

        // Refinement #6: Quick response for greetings (instant, but maintains context)
        if (isGreeting(message) && history.length === 0) {
            return res.json({
                reply: getQuickGreeting(detectedLanguage),
                language: detectedLanguage
            })
        }

        // Generate AI response
        const aiResponse = await generateAIResponse(
            userId,
            message,
            history,
            detectedLanguage
        )

        return res.json({
            reply: aiResponse,
            language: detectedLanguage
        })

    } catch (error) {
        console.error('Chat route error:', error)

        // Refinement #7: Always return friendly AI-style message, never raw errors
        const detectedLanguage = req.detectedLanguage || 'en'

        if (error.message === 'API_KEY_ERROR') {
            return res.status(500).json({
                reply: getErrorMessage('api_error', detectedLanguage),
                language: detectedLanguage
            })
        } else if (error.message === 'RATE_LIMIT_ERROR' || error.message === 'TIMEOUT_ERROR') {
            // Refinement #4: Graceful message after retry failure
            return res.status(503).json({
                reply: getErrorMessage('retry_failed', detectedLanguage),
                language: detectedLanguage
            })
        } else {
            return res.status(500).json({
                reply: getErrorMessage('api_error', detectedLanguage),
                language: detectedLanguage
            })
        }
    }
})

module.exports = router
