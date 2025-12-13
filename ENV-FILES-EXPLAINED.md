# 🔧 Environment Files Explained

## 📁 **Which .env file does what?**

### 1. **`.env`** - Development Environment
**Used when:** Running `npm start` locally
**Purpose:** Local development with your local backend

```env
# Development Environment Variables
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 2. **`.env.production`** - Production Environment  
**Used when:** Building for production (`npm run build`)
**Purpose:** Production deployment on Vercel

```env
# Production Environment Variables for Vercel Deployment
REACT_APP_API_URL=https://capsort-backend.onrender.com/api
GENERATE_SOURCEMAP=false
REACT_APP_ENV=production
```

### 3. **`.env.example`** - Template File
**Used when:** Documentation and setup reference
**Purpose:** Shows developers what variables are needed

```env
# Example environment variables for Capsort Frontend
# Copy this file to .env and update the values
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🎯 **For Vercel Deployment - You Need:**

### **Option A: Use .env.production (Recommended)**
✅ Keep your `.env.production` file as is - Vercel will automatically use it

### **Option B: Set Environment Variables in Vercel Dashboard**
1. Go to Vercel project settings
2. Add these environment variables:
   - `REACT_APP_API_URL` = `https://capsort-backend.onrender.com/api`
   - `GENERATE_SOURCEMAP` = `false`

## 🔄 **How React Uses These Files:**

```
npm start          → Uses .env
npm run build      → Uses .env.production (if exists), then .env
Vercel deployment  → Uses .env.production + Vercel env vars
```

## ✅ **Current Status:**

- ✅ **`.env`** - Set for local development (localhost:5000)
- ✅ **`.env.production`** - Set for Vercel deployment (your Render backend)
- ✅ **`.env.example`** - Template for other developers

## 🚀 **For Deployment:**

**You're all set!** Vercel will automatically:
1. Use your `.env.production` file
2. Connect to your Render backend at `https://capsort-backend.onrender.com/api`
3. Build with production optimizations

**No additional configuration needed!** 🎉