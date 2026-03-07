import { Hono } from 'hono'

const auth = new Hono()

// TODO: Implement authentication routes
auth.post('/register', async c => {
  return c.json({ message: 'Register endpoint - TODO' })
})

auth.post('/login', async c => {
  return c.json({ message: 'Login endpoint - TODO' })
})

auth.post('/logout', async c => {
  return c.json({ message: 'Logout endpoint - TODO' })
})

auth.get('/me', async c => {
  return c.json({ message: 'Get current user - TODO' })
})

// Google OAuth routes
auth.get('/google', async c => {
  return c.json({ message: 'Google OAuth redirect - TODO' })
})

auth.get('/google/callback', async c => {
  return c.json({ message: 'Google OAuth callback - TODO' })
})

export default auth
