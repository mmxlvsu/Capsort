# 🚀 Capsort Frontend - Vercel Deployment Guide

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Backend Deployed**: Ensure your backend is deployed on Render

## 🔧 Pre-Deployment Setup

### 1. Environment Variables
The following environment variables are configured:

**Development (.env):**
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**Production (.env.production):**
```
REACT_APP_API_URL=https://capsort-backend.onrender.com/api
GENERATE_SOURCEMAP=false
REACT_APP_ENV=production
```

### 2. Vercel Configuration
- ✅ `vercel.json` - Deployment configuration
- ✅ `public/_redirects` - React Router support
- ✅ Build scripts updated in `package.json`

## 🚀 Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Connect Repository**
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `frontend_capsort/Capsort` folder as root directory

2. **Configure Build Settings**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend_capsort/Capsort`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

3. **Set Environment Variables**
   - Add `REACT_APP_API_URL` = `https://capsort-backend.onrender.com/api`
   - Add `GENERATE_SOURCEMAP` = `false`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Directory**
   ```bash
   cd frontend_capsort/Capsort
   vercel --prod
   ```

## 🔧 Post-Deployment Configuration

### 1. Update Backend CORS
Update your backend's CORS configuration to include your Vercel domain:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'https://your-app-name.vercel.app',
  'https://capsort.vercel.app', // Your actual domain
  process.env.CLIENT_URL,
  process.env.FRONTEND_URL
];
```

### 2. Custom Domain (Optional)
1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## 📊 Build Optimization

The deployment includes:
- ✅ **Source maps disabled** in production
- ✅ **Static asset caching** (1 year)
- ✅ **React Router support** via redirects
- ✅ **Environment-specific API URLs**
- ✅ **Optimized build output**

## 🧪 Testing Deployment

1. **Check Build Locally**
   ```bash
   npm run build
   npm run preview
   ```

2. **Test Production API Connection**
   - Verify API calls work with production backend
   - Test authentication flow
   - Check all major features

## 🔍 Troubleshooting

### Common Issues:

1. **API Connection Errors**
   - Verify `REACT_APP_API_URL` is correct
   - Check backend CORS settings
   - Ensure backend is deployed and accessible

2. **Routing Issues**
   - Verify `_redirects` file exists in `public/`
   - Check `vercel.json` routing configuration

3. **Build Failures**
   - Check for TypeScript/ESLint errors
   - Verify all dependencies are installed
   - Review build logs in Vercel dashboard

### Environment Variables Not Working:
- Ensure variables start with `REACT_APP_`
- Redeploy after adding new environment variables
- Check Vercel project settings

## 📱 Final Checklist

- [ ] Backend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS updated with Vercel domain
- [ ] Build completes successfully
- [ ] All routes work correctly
- [ ] Authentication functions properly
- [ ] API calls connect to backend
- [ ] Custom domain configured (if applicable)

## 🎉 Success!

Your Capsort frontend should now be live on Vercel! 

**Next Steps:**
1. Test all functionality thoroughly
2. Monitor performance and errors
3. Set up analytics if needed
4. Configure custom domain if desired

---

**Need Help?**
- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Test locally first with `npm run build && npm run preview`