import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { honokitMiddlewareLogger } from '@/middlewares/logger'
import * as userServices from "@/services/users/usersServices";
import usersRoutes from '@/routes/users'

const app = new Hono()
// Middleware
app.use('*', honokitMiddlewareLogger())
app.use('*', cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))

// Health check
app.get('/health', c => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

// API routes
app.get('/api', c => {
  return c.json({
    message: 'Honokit API',
    version: '0.1.0',
  })
})

app.route('/api/users', usersRoutes)

const port = parseInt(process.env.PORT || '3000')

console.log(`🚀 Server starting on http://localhost:${port}`)

export default {
  port,
  fetch: app.fetch,
}
