# FutureEdge AI Backend

Production-ready backend API service for the FutureEdge Academy AI assistant.

## Features

✅ **ChatGPT-Quality Responses** - Using `gpt-4o-mini` model  
✅ **Multilingual Support** - Auto-detects and matches user language  
✅ **Rate Limiting** - 3-second cooldown per user  
✅ **Response Caching** - Prevents duplicate API calls  
✅ **Smart Retry Logic** - Only retries 429/timeout errors  
✅ **Response Deduplication** - Prevents repeated AI responses  
✅ **Quick Responses** - Instant greetings without API calls  
✅ **Security** - API key protected, CORS enabled, Helmet middleware  

## Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Configure Environment
Create a `.env` file (copy from `.env.example`):
```env
OPENAI_API_KEY=sk-your_actual_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Start Server
```bash
npm start
```

Server will run on `http://localhost:3001`

## API Endpoints

### POST /api/chat
Send a message to the AI assistant.

**Request:**
```json
{
  "message": "What is machine learning?",
  "history": [
    { "role": "user", "content": "Previous message" },
    { "role": "assistant", "content": "Previous response" }
  ]
}
```

**Response:**
```json
{
  "reply": "Machine Learning is...",
  "language": "en"
}
```

### GET /health
Health check endpoint.

## Architecture

```
backend/
├── server.js              # Main Express server
├── routes/
│   └── chat.js            # Chat API route
├── services/
│   └── openai.service.js  # OpenAI API wrapper
├── middleware/
│   ├── rateLimit.js       # Rate limiting
│   └── cache.js           # Response caching  
├── utils/
│   ├── languageDetector.js # Language detection
│   └── quickResponses.js   # Quick greeting handler
└── .env.example           # Environment template
```

## Refinements Implemented

1. **Language Consistency** - Language detected once, used everywhere
2. **Response Deduplication** - Prevents same response repeatedly
3. **Smart Rate Limiting** - Suppresses duplicate messages
4. **Graceful Errors** - Friendly messages, not raw errors
5. **Performance Optimized** - Max 400 tokens, 8s timeout
6. **Quick Greetings** - Instant response for "hi", "hello"
7. **Secure** - API key only in backend

## Testing

Test language matching:
- English input → English output
- Hindi input → Hindi output
- Hinglish → Hinglish output

Test rate limiting:
- Send 2 requests within 3 seconds → Second gets rate limited

Test caching:
- Send same message twice → Second response is instant (cached)

## Production Deployment

For production, deploy to:
- **Vercel** - Serverless functions
- **Railway** - Container deployment
- **Render** - Web service

Update `FRONTEND_URL` in `.env` to your production frontend URL.

## License

ISC
