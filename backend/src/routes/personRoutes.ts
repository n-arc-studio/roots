import { Router } from 'express'

const router = Router()

// Get all persons
router.get('/', async (req, res) => {
  res.json({ message: 'Get all persons - to be implemented' })
})

// Get person by ID
router.get('/:id', async (req, res) => {
  res.json({ message: `Get person ${req.params.id} - to be implemented` })
})

// Create person
router.post('/', async (req, res) => {
  res.json({ message: 'Create person - to be implemented' })
})

// Update person
router.put('/:id', async (req, res) => {
  res.json({ message: `Update person ${req.params.id} - to be implemented` })
})

// Delete person
router.delete('/:id', async (req, res) => {
  res.json({ message: `Delete person ${req.params.id} - to be implemented` })
})

export default router
