# 🎓 CapSort - Capstone Archiving and Sorting System

A full-stack web application for managing and organizing capstone projects at the University of Science and Technology of Southern Philippines.

## 📁 Project Structure

```
capsort-monorepo/
├── frontend/          # React + TypeScript frontend
├── backend/           # Node.js + Express backend
├── package.json       # Monorepo scripts
├── README.md          # This file
└── DEPLOYMENT.md      # Deployment guide
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (we use Neon)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd capsort-monorepo

# Install all dependencies
npm run install:all

# Set up environment variables
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# Edit the .env files with your configuration
```

### Development
```bash
# Start both frontend and backend in development mode
npm run dev

# Or start them individually:
npm run dev:frontend  # Frontend only (port 3000)
npm run dev:backend   # Backend only (port 5000)
```

### Building
```bash
# Build both projects
npm run build

# Or build individually:
npm run build:frontend
npm run build:backend
```

### Testing
```bash
# Run backend tests
npm run test
```

## 🏗️ Architecture

### Frontend (`/frontend`)
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **Routing**: React Router v6
- **State Management**: React Context API
- **Build Tool**: Vite

### Backend (`/backend`)
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens
- **Validation**: Express Validator
- **Security**: Rate limiting, CORS, input sanitization
- **Testing**: Jest with Supertest

## 🔐 Features

### ✅ Authentication System
- Student registration and login
- Admin login with role-based access
- JWT token management
- Protected routes
- Password strength validation

### 📚 Project Management (Coming Soon)
- Upload capstone papers
- Categorize by field and year
- Search and filter functionality
- Save favorite projects

### 👥 User Management
- Student profiles
- Admin dashboard
- User activity tracking

### 📊 Analytics & Reporting
- Usage statistics
- Popular projects
- Download tracking

## 🛡️ Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting on API endpoints
- Input sanitization and validation
- CORS protection
- SQL injection prevention (Prisma ORM)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Student registration
- `POST /api/auth/login` - User login
- `POST /api/auth/admin/login` - Admin login
- `GET /api/auth/me` - Get current user

### Projects (Coming Soon)
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy Backend**:
   ```bash
   # Push backend folder to separate repo or use monorepo
   # Deploy to Vercel with Node.js preset
   ```

2. **Deploy Frontend**:
   ```bash
   # Push frontend folder to separate repo or use monorepo
   # Deploy to Vercel with Vite preset
   ```

3. **Environment Variables**:
   Set the following in Vercel dashboard:
   
   **Backend**:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `CLIENT_URL`
   
   **Frontend**:
   - `VITE_API_URL`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## 🔧 Development Scripts

```bash
# Install dependencies for all projects
npm run install:all

# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build            # Build both projects
npm run build:frontend   # Build frontend only
npm run build:backend    # Build backend only

# Testing & Linting
npm run test             # Run backend tests
npm run lint             # Lint both projects
npm run lint:frontend    # Lint frontend only
npm run lint:backend     # Lint backend only

# Production
npm start                # Start backend in production mode
```

## 📝 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (`.env`)
```env
DATABASE_URL="your_postgresql_connection_string"
JWT_SECRET="your_jwt_secret_key"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎓 University Information

**University of Science and Technology of Southern Philippines**
- Capstone Archiving and Sorting System
- Academic Year 2024-2025

## 📞 Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation in `/docs`

---

**Built with ❤️ for USTP students and faculty**