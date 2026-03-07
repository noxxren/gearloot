# Getting Started with GearLoot

Welcome to GearLoot! This guide will help you set up and run the project locally.

## Branch GL-0001 Overview

**Branch:** `feature/GL-0001` contains the initial project structure:

- ✅ **Monorepo structure** with Bun workspaces
- ✅ **Backend (Bun + Hono)** - API server with auth and user routes
- ✅ **Client (Nuxt 4.3.1)** - Vue 3 frontend with Nuxt UI
- ✅ **Database** - Migrations and seeds structure
- ✅ **Shared packages** - Common types and utilities
- ✅ **CI/CD** - GitHub Actions workflows

## Prerequisites

- **Bun** >= 1.0.0 - [Install Bun](https://bun.sh/docs/installation)
- **Node.js** >= 18.0.0 (for frontend tools)

## Installation

### 1. Clone repository

```bash
git clone https://github.com/noxxren/gearloot.git
cd gearloot
```

### 2. Switch to GL-0001 branch

```bash
git checkout feature/GL-0001
```

### 3. Install dependencies

```bash
# Install all workspace dependencies
bun install
```

This installs dependencies for:
- `apps/client` - Nuxt 4.3.1 with Nuxt UI
- `apps/server` - Bun + Hono backend
- `apps/database` - Database migrations
- `packages/shared` - Shared types and utilities

## Running the Project

### Development Mode (Recommended)

Run all apps in parallel:

```bash
bun run dev
```

This starts:
- **Backend API**: http://localhost:3000
- **Frontend (Nuxt)**: http://localhost:3001

### Run Separately

```bash
# Terminal 1 - Backend
bun run dev:server

# Terminal 2 - Frontend
bun run dev:client
```

### Frontend Development Server

```bash
cd apps/client
bun run dev
```

The Nuxt dev server starts on:
- **URL**: http://localhost:3001
- **DevTools**: Press `Shift + Alt + D` in browser
- **Hot Module Replacement**: Automatic with HMR

### Backend Development Server

```bash
cd apps/server
bun run dev
```

The Hono server starts on:
- **URL**: http://localhost:3000
- **Watch mode**: Auto-restart on file changes

## Project Structure

```
gearloot/
├── apps/
│   ├── client/          # Nuxt 4.3.1 + TypeScript frontend
│   ├── server/          # Bun + Hono API backend
│   └── database/       # Migrations and seeds
├── packages/
│   └── shared/         # Shared types and utilities
├── docs/              # Documentation
└── .github/           # GitHub Actions workflows
```

### Client (Nuxt 4.3.1)

- **Framework**: Vue 3 + Nuxt 4.3.1
- **UI Library**: Nuxt UI 4.5.1 (125+ components)
- **State Management**: Pinia
- **Routing**: File-based (pages/ directory)
- **Forms**: vee-validate + Zod
- **HTTP**: axios + useFetch (Nuxt built-in)
- **Internationalization**: @nuxtjs/i18n

### Server (Bun + Hono)

- **Runtime**: Bun
- **Framework**: Hono 4.0.0
- **Type Safety**: TypeScript 5.3.3
- **Routes**:
  - `/auth` - Authentication routes
  - `/users` - User management routes

### Database

- **Migrations**: `apps/database/migrations/`
- **Seeds**: `apps/database/seeds/`
- **Schema docs**: `apps/database/schema/`

## Available Scripts

### Development

```bash
bun run dev              # Start all apps (server + client)
bun run dev:server       # Start backend only
bun run dev:client       # Start frontend only
```

### Building

```bash
bun run build            # Build all apps
bun run build:server     # Build backend
bun run build:client     # Build frontend
```

### Database

```bash
bun run db:migrate       # Run migrations
bun run db:seed          # Seed database
```

### Code Quality

```bash
bun run typecheck        # Type check all packages
bun run lint             # Lint code
bun run format           # Format code with Prettier
```

## Nuxt UI Configuration

The app uses [Nuxt UI](https://ui.nuxt.com/) for UI components.

**Global theme configuration** (`apps/client/app.config.ts`):
```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'primary-500',  // Elastic color for theming
      neutral: 'zinc'
    },
    icons: {
      // Custom icon mappings with Phosphor Icons
    }
  }
})
```

**Nuxt config** (`apps/client/nuxt.config.ts`):
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/i18n'
  ],
  devServer: { port: 3001 }
})
```

## Common Issues

### Port Already in Use

If port 3000 (backend) or 3001 (frontend) is already in use:

```bash
# Change backend port in apps/server/src/index.ts
const port = 3001

# Change frontend port in apps/client/nuxt.config.ts
devServer: { port: 3002 }
```

### Dependencies Not Found

If you see "bun: command not found: nuxt":

```bash
cd apps/client
bun install
```

This ensures Nuxt is installed locally.

## Implementing New Features

**Ważne przy implementacji każdej nowej funkcji:**

### Loading States & Skeleton Components

Każda nowa funkcja musi implementować loading states:

1. **Composable/Store z loading state:**
   ```typescript
   const { data, loading, error } = useFeature()
   ```

2. **Skeleton component dla każdego widoku:**
   ```vue
   <USkeletonCard v-if="loading" />
   <ProductCard v-else-if="data" />
   <ErrorCard v-else-if="error" />
   ```

3. **Dostępne skeleton components w Nuxt UI:**
   - `USkeleton` - podstawowy
   - `USkeletonCard` - dla kart produktów
   - `USkeletonList` - dla list

### Flow implementacji nowej funkcji:

1. **Utwórz composable** - np. `composables/useFeature.ts`
2. **Dodaj API endpoint** - np. `GET /api/feature`
3. **Utwórz page component** - np. `pages/feature/index.vue`
4. **Utwórz skeleton components** - np. `components/FeatureSkeleton.vue`
5. **Implementuj loading state** - skeleton → dane → błąd
6. **Testuj manualnie** - sprawdź loading states w DevTools
7. **Commit z clear message** - opisz co zostało zrobione

**Przykład:**
```
Feature: Marketplace listings
- Composable: useMarketplace.ts
- Page: pages/marketplace/index.vue
- Skeleton: components/ProductSkeleton.vue
- API: GET /api/listings
- Loading flow: USkeletonCard → ProductCard[]
```

### Dokumentacja po implementacji:

Aktualizuj odpowiednie pliki:
- `docs/ARCHITECTURE.md` - dodaj nowe routes/flows
- `docs/GETTING_STARTED.md` - opisz nowe features

## Next Steps

- Read [Architecture Documentation](./ARCHITECTURE.md)
- Check out [API Documentation](./API.md)
- Learn about [Nuxt UI](https://ui.nuxt.com/)
- Explore Nuxt 4.3.1 features

## Need Help?

- Check [FAQ](./FAQ.md)
- Open an issue on GitHub
- Read code comments and README files in each directory

Happy coding! 🚀
