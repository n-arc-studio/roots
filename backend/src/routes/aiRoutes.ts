import { Router } from 'express'

const router = Router()

// Ask AI about family history
router.post('/ask', async (req, res) => {
  res.json({ message: 'AI ask endpoint - to be implemented' })
})

// Generate family summary
router.post('/summarize', async (req, res) => {
  res.json({ message: 'AI summarize endpoint - to be implemented' })
})

// Organize memories
router.post('/organize', async (req, res) => {
  res.json({ message: 'AI organize endpoint - to be implemented' })
})

export default router
