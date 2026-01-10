import { useState, useRef, useEffect, useCallback, memo } from 'react'

// API Configuration
const LLM_API_URL = 'https://backend.buildpicoapps.com/aero/run/llm-api?pk=v1-Z0FBQUFBQnBZZ1lXZ2FhdHk1UGZLTGkxbnVUaVlRVy1zTk1hejBKMHdRaVNDSEFWUkgwc2x6RkZCYTJCOXNmQ2lmaUNPUUhITGxtU2N4QUJEck1KdWNYZzN4SG5oMzUtaUE9PQ=='
const API_TIMEOUT = 8000
const MAX_RETRIES = 1

// Compact system prompt
const SYSTEM_PROMPT = `You are FutureEdge AI for FutureEdge Academy. Be helpful, friendly, concise. Answer in user's language (English/Hindi/Hinglish). Help with courses, academics, general questions. Never discuss APIs/security.`

// Blocked keywords
const BLOCKED = ['api key', 'apikey', 'secret', 'token', 'password', 'hack', 'exploit', 'vulnerability']

// Memoized Message Component - prevents re-render of unchanged messages
const ChatMessage = memo(({ message }) => {
    const isUser = message.type === 'user'
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}>
            <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${isUser
                    ? 'bg-blue-600 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-800 rounded-bl-md'
                }`}>
                <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">{message.text}</p>
            </div>
        </div>
    )
})
ChatMessage.displayName = 'ChatMessage'

// Typing Indicator Component
const TypingIndicator = memo(() => (
    <div className="flex justify-start mb-3">
        <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
            <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
        </div>
    </div>
))
TypingIndicator.displayName = 'TypingIndicator'

// Bot Icon Component
const BotIcon = memo(() => (
    <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6" stroke="#3B82F6" strokeWidth="1.5">
        <rect x="4" y="8" width="16" height="11" rx="3" />
        <circle cx="9" cy="13.5" r="1.5" fill="#3B82F6" stroke="none" />
        <circle cx="15" cy="13.5" r="1.5" fill="#3B82F6" stroke="none" />
        <path d="M10 17h4" strokeLinecap="round" />
        <path d="M12 4v4" strokeLinecap="round" />
        <circle cx="12" cy="3" r="1" fill="#3B82F6" stroke="none" />
    </svg>
))
BotIcon.displayName = 'BotIcon'

const AiAssistant = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [isTyping, setIsTyping] = useState(false)

    // Refs for performance
    const messagesEndRef = useRef(null)
    const inputRef = useRef(null)
    const abortControllerRef = useRef(null)
    const messageIdRef = useRef(0)

    // Scroll to bottom - optimized
    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, [])

    // Effect: scroll on new messages
    useEffect(() => {
        scrollToBottom()
    }, [messages.length, scrollToBottom])

    // Effect: initialize on open
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{
                id: ++messageIdRef.current,
                type: 'ai',
                text: "Hi! 👋 I'm FutureEdge AI.\n\nHow can I help you today?",
            }])
            // Focus input after render
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen, messages.length])

    // Toggle chat - memoized
    const toggleChat = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

    // Check blocked query
    const isBlocked = useCallback((msg) => {
        const lower = msg.toLowerCase()
        return BLOCKED.some(k => lower.includes(k))
    }, [])

    // API call with abort and timeout
    const callAPI = useCallback(async (prompt, signal) => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT)

        try {
            const response = await fetch(LLM_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: SYSTEM_PROMPT + '\nUser: ' + prompt }),
                signal: signal || controller.signal
            })
            clearTimeout(timeoutId)
            const data = await response.json()
            return data.status === 'success' ? data.text : null
        } catch (error) {
            clearTimeout(timeoutId)
            if (error.name === 'AbortError') return null
            throw error
        }
    }, [])

    // Send message - optimized with abort
    const handleSend = useCallback(async (e) => {
        e?.preventDefault()
        const message = inputValue.trim()
        if (!message || isTyping) return

        // Abort any pending request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort()
        }
        abortControllerRef.current = new AbortController()

        // Add user message instantly (optimistic)
        const userMsgId = ++messageIdRef.current
        setMessages(prev => [...prev, { id: userMsgId, type: 'user', text: message }])
        setInputValue('')
        setIsTyping(true)

        // Check blocked
        if (isBlocked(message)) {
            setMessages(prev => [...prev, {
                id: ++messageIdRef.current,
                type: 'ai',
                text: "I'm here to help with learning! 📚 Ask about courses or academics."
            }])
            setIsTyping(false)
            return
        }

        // Call API with retry
        let response = null
        let retries = 0

        while (!response && retries <= MAX_RETRIES) {
            try {
                response = await callAPI(message, abortControllerRef.current.signal)
            } catch {
                retries++
                if (retries > MAX_RETRIES) break
            }
        }

        // Add AI response
        setMessages(prev => [...prev, {
            id: ++messageIdRef.current,
            type: 'ai',
            text: response || "Sorry, I couldn't respond. Please try again! 🙏"
        }])
        setIsTyping(false)
    }, [inputValue, isTyping, isBlocked, callAPI])

    // Input change - direct, no debounce needed for controlled input
    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value)
    }, [])

    // Handle enter key
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }, [handleSend])

    return (
        <>
            {/* Floating Button - Minimal, fast render */}
            <button
                onClick={toggleChat}
                className="fixed bottom-4 right-4 z-[9999] w-14 h-14 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center transition-transform duration-150 hover:scale-105 active:scale-95"
                aria-label="Toggle AI Assistant"
            >
                {isOpen ? (
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <BotIcon />
                )}
            </button>

            {/* Chat Panel - Responsive */}
            {isOpen && (
                <div className="fixed z-[9999] bg-white shadow-xl flex flex-col
                    bottom-0 right-0 w-full h-full
                    sm:bottom-20 sm:right-4 sm:w-[380px] sm:h-[520px] sm:max-h-[calc(100vh-100px)] sm:rounded-2xl sm:border sm:border-gray-200">

                    {/* Header - Light, no heavy gradients */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50 sm:rounded-t-2xl">
                        <div>
                            <h3 className="font-semibold text-gray-800 text-base">FutureEdge AI</h3>
                            <p className="text-xs text-gray-500">Your Study Assistant</p>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="w-8 h-8 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages - Optimized scroll */}
                    <div className="flex-1 overflow-y-auto px-4 py-3 overscroll-contain">
                        {messages.map(msg => (
                            <ChatMessage key={msg.id} message={msg} />
                        ))}
                        {isTyping && <TypingIndicator />}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input - Sticky, large tap targets */}
                    <form onSubmit={handleSend} className="p-3 border-t border-gray-100 bg-white sm:rounded-b-2xl">
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask anything..."
                                disabled={isTyping}
                                className="flex-1 min-h-[44px] px-4 bg-gray-50 border border-gray-200 rounded-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 disabled:opacity-60 transition-colors"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim() || isTyping}
                                className="min-w-[44px] min-h-[44px] rounded-full bg-blue-600 text-white flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors hover:bg-blue-500 active:bg-blue-700"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    )
}

export default memo(AiAssistant)
