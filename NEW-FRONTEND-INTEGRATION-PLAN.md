# New Frontend Integration Plan

## Overview
Replacing the old Vite/TypeScript frontend with a new React/JavaScript frontend from GitHub.

## Changes Made

### 1. Frontend Replacement
- ✅ Backed up old frontend to `frontend-old-backup`
- ✅ Cloned new frontend from https://github.com/mmxlvsu/Capsort.git
- ✅ Replaced `frontend` folder with new code

### 2. New Frontend Structure

**Technology Stack:**
- React 19.2.0 (Create React App)
- React Router DOM 7.9.6
- Tailwind CSS 3.4.18
- Lottie React (animations)
- Lucide React (icons)
- Radix UI (dialogs, scroll areas)

**Pages:**
- `/` or `/splash` - Splash/Landing page
- `/signup` - Student registration
- `/signstudent` - Student/Admin login
- `/guest` - Guest projects view
- `/guestabout` - Guest about page
- `/studentdash` - Student dashboard
- `/studentabout` - Student about page
- `/saved` - Saved projects
- `/admindash` - Admin dashboard
- `/adminanalytics` - Admin analytics
- `/verify` - Email verification
- `/reset` - Password reset

---

## Integration Tasks

### Phase 1: API Service Layer ✅ (To Do)
Create API service files to connect frontend to backend:

1. **Create `src/services/api.js`**
   - Base API configuration
   - HTTP methods (GET, POST, PUT, DELETE)
   - Error handling
   - Token management

2. **Create `src/services/auth.js`**
   - Login (student/admin)
   - Register
   - Logout
   - Get current user
   - Token storage

3. **Create `src/services/projects.js`**
   - Get all projects (with filters)
   - Get project by ID
   - Create project (admin)
   - Update project (admin)
   - Delete project (admin)

4. **Create `src/services/savedProjects.js`**
   - Get saved projects
   - Save project
   - Unsave project

5. **Create `src/services/about.js`**
   - Get about content
   - Update about content (admin)

---

### Phase 2: Environment Configuration ✅ (To Do)
1. **Create `.env` file**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

2. **Create `.env.example`**
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

---

### Phase 3: Update Pages with API Integration 🔄 (To Do)

#### Authentication Pages
1. **Signup.jsx**
   - Connect to `/api/auth/register`
   - Handle validation errors
   - Redirect on success

2. **SignStudent.jsx**
   - Connect to `/api/auth/login` (student)
   - Connect to `/api/auth/admin/login` (admin)
   - Store JWT token
   - Redirect based on role

#### Guest Pages
3. **Guest.jsx**
   - Fetch projects from `/api/projects`
   - Implement real-time filtering
   - Display loading states

4. **GuestAbout.jsx**
   - Fetch content from `/api/about`
   - Display dynamic content

#### Student Pages
5. **StudentDash.jsx**
   - Fetch projects from `/api/projects`
   - Implement filtering
   - View paper modal
   - Save to saved projects

6. **Saved.jsx**
   - Fetch from `/api/saved-projects`
   - Implement filtering
   - Unsave functionality

7. **StudentAbout.jsx**
   - Fetch content from `/api/about`

#### Admin Pages
8. **AdminDash.jsx**
   - Fetch projects from `/api/projects`
   - CRUD operations
   - Filtering

9. **AdminAnalytics.jsx**
   - Fetch analytics from `/api/analytics`
   - Display charts/stats

---

### Phase 4: Context/State Management 🔄 (To Do)
1. **Create `src/contexts/AuthContext.js`**
   - User state
   - Login/logout functions
   - Role checking
   - Protected routes

---

### Phase 5: Protected Routes 🔄 (To Do)
1. **Create `src/components/ProtectedRoute.js`**
   - Check authentication
   - Redirect if not authenticated
   - Role-based access

2. **Update `src/index.js`**
   - Wrap routes with AuthProvider
   - Add protected route wrappers

---

### Phase 6: Backend Adjustments 🔄 (If Needed)

**Current Backend Status:**
- ✅ All endpoints working
- ✅ CORS configured
- ✅ Authentication working
- ✅ Database connected

**Potential Adjustments:**
- Update CORS if frontend port changes
- Add any new endpoints if needed
- Adjust response formats if needed

---

## API Endpoints (Backend Ready)

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - Student login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user

### Projects
- `GET /api/projects` - Get all projects (with filters)
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create project (admin)
- `PUT /api/projects/:id` - Update project (admin)
- `DELETE /api/projects/:id` - Delete project (admin)

### Saved Projects
- `GET /api/saved-projects` - Get saved projects (student)
- `POST /api/saved-projects` - Save project (student)
- `DELETE /api/saved-projects/:projectId` - Unsave project (student)

### About
- `GET /api/about` - Get about content (public)
- `PUT /api/about` - Update about content (admin)

### Analytics
- `GET /api/analytics` - Get analytics (admin)

---

## File Structure (New Frontend)

```
frontend/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── assets/          # Images, icons, animations
│   ├── pages/           # Page components
│   │   ├── Splash.jsx
│   │   ├── Signup.jsx
│   │   ├── SignStudent.jsx
│   │   ├── Guest.jsx
│   │   ├── StudentDash.jsx
│   │   ├── AdminDash.jsx
│   │   └── ...
│   ├── styles/          # CSS files
│   ├── services/        # API services (TO CREATE)
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── projects.js
│   │   └── ...
│   ├── contexts/        # React contexts (TO CREATE)
│   │   └── AuthContext.js
│   ├── components/      # Reusable components (TO CREATE)
│   │   └── ProtectedRoute.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env                 # Environment variables (TO CREATE)
├── .env.example         # Example env file (TO CREATE)
├── package.json
└── tailwind.config.js
```

---

## Next Steps

1. ✅ Create API service layer
2. ✅ Create environment configuration
3. ✅ Create AuthContext
4. ✅ Update pages with API integration
5. ✅ Test authentication flow
6. ✅ Test CRUD operations
7. ✅ Test filtering
8. ✅ Test saved projects
9. ✅ Deploy and test

---

## Notes

- Old frontend backed up in `frontend-old-backup`
- Backend is fully functional and ready
- No backend changes needed initially
- Focus on connecting frontend to existing API
- Maintain same API contract

---

## Status
🔄 **IN PROGRESS** - Frontend replaced, integration in progress
