# 🚀 Quick Start Guide

## One Command to Rule Them All

```bash
npm run dev
```

That's it! Both frontend and backend start automatically.

---

## Setup (First Time Only)

### 1. Create Environment Files

**backend/.env**
```env
OPENAI_API_KEY=sk-your_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**.env** (in root)
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 2. Start Application

```bash
npm run dev
```

**You'll see:**
```
[frontend] ➜ Local: http://localhost:5173/
[backend] 🚀 AI Backend Server RUNNING
[backend] Port: 3001
```

### 3. Open Browser

Navigate to: http://localhost:5173

**AI Status Indicators:**
- 🟢 **AI Online** - Ready to chat
- 🟡 **Connecting…** - Auto-retrying
- 🔴 **Temporarily unavailable** - Service down

---

## Features

✅ **Auto-start** - Backend starts with frontend  
✅ **Auto-retry** - Reconnects every 3 seconds  
✅ **Smart status** - Visual feedback (🟢🟡🔴)  
✅ **No errors** - Professional messages only  
✅ **Production-ready** - Deploy anywhere  

---

## Troubleshooting

### Backend not starting?

Check that `backend/.env` exists with valid OpenAI API key.

### Port 3001 in use?

```powershell
netstat -ano | findstr :3001
taskkill /PID <process_id> /F
```

### AI shows "Connecting…" forever?

Backend might have crashed. Check terminal for errors.

---

## Production Deployment

Deploy backend to Railway/Render/Vercel, then update:

**.env.production**
```env
VITE_API_BASE_URL=https://api.futureedge.ai
```

Done! 🎉
