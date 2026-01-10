import { useState, useRef, useEffect } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const API_CHAT_URL = `${API_BASE_URL}/api/chat`
const API_HEALTH_URL = `${API_BASE_URL}/health`

// Log API URL once on module load
console.log('[AiAssistant] API Base URL:', API_BASE_URL)
console.log('[AiAssistant] Health URL:', API_HEALTH_URL)

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isOnline, setIsOnline] = useState(false)
    const [connectionStatus, setConnectionStatus] = useState('connecting') // 'connecting', 'online', 'offline'
    const messagesEndRef = useRef(null)
    const lastRequestRef = useRef(0)
    const healthCheckAttempted = useRef(false)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    // Health check - runs ONCE on mount with proper timeout
    useEffect(() => {
        if (healthCheckAttempted.current) return

        const checkHealth = async () => {
            console.log('[Health Check] Starting...')
            setConnectionStatus('connecting')

            try {
                // 20 second timeout for Render cold start
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 20000)

                const res = await fetch(API_HEALTH_URL, {
                    signal: controller.signal
                })

                clearTimeout(timeoutId)
                const data = await res.json()

                console.log('[Health Check] Response:', data)

                if (data.status === 'ok') {
                    setIsOnline(true)
                    setConnectionStatus('online')
                    console.log('[Health Check] ✅ Backend ONLINE')
                } else {
                    setIsOnline(false)
                    setConnectionStatus('offline')
                    console.log('[Health Check] ⚠️ Backend returned non-OK status')
                }
            } catch (error) {
                console.error('[Health Check] ❌ Failed:', error.message)
                setIsOnline(false)
                setConnectionStatus('offline')
            }
        }

        healthCheckAttempted.current = true
        checkHealth()

        // Set up periodic retry only if offline (every 10 seconds)
        const retryInterval = setInterval(async () => {
            if (!isOnline) {
                console.log('[Health Check] Retrying...')
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 20000)

                try {
                    const res = await fetch(API_HEALTH_URL, { signal: controller.signal })
                    clearTimeout(timeoutId)
                    const data = await res.json()

                    if (data.status === 'ok') {
                        setIsOnline(true)
                        setConnectionStatus('online')
                        console.log('[Health Check] ✅ Reconnected!')
                    }
                } catch (error) {
                    console.log('[Health Check] Retry failed, will try again...')
                }
            }
        }, 10000)

        return () => clearInterval(retryInterval)
    }, [isOnline])

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
        if (!inputValue.trim() || isTyping || !isOnline) return

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
                signal: AbortSignal.timeout(8000)
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

    const statusBadge = isOnline
        ? { icon: '🟢', text: 'AI Online', color: 'from-blue-600 to-teal-500' }
        : { icon: '🟡', text: 'Connecting…', color: 'from-yellow-500 to-orange-500' }

    return (
        <>
            {/* Floating Button - Fixed Bottom Right, Blue Only */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 flex items-center justify-center"
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
                <div className="fixed bottom-24 right-6 z-50 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col"
                    style={{ height: 'min(600px, calc(100vh - 140px))' }}>

                    {/* Header */}
                    <div className={`bg-gradient-to-r ${statusBadge.color} text-white p-4 rounded-t-2xl flex justify-between items-center`}>
                        <div>
                            <h3 className="font-semibold text-lg">FutureEdge AI</h3>
                            <p className="text-xs flex items-center gap-1">
                                <span>{statusBadge.icon}</span>
                                <span>{statusBadge.text}</span>
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
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="p-4 border-t border-slate-200 bg-white rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={isOnline ? "Type your question..." : "Connecting…"}
                                disabled={isTyping || !isOnline}
                                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:bg-slate-100"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping || !isOnline}
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
