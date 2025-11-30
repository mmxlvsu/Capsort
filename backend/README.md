# Capsort Backend API

A RESTful API for the Capsort Capstone Collection platform, built with Node.js, Express.js, and PostgreSQL.

## Features

- 🔐 JWT-based authentication with role-based access control
- 📚 Project management (CRUD operations)
- ⭐ User favorites/saved projects functionality
- 🔍 Advanced search and filtering
- 🛡️ Comprehensive security measures
- 📊 Input validation and error handling
- 🧪 Comprehensive test suite

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Validation**: express-validator
- **Testing**: Jest + Supertest

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- Neon PostgreSQL database account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd capsort-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up Neon Database:
   - Create account at [neon.tech](https://neon.tech)
   - Create a new project
   - Copy your connection string

4. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Neon configuration:
```env
# Replace with your actual Neon connection string
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-here"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="development"
CLIENT_URL="http://localhost:3000"
```

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

5. Set up the database:
```bash
npm run db:setup
```

6. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects
- `GET /api/projects` - Get all projects (public)
- `GET /api/projects/:id` - Get project by ID (public)
- `POST /api/projects` - Create project (admin only)
- `PUT /api/projects/:id` - Update project (admin only)
- `DELETE /api/projects/:id` - Delete project (admin only)

### Saved Projects
- `GET /api/saved-projects` - Get user's saved projects (protected)
- `POST /api/saved-projects` - Save a project (protected)
- `DELETE /api/saved-projects/:projectId` - Unsave project (protected)

## Query Parameters

### Projects Filtering
- `field` - Filter by field (e.g., IoT, Database)
- `year` - Filter by year
- `search` - Search in title and author
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Example:
```
GET /api/projects?field=IoT&year=2024&search=smart&page=1&limit=10
```

## Database Scripts

- `npm run db:migrate` - Run database migrations
- `npm run db:generate` - Generate Prisma client
- `npm run db:seed` - Seed database with sample data
- `npm run db:reset` - Clear all database data
- `npm run db:setup` - Full database setup (migrate + generate + seed)

## Neon Database Setup

### Getting Your Connection String

1. **Login to Neon Console**: [https://console.neon.tech](https://console.neon.tech)
2. **Select Your Project**: Choose your Capsort project
3. **Navigate to Dashboard**: Click on "Dashboard" in the sidebar
4. **Copy Connection String**: Find "Connection Details" and copy the connection string

### Connection String Format
```
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
```

### Important Notes for Neon:
- Always use `sslmode=require` in your connection string
- Neon automatically handles connection pooling
- The `DIRECT_URL` should be the same as `DATABASE_URL` for Neon
- Neon databases auto-pause after inactivity (great for development!)

### Troubleshooting Neon Connection:
- Ensure your connection string includes `?sslmode=require`
- Check that your Neon project is not paused
- Verify the region in your connection string matches your project region

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Test Accounts

After seeding, you can use these test accounts:

**Admin Account:**
- Email: `admin@capsort.com`
- Password: `Admin123!`

**Student Accounts:**
- Email: `john.doe@student.com` / Password: `Student123!`
- Email: `jane.smith@student.com` / Password: `Student123!`

## Deployment

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
JWT_EXPIRES_IN="7d"
PORT=5000
NODE_ENV="production"
CLIENT_URL="https://your-frontend-domain.com"
```

### Deploy to Render

1. Connect your GitHub repository to Render
2. Set the build command: `npm install && npm run db:generate`
3. Set the start command: `npm start`
4. Add environment variables in Render dashboard
5. Deploy!

### Deploy to Railway

1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Railway will automatically detect and deploy your Node.js app

## Security Features

- Password hashing with bcryptjs
- JWT token authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting on authentication endpoints
- CORS configuration
- Security headers
- XSS protection

## Error Handling

The API returns consistent error responses:

```json
{
  "error": "Error message",
  "details": ["Specific field errors"],
  "status": 400
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License