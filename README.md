# TrimURL – Authenticated URL Shortener

**TrimURL** is a full-stack, authenticated URL shortener built with **Nest.js** and **Vue.js**. It provides secure user authentication, JWT-based token management, and URL shortening services with a clean, responsive interface.

---

## 🌐 Live Demo  
https://trim-url-frontend.vercel.app/

---

## 👨‍💻 Developed by  
**Muhammed Shuraif**

---

## 🚀 Features

### 🔐 Authentication System

- **User Registration**
  - Secure password hashing with bcrypt
  - Input validation and sanitization
  - Duplicate email prevention
- **User Login**
  - JWT token generation
  - Secure credential verification
  - Token-based session management
- **User Logout**
  - Token invalidation
  - Secure session termination

### 🔗 URL Shortening

- **Create Shortened URLs**
  - Generate unique short codes
  - Store original and shortened URL mappings
  - User-specific URL ownership
- **Retrieve URLs**
  - Access user's shortened URLs
  <!--- Click tracking and analytics--->
  - URL validation and verification

### 🛡️ Security Features

- **Password Security**
  - Bcrypt hashing with salt rounds
  - Secure password storage
- **JWT Authentication**
  - Access token generation
  - Route protection middleware
  - Token validation and verification
- **Input Validation**
  - Request payload validation
  - URL format verification
  - XSS protection
- **Database Security**
  - Prisma ORM prevents SQL injection
  - Parameterized queries

### 🎨 User Interface

- **Responsive Design**
  - Mobile-first approach
  - Clean, intuitive interface
- **Authentication Forms**
  - Login and registration pages
  - Form validation and error handling
- **URL Management Dashboard**
  - View shortened URLs
  - Copy to clipboard functionality
  - Click statistics

---

## 🧰 Tech Stack

- **Package Manager**: pnpm (monorepo workspace)
- **Backend**: Nest.js, TypeScript, Node.js
- **Frontend**: Vue.js 3, Composition API, Pinia, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT, bcrypt
- **Validation**: class-validator, class-transformer
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

---

## 📁 Project Structure

```
trim-url/ (monorepo)
├── apps/
│   ├── backend/            # Nest.js backend
│   │   ├── src/
│   │   │   ├── auth/      # Authentication module
│   │   │   ├── url/       # URL shortening module
│   │   │   ├── common/    # Shared utilities
│   │   │   │   ├── decorators/
│   │   │   │   ├── guards/
│   │   │   │   ├── pipes/
│   │   │   │   └── validators/
│   │   │   ├── config/    # Configuration files
│   │   │   └── main.ts
│   │   ├── test/          # E2E tests
│   │   ├── package.json
│   │   └── nest-cli.json
│   │
│   └── frontend/          # Vue.js frontend
│       ├── src/
│       │   ├── stores/        # Pinia stores
│       │   ├── components/    # Vue components
│       │   ├── views/         # Page components
│       │   ├── composables/   # Composition API logic
│       │   ├── services/      # API service layer
│       │   ├── types/         # TypeScript interfaces
│       │   ├── router/        # Vue Router configuration
│       │   └── main.ts
│       ├── public/
│       ├── package.json
│       └── vite.config.ts
│
├── packages/
│   └── shared/
│       └── types/         # Shared TypeScript types
│
├── .gitignore
├── LICENSE
├── README.md
├── package.json           # Root package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── tsconfig.base.json     # Base TypeScript config
```

---

## 🧪 Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Shuraifp/trim-url.git
cd trim-url

# Install all dependencies (root + apps)
pnpm install
```

### 2. Backend Setup

```bash
cd apps/backend
```

Create a `.env` file in `apps/backend/` with:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/trimurl"
# or use a cloud provider like Neon, Supabase, or Railway
DATABASE_URL="postgresql://username:password@host:5432/trimurl?sslmode=require"

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Application
PORT=3000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:8080

# Base URL for shortened links
BASE_URL=http://localhost:3000
```

Start the backend development server:

```bash
# Generate Prisma client (first time setup)
pnpm run prisma:generate

# Run database migrations
pnpm run prisma:migrate

# Seed database (optional)
pnpm run prisma:seed

# Start development server
# From the root directory
pnpm run dev:backend

# Or from apps/backend directory
pnpm run start:dev
```

The API will run at: `http://localhost:3000`

---

### 3. Frontend Setup

```bash
cd apps/frontend
```

Create a `.env` file in `apps/frontend/` with:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=TrimURL
```

Start the frontend development server:

```bash
# From the root directory
pnpm run dev:frontend

# Or from apps/frontend directory
pnpm run dev
```

The app will run at: `http://localhost:8080`

---

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/login`
Authenticate user and receive JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### URL Shortening Endpoints

#### POST `/api/urls/shorten` (Protected)
Create a shortened URL

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very-long-url"
}
```

**Response:**
```json
{
  "id": "url_id",
  "originalUrl": "https://example.com/very-long-url",
  "shortCode": "abc123",
  "shortUrl": "http://localhost:3000/abc123",
  "clicks": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### GET `/api/urls` (Protected)
Get user's shortened URLs

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
[
  {
    "id": "url_id",
    "originalUrl": "https://example.com/very-long-url",
    "shortCode": "abc123",
    "shortUrl": "http://localhost:3000/abc123",
    "clicks": 5,
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

#### GET `/:shortCode`
Redirect to original URL

**Response:** 
HTTP 302 redirect to original URL

---

## 🧪 Testing

> **Note**: Testing implementation is planned for future development. The current version focuses on core functionality and will be enhanced with comprehensive test coverage including:

### Planned Testing Features
- **Unit Tests**: Component and service level testing
- **Integration Tests**: API endpoint testing
- **E2E Tests**: Full user flow testing
- **Database Tests**: Prisma model and migration testing

### Future Testing Stack
- **Backend**: Jest, Supertest
- **Frontend**: Vitest, Vue Test Utils
- **E2E**: Playwright or Cypress

---

## 🚀 Deployment

### Backend Deployment

The backend can be deployed to platforms like Railway, Render, or Heroku:

1. Set environment variables in your deployment platform
2. Ensure MongoDB connection string is configured
3. Update CORS origins for production frontend URL

### Frontend Deployment

The frontend is deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

---

## 🔒 Security Considerations

- **Password Hashing**: bcrypt with salt rounds for secure password storage
- **JWT Security**: Short-lived tokens with secure secret keys
- **Input Validation**: Comprehensive validation using class-validator
- **CORS Configuration**: Restricted to frontend domain in production
- **Rate Limiting**: API rate limiting to prevent abuse
- **SQL Injection Prevention**: Prisma ORM provides built-in protection
- **XSS Protection**: Input sanitization and output encoding

---

## 🐛 Error Handling

The application implements comprehensive error handling:

- **Validation Errors**: Detailed field-level validation messages
- **Authentication Errors**: Clear unauthorized access messages
- **Database Errors**: Graceful handling of connection issues
- **URL Errors**: Invalid URL format detection
- **Rate Limiting**: Proper handling of request limits

---

## ⚙️ Prerequisites

- **Node.js** v16+ 
- **pnpm** (recommended package manager)
- **PostgreSQL** (local or cloud provider like Neon, Supabase)
- **Modern Browser** with ES6+ support

### Installing pnpm

```bash
# Install pnpm globally
npm install -g pnpm

# Or using Homebrew (macOS)
brew install pnpm

# Or using winget (Windows)
winget install pnpm
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Nest.js** team for the excellent framework
- **Vue.js** community for the reactive frontend framework  
- **AI Tools** (ChatGPT, Claude) for development assistance
- **Open Source** contributors for the amazing packages used

---

## 📞 Contact

**Muhammed Shuraif**
- GitHub: [@Shuraifp](https://github.com/Shuraifp)
- Email: shuraifp@gmail.com

---

**Built with ❤️ using Nest.js and Vue.js**
