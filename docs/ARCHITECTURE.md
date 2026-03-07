# GearLoot Architecture

This document describes the high-level architecture of GearLoot.

## Overview

GearLoot is a **monorepo** containing a fullstack TypeScript application with:
- **Backend**: Bun runtime + Hono web framework
- **Frontend**: Nuxt 4.3.1 + Vue 3 + TypeScript
- **Database**: PostgreSQL/SQLite with migrations
- **Shared**: Common types and utilities

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Client (Browser)                    │
│                  Nuxt 4.3.1 + Vue 3                   │
│            (http://localhost:3001 in dev)             │
└────────────────────────┬────────────────────────────────────────┘
                     │
                     │ HTTP/HTTPS
                     │ (CORS enabled in dev)
                     │
┌──────────────────────▼────────────────────────────────────┐
│              Backend API (Bun + Hono)              │
│          (http://localhost:3000 in dev)             │
│                                                          │
│  ┌────────────────────────────────────────────────┐    │
│  │  Routes (auth, users, marketplace)     │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                      │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Middleware (auth, validation, CORS)   │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                      │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Business Logic (services, controllers)  │    │
│  └──────────────┬─────────────────────────────────┘    │
│                 │                                      │
│  ┌──────────────▼─────────────────────────────────┐    │
│  │  Database Layer (Prisma ORM)           │    │
│  └──────────────┬─────────────────────────────────┘    │
└─────────────────┼────────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────────────────────────────┐
│         Database (PostgreSQL / SQLite)                   │
│              - Users, Listings, Messages                    │
│              - Encrypted PII (email, name)                │
│              - Hashed passwords (Argon2id)                 │
└──────────────────────────────────────────────────────────────────┘
```

## Directory Structure

```
gearloot/
├── apps/
│   ├── client/              # Nuxt 4.3.1 + TypeScript frontend
│   │   ├── pages/            # File-based routing
│   │   ├── components/       # Vue components
│   │   ├── composables/     # Vue composables
│   │   ├── layouts/          # Nuxt layouts
│   │   ├── plugins/          # Nuxt plugins
│   │   ├── assets/           # Static assets (CSS, images)
│   │   ├── app.vue          # Root component
│   │   ├── app.config.ts    # Global app config (Nuxt UI)
│   │   └── nuxt.config.ts   # Nuxt framework config
│   │
│   ├── server/              # Backend API server
│   │   ├── src/
│   │   │   ├── routes/       # API route handlers
│   │   │   ├── middleware/   # Request/response middleware
│   │   │   ├── lib/          # Utilities (db, helpers)
│   │   │   ├── controllers/  # Request controllers
│   │   │   ├── services/     # Business logic
│   │   │   ├── config/       # Configuration files
│   │   │   ├── mocks/        # Mock data
│   │   │   └── index.ts      # Entry point
│   │   ├── tests/            # Backend tests
│   │   └── package.json
│   │
│   └── database/           # Database management
│       ├── migrations/       # Schema migrations
│       ├── seeds/            # Seed data
│       └── schema/           # Schema documentation
│
├── packages/
│   └── shared/             # Shared code
│       ├── types/            # Shared TypeScript types
│       ├── utils/            # Shared utilities
│       └── constants/        # Shared constants
│
├── docs/                  # Documentation
└── .github/               # CI/CD workflows
```

## Key Technologies

### Backend

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Lightweight, fast web framework
- **Language**: TypeScript 5.3.3
- **Database**: PostgreSQL (prod) / SQLite (dev)
- **ORM**: Prisma (planned)

### Frontend

- **Framework**: [Nuxt 4.3.1](https://nuxt.com/) - Vue 3 meta-framework
- **UI Library**: [Nuxt UI 4.5.1](https://ui.nuxt.com/) - 125+ components
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **Styling**: Tailwind CSS (included with Nuxt UI)
- **Routing**: File-based (pages/ directory)
- **Forms**: vee-validate v5 + Zod
- **HTTP**: axios + useFetch (Nuxt built-in)
- **Internationalization**: @nuxtjs/i18n v9

### Loading States & Skeletons

**REQUIREMENT:** W każdej nowej funkcji należy pamiętać o **loading states** i utworzyć **skeleton components** do wyświetlania podczas ładowania danych.

**Implementacja:**
1. **Loading state** - flaga `loading: boolean` w composables/stores
2. **Skeleton components** - komponenty zastępcze (SkeletonCard, SkeletonList, itp.)
3. **Wyświetlanie:**
   - Podczas ładowania danych → pokaż skeleton
   - Po załadowaniu → pokaż prawdziwe dane
   - W przypadku błędu → pokaż komponent błędu

**Przykład:**
```vue
<script setup>
const { data, loading, error } = useMarketplace()
</script>

<template>
  <!-- Skeleton podczas ładowania -->
  <SkeletonCard v-if="loading" />

  <!-- Prawdziwe dane po załadowaniu -->
  <ProductCard v-else-if="data" :product="data" />

  <!-- Błąd -->
  <ErrorCard v-else-if="error" />
</template>
```

**Dostępne skeleton components w Nuxt UI:**
- `USkeleton` - podstawowy skeleton
- `USkeletonCard` - skeleton dla kart (np. ProductCard)
- `USkeletonList` - skeleton dla list

**Pamiętaj:** Implementacja loading states i skeleton components jest **OBOWIĄ** przy każdej nowej funkcji wypisującej dane z API.

### Shared

- **Type Sharing**: TypeScript interfaces shared between frontend and backend
- **Validation**: Shared validation logic (Zod schemas)
- **Constants**: API endpoints, error codes

## API Routes

### Authentication (`/auth`)
- `POST /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - OAuth callback
- `POST /auth/login` - Email/password login (planned)
- `POST /auth/register` - User registration (planned)
- `GET /auth/me` - Get current user profile

### Users (`/users`)
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile
- `GET /users/:id/listings` - Get user's marketplace listings

### Marketplace (planned)
- `GET /listings` - Browse marketplace listings
- `POST /listings` - Create new listing
- `PUT /listings/:id` - Update listing
- `DELETE /listings/:id` - Delete listing

### Chat (planned)
- `GET /chats/:id` - Get chat messages
- `POST /chats/:id` - Send message
- `GET /chats` - List user chats

## Data Flow

### Marketplace Browsing
```
1. Frontend: User navigates to /marketplace
2. Frontend: useFetch('/api/listings?filter=larp')
3. Backend: Route handler receives request
4. Backend: Middleware chain (CORS, validation)
5. Backend: Service queries database (Prisma)
6. Backend: Response with listings data
7. Frontend: Nuxt displays listings (ProductCard components)
```

### Creating a Listing
```
1. Frontend: User fills out listing form
2. Frontend: vee-validate validates with Zod schema
3. Frontend: POST /api/listings with JWT token
4. Backend: Auth middleware verifies JWT
5. Backend: Validation middleware validates request body
6. Backend: Service saves listing to database
7. Backend: Response with created listing
8. Frontend: Nuxt navigates to listing detail
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

**Key components available:**
- Buttons, Cards, Inputs, Modals
- Navigation, Dropdowns, Forms
- Avatar, Badge, Skeleton
- And 100+ more

## Security Architecture

### Authentication
- **JWT tokens**: Signed with HS256
- **Token expiry**: 7 days (refresh token: 30 days)
- **Storage**: httpOnly cookies (CSRF protection)
- **OAuth**: Google OAuth 2.0 (planned)

### API Security
- **CORS**: Whitelist frontend origin
- **Rate Limiting**: Prevent abuse (planned)
- **Input Validation**: Zod schemas for all endpoints
- **SQL Injection**: Parameterized queries (Prisma)
- **XSS**: Content Security Policy headers

## Performance Considerations

### Backend
- **Bun runtime**: ~3x faster than Node.js
- **Hono framework**: ~10x faster than Express
- **Connection pooling**: Reuse database connections

### Frontend
- **File-based routing**: Code splitting by page
- **Nuxt optimizations**: Automatic tree shaking
- **Asset optimization**: Lazy loading, compression
- **Bundle size**: Nuxt optimizations built-in

## Scalability

### Horizontal Scaling
- **Stateless backend**: No session storage (JWT in cookies)
- **Load balancer**: Round-robin across multiple instances
- **Database**: Read replicas for scaling reads

### Vertical Scaling
- **Bun's speed**: High request handling capacity
- **Resource limits**: Set memory/CPU limits in production

## Monitoring & Logging

- **Logging**: Structured JSON logs (planned)
- **Metrics**: Request duration, error rates (planned)
- **Health checks**: `/health` endpoint for load balancer (planned)

## Deployment

### Development
```bash
bun run dev  # Both frontend and backend
```

### Production
```bash
bun run build  # Build all apps
bun run start  # Start production server
```

### Recommended Hosting
- **Backend**: Railway, Fly.io, Render
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Database**: Neon (PostgreSQL), Railway, Supabase

## Future Enhancements
- [ ] Prisma ORM integration
- [ ] Real-time chat (WebSocket support)
- [ ] Image upload moderation (AI)
- [ ] Redis caching
- [ ] Message queue (background jobs)
- [ ] CDN integration (static assets)

## See Also
- [Getting Started](./GETTING_STARTED.md)
- [API Documentation](./API.md)
- [Nuxt UI Docs](https://ui.nuxt.com/)
- [Nuxt Documentation](https://nuxt.com/)
