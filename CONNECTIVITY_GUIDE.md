# Backend-Frontend Connectivity Setup Guide

## 🔴 Quick Fix Steps

### 1. **Copy Environment Files**

**Backend `.env`:**
```bash
cd backend
# Create .env file and add your OpenAI API key
```

Content:
```env
OPENAI_API_KEY=sk-your_actual_key_here
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Frontend `.env`:**
```bash
cd ..  # Back to root
# Create .env file
```

Content:
```env
VITE_API_BASE_URL=http://localhost:3001
```

### 2. **Start Backend Server**

Open a **new terminal**:
```bash
cd backend
npm start
```

You should see:
```
🚀 ====================================
   AI Backend Server RUNNING
   Port: 3001
   URL: http://localhost:3001
   Frontend: http://localhost:5173
   Health: http://localhost:3001/health
   API: http://localhost:3001/api/chat
==================================== 🚀
```

### 3. **Test Backend Health**

Open browser or use curl:
```bash
curl http://localhost:3001/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2026-01-10T...",
  "service": "FutureEdge AI Backend"
}
```

### 4. **Keep Both Servers Running**

**Terminal 1** - Backend:
```bash
cd backend
npm start
```

**Terminal 2** - Frontend (already running):
```bash
npm run dev
```

---

## ✅ Connectivity Fixes Applied

### Fix #1: Backend Verification
- Added `/health` endpoint
- Frontend checks backend on load
- Shows backend status in UI (Online/Offline)

### Fix #2: Correct API Endpoint  
- Frontend uses: `http://localhost:3001/api/chat` (full URL)
- Configurable via `VITE_API_BASE_URL`
- Not relative path

### Fix #3: CORS Configuration
```javascript
cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
})
```

### Fix #4: Smart Error Handling
- **Timeout**: "Request timed out"
- **Server offline**: "Backend is offline. Start on port 3001"
- **HTTP errors**: Show backend's friendly message
- No more generic "Could not connect"

### Fix #5: Timeout & AbortController
- 8-second request timeout
- Aborts long-running requests
- Shows friendly retry message

### Fix #6: Comprehensive Logging
**Backend logs:**
```
[2026-01-10T...] POST /api/chat
```

**Frontend logs:**
```javascript
console.log('[Frontend] Sending request to:', url)
console.log('[Frontend] Response status:', status)
```

### Fix #7: Deployment-Ready
```javascript
// Development
VITE_API_BASE_URL=http://localhost:3001

// Production
VITE_API_BASE_URL=https://your-backend.com
```

---

## 🧪 Testing Connectivity

### Test 1: Health Check
```bash
curl http://localhost:3001/health
```
✅ Should return `{"status":"ok"}`

### Test 2: Simple Chat
1. Open http://localhost:5173
2. Click AI icon (should be blue = online)
3. Type "hello"
4. Should get instant greeting

### Test 3: Check Console Logs

**Backend terminal:**
```
[timestamp] POST /api/chat
```

**Browser console (F12):**
```
[Frontend] Sending request to: http://localhost:3001/api/chat
[Frontend] Response status: 200
[Frontend] Success response: {reply: "...", language: "en"}
```

---

## 🐛 Troubleshooting

### Error: "Backend Offline"
**Problem**: Backend server not running

**Solution**:
```bash
cd backend
npm start
```

### Error: "CORS blocked" (in browser console)
**Problem**: Wrong CORS origin

**Solution**: Check `backend/.env`:
```env
FRONTEND_URL=http://localhost:5173
```

### Error: Port 3001 already in use
**Problem**: Another process using port 3001

**Solution**:
```powershell
# Windows
netstat -ano | findstr :3001
taskkill /PID <process_id> /F

# Then restart backend
```

### Frontend shows orange icon
**Problem**: Health check failed

**Solution**:
1. Verify backend is running
2. Check `http://localhost:3001/health` in browser
3. Check browser console for errors

---

## 📊 UI Status Indicators

| Icon Color | Status | Meaning |
|------------|--------|---------|
| 🔵 Blue | Online | Backend connected |
| 🟠 Orange | Offline | Backend not reachable |

**Header text:**
- ● Online - Backend working
- ● Backend Offline - Start backend server

---

## ✅ Success Checklist

Before testing AI chat, verify:

- [ ] Backend `.env` has OpenAI API key
- [ ] Frontend `.env` has `VITE_API_BASE_URL=http://localhost:3001`
- [ ] Backend server running (`npm start` in backend/)
- [ ] Health check works (`curl http://localhost:3001/health`)
- [ ] Frontend shows "● Online" in chat header
- [ ] AI icon is blue (not orange)
- [ ] Browser console shows no CORS errors

If all ✅, the AI chat should work perfectly!

---

## 🚀 Expected Behavior

1. **Frontend loads** → Checks `/health` → Shows "Online"
2. **User types "hello"** → Frontend logs request → Backend logs POST → Instant greeting
3. **User asks question** → Backend processes → AI response in 1-2 seconds
4. **Rate limit triggered** → Friendly message, no spam
5. **Timeout** → Shows "Request timed out, try again"

All connectivity issues resolved! 🎉
