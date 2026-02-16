import { Router } from 'express'

const router = Router()

// Get all memories
router.get('/', async (req, res) => {
  res.json({ message: 'Get all memories - to be implemented' })
})

// Get memories by person
router.get('/person/:personId', async (req, res) => {
  res.json({ message: `Get memories for person ${req.params.personId} - to be implemented` })
})

// Create memory
router.post('/', async (req, res) => {
  res.json({ message: 'Create memory - to be implemented' })
})

// Update memory
router.put('/:id', async (req, res) => {
  res.json({ message: `Update memory ${req.params.id} - to be implemented` })
})

// Delete memory
router.delete('/:id', async (req, res) => {
  res.json({ message: `Delete memory ${req.params.id} - to be implemented` })
})

export default router
