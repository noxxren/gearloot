# Honokit Architecture

This document describes the high-level architecture of Honokit.

## Overview

Honokit is a **monorepo** containing a fullstack TypeScript application with:
- **Backend**: Bun runtime + Hono web framework
- **Frontend**: Vue 3 + TypeScript SPA
- **Database**: PostgreSQL/SQLite with migrations
- **Shared**: Common types and utilities

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│                    Vue 3 + TypeScript                    │
│              (http://localhost:5173 in dev)             │
└────────────────────────┬────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │ (CORS enabled in dev)
                         │
┌────────────────────────▼────────────────────────────────┐
│                 Backend API (Bun + Hono)                │
│              (http://localhost:3000 in dev)             │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Routes (auth, users, etc.)                    │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                        │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Middleware (auth, validation, rate limit)     │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                        │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Business Logic (services, controllers)        │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                        │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Encryption Layer (encrypt/decrypt PII)        │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                        │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Database Layer (query builder, ORM)           │    │
│  └──────────────┬─────────────────────────────────┘    │
└─────────────────┼──────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────────────┐
│         Database (PostgreSQL / SQLite)                  │
│           - TDE (Transparent Data Encryption)           │
│           - Encrypted PII fields                        │
│           - Hashed passwords (Argon2id)                 │
└─────────────────────────────────────────────────────────┘
```

## Directory Structure

```
honokit/
├── apps/
│   ├── backend/              # Backend API server
│   │   ├── src/
│   │   │   ├── routes/       # API route handlers
│   │   │   ├── middleware/   # Request/response middleware
│   │   │   ├── lib/          # Utilities (encryption, db, etc.)
│   │   │   ├── types/        # Backend-specific types
│   │   │   ├── config/       # Configuration files
│   │   │   └── index.ts      # Entry point
│   │   ├── tests/            # Backend tests
│   │   └── package.json
│   │
│   ├── frontend/             # Frontend SPA
│   │   ├── src/
│   │   │   ├── components/   # Vue components
│   │   │   ├── views/        # Page components
│   │   │   ├── composables/  # Vue composables
│   │   │   ├── stores/       # Pinia stores
│   │   │   ├── router/       # Vue Router config
│   │   │   ├── api/          # API client
│   │   │   ├── assets/       # Static assets
│   │   │   ├── types/        # Frontend types
│   │   │   └── main.ts       # Entry point
│   │   └── package.json
│   │
│   └── database/             # Database management
│       ├── migrations/       # Schema migrations
│       ├── seeds/            # Seed data
│       └── schema/           # Schema documentation
│
├── packages/
│   └── shared/               # Shared code
│       ├── types/            # Shared TypeScript types
│       ├── utils/            # Shared utilities
│       └── constants/        # Shared constants
│
├── docs/                     # Documentation
└── .github/                  # CI/CD workflows
```

## Key Technologies

### Backend

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Lightweight, fast web framework
- **Language**: TypeScript
- **Database**: PostgreSQL (prod) / SQLite (dev)
- **Auth**: JWT + Google OAuth 2.0
- **Encryption**: XChaCha20-Poly1305 (via @noble/ciphers)
- **Password Hashing**: Argon2id (built into Bun)

### Frontend

- **Framework**: [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- **Language**: TypeScript
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Routing**: [Vue Router](https://router.vuejs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Testing**: [Vitest](https://vitest.dev/)

### Shared

- **Type Sharing**: TypeScript interfaces shared between frontend and backend
- **Validation**: Shared validation logic
- **Constants**: API endpoints, error codes, etc.

## Data Flow

### Authentication Flow (Google OAuth)

```
1. User clicks "Sign in with Google" (Frontend)
   ↓
2. Redirect to /api/auth/google (Backend)
   ↓
3. Backend redirects to Google OAuth consent page
   ↓
4. User authorizes (Google)
   ↓
5. Google redirects back to /api/auth/google/callback (Backend)
   ↓
6. Backend:
   - Exchanges code for tokens
   - Fetches user profile from Google
   - Checks if user exists in DB
     - If not: creates new user (encrypted PII)
     - If yes: updates OAuth tokens
   - Generates JWT token
   ↓
7. Backend redirects to Frontend with JWT token
   ↓
8. Frontend stores JWT (httpOnly cookie or localStorage)
   ↓
9. Frontend fetches user data from /api/auth/me
   ↓
10. User is logged in
```

### API Request Flow (Authenticated)

```
1. Frontend makes request to /api/* with JWT token
   ↓
2. Backend receives request
   ↓
3. Middleware chain:
   - Logger middleware (logs request)
   - CORS middleware (checks origin)
   - Auth middleware (verifies JWT)
   - Rate limit middleware (prevents abuse)
   - Validation middleware (validates request body)
   ↓
4. Route handler:
   - Calls business logic service
   - Service decrypts data if needed
   - Service queries database
   - Service encrypts sensitive data in response
   ↓
5. Response sent back to Frontend
```

## Security Architecture

### Encryption Strategy

See full documentation in [Data-Encryption-Strategy.md](../Architecture/Backend/Data-Encryption-Strategy.md)

**Key Points:**
- **Passwords**: Hashed with Argon2id (NOT encrypted)
- **PII** (email, name): Encrypted with XChaCha20-Poly1305
- **Searchable fields**: Dual storage (encrypted + hash)
- **OAuth tokens**: Encrypted before storage
- **Database**: TDE (Transparent Data Encryption) enabled
- **Keys**: Stored in secrets manager (production)

### Authentication

- **JWT tokens**: Signed with HS256
- **Token expiry**: 7 days (refresh token: 30 days)
- **Storage**: httpOnly cookies (CSRF protection)
- **OAuth**: Google OAuth 2.0 with PKCE

### API Security

- **CORS**: Whitelist frontend origin
- **Rate Limiting**: 100 requests/minute per IP
- **Input Validation**: Zod schemas for all endpoints
- **SQL Injection**: Parameterized queries
- **XSS**: Content Security Policy headers
- **CSRF**: SameSite cookies + CSRF tokens

## Performance Considerations

### Backend

- **Bun runtime**: ~3x faster than Node.js
- **Hono framework**: ~10x faster than Express
- **Connection pooling**: Reuse database connections
- **Encryption caching**: Request-level cache for decrypted values

### Frontend

- **Code splitting**: Routes loaded on demand
- **Tree shaking**: Unused code eliminated
- **Asset optimization**: Images compressed, lazy loaded
- **Bundle size**: Target < 200KB initial bundle

### Database

- **Indexes**: On frequently queried columns (email_hash, user_id)
- **Query optimization**: EXPLAIN ANALYZE for slow queries
- **Connection pooling**: Max 20 connections

## Scalability

### Horizontal Scaling

- **Stateless backend**: No session storage (JWT in cookies)
- **Load balancer**: Round-robin across multiple backend instances
- **Database**: Read replicas for scaling reads

### Vertical Scaling

- **Bun's speed**: Can handle 100k+ req/s on single instance
- **Resource limits**: Set memory/CPU limits in production

## Monitoring & Logging

- **Logging**: Structured JSON logs (winston/pino)
- **Metrics**: Request duration, error rates, database queries
- **Alerts**: Slack/email on critical errors
- **Health checks**: `/health` endpoint for load balancer

## Deployment

### Development

```bash
bun run dev  # Both frontend and backend
```

### Production

```bash
# Build
bun run build

# Start
bun run start
```

### Recommended Hosting

- **Backend**: Railway, Fly.io, Render
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: Neon (PostgreSQL), Railway, Supabase

## Future Enhancements

- [ ] Microservices architecture (split backend into services)
- [ ] GraphQL API (alternative to REST)
- [ ] WebSocket support (real-time features)
- [ ] Redis caching (session storage, rate limiting)
- [ ] Message queue (background jobs)
- [ ] CDN integration (static assets)

## See Also

- [Getting Started](./GETTING_STARTED.md)
- [API Documentation](./API.md)
- [Data Encryption Strategy](../Architecture/Backend/Data-Encryption-Strategy.md)
- [Development Setup](./DEVELOPMENT.md)
