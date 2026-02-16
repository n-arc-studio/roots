import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js'
import personRoutes from './routes/personRoutes.js'
import memoryRoutes from './routes/memoryRoutes.js'
import authRoutes from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import pool from './db/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Test database connection
pool.query('SELECT NOW()').then((res) => {
  console.log('✅ Database connected:', res.rows[0].now)
}).catch((err) => {
  console.error('❌ Database connection failed:', err)
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(morgan('dev'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/persons', personRoutes)
app.use('/api/memories', memoryRoutes)
app.use('/api/ai', aiRoutes)

// Error handling
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`🌳 Roots backend running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
