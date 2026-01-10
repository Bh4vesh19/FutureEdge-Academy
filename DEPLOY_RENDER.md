# Render Backend Deployment Guide

## Quick Deploy to Render

### Step 1: Sign in to Render
1. Go to https://dashboard.render.com/
2. Sign in with GitHub

### Step 2: Create New Web Service
1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository: `Bh4vesh19/FutureEdge-Academy`
3. Click **"Connect"**

### Step 3: Configure Service

**Basic Settings:**
- **Name**: `futureedge-backend`
- **Region**: Oregon (US West) - or closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: Free

### Step 4: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these **3 variables**:

```
OPENAI_API_KEY = sk-your_actual_openai_key_here
NODE_ENV = production
FRONTEND_URL = https://futureedge-academy.vercel.app
```

⚠️ **IMPORTANT**: Use your actual OpenAI API key!

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Wait ~3-5 minutes for deployment
3. Render will show deployment logs
4. Once done, you'll get a URL like: `https://futureedge-backend.onrender.com`

### Step 6: Verify Backend is Live

Test the health endpoint:
```
https://your-backend-url.onrender.com/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "FutureEdge AI Backend"
}
```

### Step 7: Copy Backend URL

Once deployed, copy the full URL (e.g., `https://futureedge-backend.onrender.com`)

---

## After Deployment

Share the Render backend URL, and I'll:
1. ✅ Verify it's responding
2. ✅ Update frontend `.env` to point to it
3. ✅ Test the connection

---

## Troubleshooting

**Deployment failed?**
- Check build logs in Render dashboard
- Verify `backend/package.json` exists
- Ensure OpenAI API key is correct

**Backend not responding?**
- Render free tier spins down after 15 min of inactivity
- First request after sleep takes ~30 seconds
- This is normal for free tier

**CORS errors?**
- Update `FRONTEND_URL` in Render environment to your actual frontend URL

---

## Free Tier Limitations

- ⚠️ Backend sleeps after 15 minutes of inactivity
- ⚠️ First request after sleep is slow (~30s)
- ⚠️ 750 hours/month free (enough for testing)

For production, upgrade to paid tier ($7/month) for always-on backend.
