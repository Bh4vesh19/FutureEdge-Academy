# 🚀 FutureEdge Academy - Production Deployment

## ✅ Production Status

**Backend**: https://futureedge-backend.onrender.com  
**Frontend**: Ready for deployment (Vercel/GitHub Pages)

---

## Quick Start (Development)

```bash
npm run dev
```

Starts both frontend (5173) and backend (3001) automatically.

---

## Production Deployment

### Backend (Already Deployed ✅)
- **URL**: https://futureedge-backend.onrender.com
- **Platform**: Render
- **Health Check**: `https://futureedge-backend.onrender.com/health`

### Frontend (Deploy Now)

**Option 1: Vercel (Recommended)**
```bash
npm run build
# Deploy dist/ folder to Vercel
```

**Option 2: GitHub Pages**
```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

**Important**: Create `.env.production.local` with:
```env
VITE_API_BASE_URL=https://futureedge-backend.onrender.com
```

---

## Features

- ✅ AI-powered chat assistant (OpenAI GPT-4o-mini)
- ✅ Multilingual support (English, Hindi, Hinglish, Gujarati, Tamil, Telugu)
- ✅ Automatic language detection and matching
- ✅ Rate limiting and caching
- ✅ Response deduplication
- ✅ Auto-retry on connection failure
- ✅ Production-ready backend on Render
- ✅ Fully responsive design

---

## Environment Variables

### Development (`.env`)
```env
VITE_API_BASE_URL=http://localhost:3001
```

### Production (`.env.production.local`)
```env
VITE_API_BASE_URL=https://futureedge-backend.onrender.com
```

---

## Backend Configuration

Environment variables on Render:
- `OPENAI_API_KEY` - Your OpenAI API key
- `NODE_ENV` - production
- `PORT` - 10000 (auto-set by Render)

---

## Known Limitations (Render Free Tier)

- Backend spins down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds (cold start)
- This is normal - the AI assistant handles it gracefully

---

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS
- Framer Motion

**Backend:**
- Node.js
- Express.js
- OpenAI API
- CORS, Helmet

---

## License

ISC

## Author

Bhavesh - FutureEdge Academy
