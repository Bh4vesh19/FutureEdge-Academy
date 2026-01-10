import { useState, useRef, useEffect } from 'react'

// Single source of truth for API URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const API_CHAT_URL = `${API_BASE_URL}/api/chat`
const API_HEALTH_URL = `${API_BASE_URL}/health`

// Log configuration once
console.log('[AI Assistant] API Base URL:', API_BASE_URL)
console.log('[AI Assistant] Backend Health:', API_HEALTH_URL)

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('connecting') // 'connecting', 'online', 'offline'
    const messagesEndRef = useRef(null)
    const lastRequestRef = useRef(0)
    const healthCheckAttempts = useRef(0)
    const MAX_HEALTH_ATTEMPTS = 10

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Robust health check with max retries
    useEffect(() => {
        const checkHealth = async () => {
            healthCheckAttempts.current += 1
            console.log(`[Health Check] Attempt ${healthCheckAttempts.current}/${MAX_HEALTH_ATTEMPTS}`)

            try {
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 20000) // 20s for Render cold start

                const res = await fetch(API_HEALTH_URL, {
                    signal: controller.signal,
                    mode: 'cors'
                })

                clearTimeout(timeoutId)

                if (res.ok) {
                    const data = await res.json()
                    if (data.status === 'ok') {
                        setConnectionStatus('online')
                        console.log('[Health Check] ✅ Backend ONLINE')
                        return true
                    }
                }

                throw new Error('Invalid health response')
            } catch (error) {
                console.log(`[Health Check] ❌ Failed (attempt ${healthCheckAttempts.current}):`, error.message)

                if (healthCheckAttempts.current >= MAX_HEALTH_ATTEMPTS) {
                    setConnectionStatus('offline')
                    console.log('[Health Check] Max attempts reached. Backend offline.')
                    return false
                }

                setConnectionStatus('connecting')
                return false
            }
        }

        // Initial check
        checkHealth()

        // Retry every 3 seconds until online or max attempts
        const retryInterval = setInterval(async () => {
            if (connectionStatus !== 'online' && healthCheckAttempts.current < MAX_HEALTH_ATTEMPTS) {
                await checkHealth()
            } else if (connectionStatus === 'online') {
                clearInterval(retryInterval)
            }
        }, 3000)

        return () => clearInterval(retryInterval)
    }, [connectionStatus])

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: Date.now(),
                type: 'ai',
                text: "Hi! 👋 I'm FutureEdge AI.\n\nAsk me anything — studies, tech, general questions, or doubts in any language.",
                timestamp: new Date()
            }])
        }
    }, [isOpen])

    const handleSend = async (e) => {
        e.preventDefault()
        if (!inputValue.trim() || isTyping || connectionStatus !== 'online') return

        const now = Date.now()
        if (now - lastRequestRef.current < 2000) return
        lastRequestRef.current = now

        const userMsg = {
            id: Date.now(),
            type: 'user',
            text: inputValue.trim(),
            timestamp: new Date()
        }
        setMessages(prev => [...prev, userMsg])
        setInputValue('')
        setIsTyping(true)

        try {
            const history = messages
                .filter(m => m.type !== 'system')
                .map(m => ({ role: m.type === 'user' ? 'user' : 'assistant', content: m.text }))

            const res = await fetch(API_CHAT_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg.text, history }),
                signal: AbortSignal.timeout(30000)
            })

            const data = await res.json()

            if (data.reply) {
                setMessages(prev => [...prev, {
                    id: Date.now() + 1,
                    type: 'ai',
                    text: data.reply,
                    timestamp: new Date()
                }])
            }
        } catch (error) {
            console.error('[AI Chat] Error:', error)
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'ai',
                text: error.name === 'TimeoutError'
                    ? "⏳ Request timed out. Please try again."
                    : "⚠️ Could not process request. Please try again.",
                timestamp: new Date()
            }])
        } finally {
            setIsTyping(false)
        }
    }

    const handleRetry = () => {
        healthCheckAttempts.current = 0
        setConnectionStatus('connecting')
    }

    const statusConfig = {
        online: { icon: '🟢', text: 'AI Online', color: 'from-blue-600 to-teal-500' },
        connecting: { icon: '🟡', text: 'Connecting…', color: 'from-blue-500 to-blue-600' },
        offline: { icon: '🔴', text: 'Offline', color: 'from-gray-500 to-gray-600' }
    }

    const currentStatus = statusConfig[connectionStatus]

    return (
        <>
            {/* Floating AI Button - Fixed Bottom Right */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-[9999] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
                aria-label="Open AI Assistant"
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </button>

            {/* Chat Panel */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-[9999] w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
                    style={{ height: 'min(600px, calc(100vh - 140px))' }}>

                    {/* Header */}
                    <div className={`bg-gradient-to-r ${currentStatus.color} text-white p-4 rounded-t-2xl flex justify-between items-center`}>
                        <div>
                            <h3 className="font-semibold text-lg">FutureEdge AI</h3>
                            <p className="text-xs flex items-center gap-1">
                                <span>{currentStatus.icon}</span>
                                <span>{currentStatus.text}</span>
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-8 h-8 rounded-full hover:bg-white/20 transition-colors flex items-center justify-center"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-xl px-4 py-2 ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-sm'
                                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-sm shadow-sm'
                                    }`}>
                                    <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-slate-200 rounded-xl rounded-bl-sm px-4 py-3 shadow-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {connectionStatus === 'offline' && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleRetry}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                                >
                                    Retry Connection
                                </button>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={connectionStatus === 'online' ? "Type your question..." : connectionStatus === 'connecting' ? "Connecting to AI..." : "Offline"}
                                disabled={isTyping || connectionStatus !== 'online'}
                                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-slate-100"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping || connectionStatus !== 'online'}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors font-medium text-sm"
                            >
                                {isTyping ? "Thinking..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default AiAssistant
