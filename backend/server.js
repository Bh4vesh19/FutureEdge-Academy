/**
 * Main Express Server
 * Production-ready AI backend service with proper CORS and logging
 */

require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const chatRouter = require('./routes/chat')
const rateLimitMiddleware = require('./middleware/rateLimit')
const cacheMiddleware = require('./middleware/cache')

const app = express()
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

// Security middleware
app.use(helmet())

// CORS configuration - FIX #3: Proper CORS setup
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Body parser
app.use(express.json())

// Request logging middleware - FIX #6: Log all incoming requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
    next()
})

// Health check endpoint - FIX #1: Backend verification
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'FutureEdge AI Backend'
    })
})

// Apply rate limiting and caching to all API routes
app.use('/api', rateLimitMiddleware)
app.use('/api', cacheMiddleware)

// Routes
app.use('/api', chatRouter)

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Endpoint not found',
        path: req.path
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err)
    res.status(500).json({
        reply: "⚠️ Something went wrong. Please try again.",
        language: 'en'
    })
})

// Start server
app.listen(PORT, () => {
    console.log('\n🚀 ====================================')
    console.log(`   AI Backend Server RUNNING`)
    console.log(`   Port: ${PORT}`)
    console.log(`   URL: http://localhost:${PORT}`)
    console.log(`   Frontend: ${FRONTEND_URL}`)
    console.log(`   Health: http://localhost:${PORT}/health`)
    console.log(`   API: http://localhost:${PORT}/api/chat`)
    console.log('==================================== 🚀\n')
})
