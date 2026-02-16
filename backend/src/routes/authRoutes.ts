import { Router } from 'express'

const router = Router()

// Login
router.post('/login', async (req, res) => {
  res.json({ message: 'Login endpoint - to be implemented' })
})

// Register
router.post('/register', async (req, res) => {
  res.json({ message: 'Register endpoint - to be implemented' })
})

// Verify token
router.get('/verify', async (req, res) => {
  res.json({ message: 'Verify endpoint - to be implemented' })
})

export default router
