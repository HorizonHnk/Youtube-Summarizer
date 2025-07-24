# 🚀 Backend Setup Guide

Your YouTube Summarizer now uses **real YouTube API integration** through a Node.js backend server.

## 📁 **Project Structure**
```
Smart-Learn/
├── App/                    # React Frontend (current directory)
│   ├── src/
│   ├── .env               # Frontend config
│   └── package.json
└── backend/               # Node.js Backend (create this)
    ├── server.js          # Your backend code
    ├── .env               # Backend config (with API keys)
    ├── package.json
    └── node_modules/
```

## 🔧 **Backend Setup Steps**

### 1. Create Backend Directory
```bash
# Navigate to parent directory
cd C:\Users\Dell\Documents\VS-Code\Smart-Learn

# Create backend directory
mkdir backend
cd backend
```

### 2. Initialize Backend Project
```bash
# Initialize npm project
npm init -y

# Install required dependencies
npm install express cors dotenv axios @google/generative-ai youtube-transcript

# Install development dependencies
npm install nodemon --save-dev
```

### 3. Create Backend Files

#### Create `package.json` scripts:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Create `.env` file:
```env
PORT=5000
GEMINI_API_KEY=AIzaSyAp1-6AD634OEBz9Wc3iKoaYlghGgYjCcU
YOUTUBE_API_KEY=AIzaSyBOEDQEsjzeXBKbpSizvkj4-kxLEa5q9z8
```

#### Create `server.js`:
Use the backend code you provided in your document.

### 4. Start Backend Server
```bash
# In the backend directory
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:5000
🤖 Enhanced YouTube video analysis enabled!
🔑 Gemini API: ✅
📺 YouTube API: ✅
📊 Features: Video metadata + Transcripts + AI analysis
```

## 🖥️ **Running Both Frontend and Backend**

### Option 1: Two Terminals
```bash
# Terminal 1 - Backend
cd C:\Users\Dell\Documents\VS-Code\Smart-Learn\backend
npm run dev

# Terminal 2 - Frontend  
cd C:\Users\Dell\Documents\VS-Code\Smart-Learn\App
npm run dev
```

### Option 2: Single Command (Advanced)
Add to your frontend `package.json`:
```json
{
  "scripts": {
    "dev:full": "concurrently \"cd ../backend && npm run dev\" \"npm run dev\"",
  }
}
```

Then install concurrently:
```bash
npm install concurrently --save-dev
npm run dev:full
```

## ✅ **Verification**

1. **Backend Health Check**: Visit `http://localhost:5000/api/health`
2. **Frontend**: Visit your React app (usually `http://localhost:5173`)
3. **API Status**: Check the green status indicator in your app

## 🎯 **What You Get**

- ✅ **Real YouTube video titles and descriptions**
- ✅ **Actual channel names and view counts**
- ✅ **Real video transcripts (when available)**
- ✅ **Comprehensive AI analysis of real content**
- ✅ **Download analysis as text file**
- ✅ **Smart retry logic for API failures**

## 🚨 **Troubleshooting**

### Backend won't start:
- Check if port 5000 is available
- Verify API keys in backend/.env
- Run `npm install` in backend directory

### Frontend shows "Backend Offline":
- Make sure backend is running on port 5000
- Check VITE_BACKEND_URL in frontend/.env
- Verify no firewall blocking localhost:5000

### API errors:
- Check your Google Cloud Console quotas
- Verify API keys are correct and have proper permissions
- Check console logs for detailed error messages

## 📊 **API Usage**

- **YouTube Data API**: 10,000 requests/day (free tier)
- **Gemini AI**: Generous free tier with rate limits
- **Transcript API**: Unlimited (scraping-based)

Your app now uses **real YouTube data** instead of mock responses! 🎉