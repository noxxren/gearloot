# @honokit/shared

Shared TypeScript types, utilities, and constants used across the Honokit monorepo.

## Purpose

This package provides:
- **Types** - Shared TypeScript interfaces and types (User, API responses, etc.)
- **Utils** - Common utility functions (validation, formatting, etc.)
- **Constants** - Shared constants (API endpoints, error codes, etc.)

## Usage

### In Backend (Bun + Hono)

```typescript
import { User, ApiResponse } from '@honokit/shared/types'
import { isValidEmail } from '@honokit/shared/utils'
import { API_ENDPOINTS, HTTP_STATUS } from '@honokit/shared/constants'

app.post('/auth/register', async c => {
  const { email } = await c.req.json()

  if (!isValidEmail(email)) {
    return c.json<ApiResponse>(
      { success: false, error: { message: 'Invalid email' } },
      HTTP_STATUS.BAD_REQUEST
    )
  }

  // ... register logic
})
```

### In Frontend (Vue + TypeScript)

```typescript
import type { User, LoginResponse } from '@honokit/shared/types'
import { isValidEmail, formatDate } from '@honokit/shared/utils'
import { API_ENDPOINTS } from '@honokit/shared/constants'

// In component
const login = async (email: string, password: string) => {
  if (!isValidEmail(email)) {
    throw new Error('Invalid email')
  }

  const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })

  const data: LoginResponse = await response.json()
  return data
}
```

## Structure

```
shared/
├── src/
│   ├── types/        # TypeScript types and interfaces
│   ├── utils/        # Utility functions
│   ├── constants/    # Constants
│   └── index.ts      # Main export file
├── package.json
└── tsconfig.json
```

## Guidelines

### Types

- Use interfaces for object shapes
- Use types for unions and primitives
- Export from `types/index.ts`
- Document complex types with JSDoc

### Utils

- Keep functions pure (no side effects)
- Add unit tests for all utilities
- Document parameters and return values
- Export from `utils/index.ts`

### Constants

- Use `const` assertions (`as const`)
- Group related constants together
- Use SCREAMING_SNAKE_CASE for constants
- Export from `constants/index.ts`

## Benefits

1. **Type Safety** - Shared types ensure consistency between frontend and backend
2. **DRY Principle** - Write validation logic once, use everywhere
3. **Single Source of Truth** - API endpoints defined in one place
4. **Easy Refactoring** - Change types once, TypeScript catches all issues

## Example: Adding a New Type

```typescript
// 1. Add to shared/src/types/index.ts
export interface Post {
  id: string
  title: string
  content: string
  authorId: string
  createdAt: string
}

// 2. Use in backend
import type { Post } from '@honokit/shared/types'

app.get('/api/posts/:id', async c => {
  const post: Post = await db.getPost(c.req.param('id'))
  return c.json(post)
})

// 3. Use in frontend
import type { Post } from '@honokit/shared/types'

const posts = ref<Post[]>([])
const fetchPosts = async () => {
  const response = await fetch('/api/posts')
  posts.value = await response.json()
}
```

## Testing

```bash
# Type check
bun run typecheck

# TODO: Add unit tests for utils
bun test
```

## See Also

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/
- Shared types pattern: https://www.typescriptlang.org/docs/handbook/project-references.html
