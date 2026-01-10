# 🚀 Deploy Backend to Render (2 Minutes)

## Step-by-Step (Copy-Paste Ready)

### 1. Go to Render Dashboard
👉 https://dashboard.render.com/

### 2. Create New Web Service
- Click **"New +"** → **"Web Service"**
- Click **"Build and deploy from a Git repository"**
- Click **"Next"**

### 3. Connect GitHub Repository
- Find: `Bh4vesh19/FutureEdge-Academy`
- Click **"Connect"**

### 4. Configure Service (Use These Exact Settings)

**Basic Info:**
```
Name: futureedge-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
```

**Build Settings:**
```
Runtime: Node
Build Command: npm install
Start Command: node server.js
```

**Plan:**
```
Instance Type: Free
```

### 5. Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**

**Add this ONE variable:**
```
Key: OPENAI_API_KEY
Value: [paste your OpenAI API key here]
```

⚠️ **CRITICAL**: Use your actual OpenAI API key (starts with `sk-`)

### 6. Deploy!

Click **"Create Web Service"**

**Wait 3-5 minutes** for deployment to complete.

### 7. Get Your Backend URL

Once deployed, Render will show your URL:
```
https://futureedge-backend-XXXX.onrender.com
```

**Copy this entire URL** and share it with me.

---

## ✅ Expected Result

After deployment, test this URL in browser:
```
https://your-backend-url.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-01-10T...",
  "service": "FutureEdge AI Backend"
}
```

If you see this ✅ **deployment successful!**

---

## 🐛 Troubleshooting

**Build failed?**
- Check Render logs
- Verify `backend/package.json` exists in GitHub repo

**500 error on /health?**
- OpenAI API key might be wrong
- Check environment variables in Render dashboard

**CORS error?**
- Normal during setup
- I'll fix this once you share the backend URL

---

## ⏭️ What's Next

Once you share the backend URL, I will **automatically**:
1. ✅ Verify backend is responding
2. ✅ Update frontend `.env` with your Render URL
3. ✅ Test AI chat connectivity  
4. ✅ Confirm production-ready
5. ✅ Commit and push final changes

**Just share the URL and I'll handle the rest!** 🚀
