# Capsort Backend Setup Guide

## Quick Setup (Recommended)

### 1. Fix Neon Database Connection
Your Neon database appears to be paused or unreachable. Fix this first:

1. Go to https://console.neon.tech/
2. Sign in to your account
3. Find your project (likely shows as "Paused")
4. Click "Resume" or "Activate" 
5. Wait 30-60 seconds for it to start
6. Copy the new connection string
7. Update your `.env` file with the new `DATABASE_URL`

### 2. Set Up Database Schema
Once your Neon connection is working:

```bash
# Generate Prisma client
npx prisma generate

# Create and run migrations
npx prisma migrate dev --name init

# Seed the database with sample data
npm run db:seed
```

### 3. Start the Server
```bash
npm run dev
```

Your API will be available at:
- Health check: http://localhost:5000/health
- Auth endpoints: http://localhost:5000/api/auth
- Projects: http://localhost:5000/api/projects
- Saved Projects: http://localhost:5000/api/saved-projects

## Troubleshooting

### Permission Issues
If you get "EPERM" errors:
1. Close your IDE/terminal completely
2. Reopen as Administrator (Windows)
3. Try the setup commands again

### Database Connection Issues
- Make sure your Neon project is active (not paused)
- Verify the connection string format: `postgresql://user:pass@host/db?sslmode=require`
- Try generating a new connection string from Neon console

### Port Already in Use
If port 5000 is busy:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Then restart
npm run dev
```

## Sample API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project (requires auth)
- `GET /api/projects/:id` - Get specific project
- `PUT /api/projects/:id` - Update project (requires auth)
- `DELETE /api/projects/:id` - Delete project (requires auth)

### Saved Projects
- `GET /api/saved-projects` - Get user's saved projects (requires auth)
- `POST /api/saved-projects` - Save a project (requires auth)
- `DELETE /api/saved-projects/:id` - Remove saved project (requires auth)

## Default Users (After Seeding)
- **Admin**: admin@capsort.com / admin123
- **Student**: student@example.com / student123

## Environment Variables
Make sure your `.env` file has:
```
DATABASE_URL="your_neon_connection_string"
DIRECT_URL="your_neon_connection_string"
JWT_SECRET="your_jwt_secret"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```