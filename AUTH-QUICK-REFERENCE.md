# Authentication System - Quick Reference

## 🚀 Quick Start

### Start Servers:
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm start
```

### Access Points:
- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:5000
- **Sign In:** http://localhost:3001/signstudent
- **Sign Up:** http://localhost:3001/signup

## 🔑 Test Accounts

### Student Account:
```
Email: teststudent@example.com
Password: Test123!
Dashboard: /studentdash
```

### Admin Account:
```
Email: admin@capsort.com
Password: Admin123!
Dashboard: /admindash
```

## 📍 Routes

### Public Routes:
- `/` - Splash screen
- `/splash` - Splash screen
- `/signup` - Student registration
- `/signstudent` - Sign in (Student/Admin)
- `/guest` - Guest browse
- `/guestabout` - Guest about page
- `/reset-password?token=...` - Password reset

### Student Protected Routes:
- `/studentdash` - Student dashboard
- `/studentabout` - Student about page
- `/saved` - Saved projects

### Admin Protected Routes:
- `/admindash` - Admin dashboard
- `/adminanalytics` - Admin analytics

## 🔌 API Endpoints

### Authentication:
```
POST /api/auth/register          - Register student
POST /api/auth/login             - Student login
POST /api/auth/admin/login       - Admin login
POST /api/auth/forgot-password   - Request password reset
POST /api/auth/reset-password    - Reset password with token
GET  /api/auth/me                - Get current user (requires auth)
```

## 🔐 Password Rules

Must contain:
- ✅ 6+ characters
- ✅ One lowercase (a-z)
- ✅ One uppercase (A-Z)
- ✅ One number (0-9)

Examples: `Test123!`, `Password1`, `MyPass99`

## 🧪 Quick Test Flow

### 1. Register → Login:
```
1. Go to /signup
2. Fill form with valid data
3. Submit → redirects to /signstudent
4. Login with same credentials
5. Redirects to /studentdash
```

### 2. Forgot Password:
```
1. Go to /signstudent
2. Click "Forgot Password?"
3. Enter email
4. Check console for reset link
5. Click link → /reset-password?token=...
6. Enter new password
7. Submit → redirects to /signstudent
8. Login with new password
```

## 📦 Key Files

### Backend:
- `src/controllers/authController.js` - Auth logic
- `src/routes/authRoutes.js` - Auth routes
- `src/middleware/auth.js` - JWT verification
- `prisma/schema.prisma` - Database schema

### Frontend:
- `src/pages/SignStudent.jsx` - Sign in page
- `src/pages/Signup.jsx` - Registration page
- `src/pages/ResetPassword.jsx` - Password reset page
- `src/services/auth.js` - Auth API calls
- `src/contexts/AuthContext.js` - Auth state management

## 🛠️ Troubleshooting

### Backend not responding:
```bash
cd backend
npm run dev
```

### Frontend not loading:
```bash
cd frontend
npm start
```

### Database issues:
```bash
cd backend
npx prisma db push
npx prisma generate
```

### Clear auth state:
```javascript
// In browser console
localStorage.clear()
```

## 📝 Environment Variables

### Backend (.env):
```
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

### Frontend (.env):
```
REACT_APP_API_URL=http://localhost:5000/api
```

## ✅ Features Implemented

- [x] Student registration
- [x] Student login
- [x] Admin login (separate endpoint)
- [x] JWT authentication
- [x] Role-based access control
- [x] Password reset flow
- [x] Token expiration (1 hour for reset)
- [x] Password validation
- [x] Email validation
- [x] Protected routes
- [x] Error handling
- [x] Loading states
- [x] Security measures

## 🎯 Next Steps

1. Test all authentication flows
2. Verify role-based redirects
3. Test password reset end-to-end
4. Check error handling
5. Validate security measures
6. Test on different browsers
7. Prepare for email service integration

## 📚 Documentation

- `PASSWORD-RESET-IMPLEMENTATION.md` - Detailed password reset guide
- `AUTHENTICATION-TESTING-GUIDE.md` - Complete testing guide
- `AUTH-QUICK-REFERENCE.md` - This file

---

**Status:** ✅ All authentication features implemented and ready for testing
**Last Updated:** November 30, 2025
