# middleware/

Hono middleware functions for request/response processing.

## Common Middleware

- **auth.ts** - JWT authentication middleware
- **rateLimit.ts** - Rate limiting
- **errorHandler.ts** - Global error handling
- **validation.ts** - Request validation middleware

## Usage Example

```typescript
import { Hono } from 'hono'
import { auth } from './middlewares/auth'

const app = new Hono()

// Protected route
app.get('/api/users', auth, async c => {
  const user = c.get('user')
  return c.json({ user })
})
```

## Guidelines

- Middleware should do one thing well
- Always call `await next()` unless terminating request
- Use `c.set()` to pass data to route handlers
- Document expected context variables
