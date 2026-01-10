# 🚀 FutureEdge Academy - Quick Start

## ONE Command to Start Everything

```bash
npm run dev
```

This automatically starts:
- ✅ Frontend (Vite) on http://localhost:5173
- ✅ Backend (Express) on http://localhost:3001

## First Time Setup

### 1. Install Dependencies

```bash
npm install
cd backend
npm install  
cd ..
```

### 2. Configure Backend

Create `backend/.env`:
```env
OPENAI_API_KEY=sk-your_openai_api_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Configure Frontend (Optional)

Create `.env` in root:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 4. Start Application

```bash
npm run dev
```

## That's It!

Open http://localhost:5173 and start using the AI assistant.

**Status Indicators:**
- 🟢 AI Online - Ready to chat
- 🟡 Connecting… - Auto-reconnecting

## Troubleshooting

**Backend not starting?**
- Check `backend/.env` has valid OpenAI API key
- Verify port 3001 is not in use

**Frontend shows "Connecting…"?**
- Backend is starting (wait 5 seconds)
- OR backend crashed (check terminal for errors)

**Port conflicts?**
```powershell
netstat -ano | findstr :3001
taskkill /PID <pid> /F
```

## Production Deployment

Deploy backend to Railway/Render/Vercel, then update frontend `.env`:
```env
VITE_API_BASE_URL=https://your-backend-url.com
```

Done! 🎉
