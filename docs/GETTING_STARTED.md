# Getting Started with Honokit

Welcome to Honokit! This guide will help you set up and run the project locally.

## Prerequisites

- **Bun** >= 1.0.0 - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** >= 18.0.0 (for frontend tools)
- **Database**: PostgreSQL or SQLite

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/honokit.git
cd honokit
```

### 2. Install dependencies

```bash
# Install all workspace dependencies
bun install
```

### 3. Set up environment variables

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env
# Edit apps/backend/.env and fill in your values

# Frontend
cp apps/frontend/.env.example apps/frontend/.env
# Edit apps/frontend/.env and fill in your values
```

### 4. Generate encryption keys

```bash
# ENCRYPTION_KEY (32 bytes)
bun run -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# JWT_SECRET (64 bytes)
bun run -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Add these to `apps/backend/.env`:
```
ENCRYPTION_KEY=<generated_key_here>
JWT_SECRET=<generated_secret_here>
```

### 5. Set up the database

```bash
# Run migrations
bun run db:migrate

# (Optional) Seed with test data
bun run db:seed
```

### 6. Set up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use existing)
3. Enable Google+ API
4. Create OAuth 2.0 credentials
   - Authorized redirect URIs: `http://localhost:3000/auth/google/callback`
5. Copy Client ID and Client Secret to `apps/backend/.env`:

```
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
```

## Running the Project

### Development Mode (Recommended)

Run both backend and frontend in parallel:

```bash
bun run dev
```

This starts:
- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

### Run Separately

```bash
# Terminal 1 - Backend
bun run dev:backend

# Terminal 2 - Frontend
bun run dev:frontend
```

## Project Structure

```
honokit/
├── apps/
│   ├── backend/       # Bun + Hono API server
│   ├── frontend/      # Vue 3 + TypeScript SPA
│   └── database/      # Migrations and seeds
├── packages/
│   └── shared/        # Shared types and utilities
├── docs/              # Documentation
└── .github/           # GitHub Actions workflows
```

## Testing

```bash
# Run all tests
bun test

# Test backend
bun run test:backend

# Test frontend
bun run test:frontend
```

## Building for Production

```bash
# Build all apps
bun run build

# Build individually
bun run build:backend
bun run build:frontend
```

## Common Issues

### Port Already in Use

If port 3000 or 5173 is already in use:

```bash
# Change PORT in apps/backend/.env
PORT=3001

# Vite will automatically try next available port
```

### Database Connection Error

Make sure your `DATABASE_URL` is correct in `apps/backend/.env`:

```bash
# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost:5432/honokit_dev

# SQLite (easier for development)
DATABASE_URL=sqlite://./honokit.db
```

### Encryption Key Missing

If you see "ENCRYPTION_KEY must be 32-byte hex string":

1. Generate a key: `bun run -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
2. Add to `apps/backend/.env`
3. Restart the server

## Next Steps

- Read the [Architecture Documentation](./ARCHITECTURE.md)
- Check out the [API Documentation](./API.md)
- Learn about [Data Encryption Strategy](../apps/backend/src/lib/README.md)
- Set up your IDE with [Development Setup](./DEVELOPMENT.md)

## Need Help?

- Check [FAQ](./FAQ.md)
- Open an issue on GitHub
- Read the code comments and README files in each directory

Happy coding! 🚀
