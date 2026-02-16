import { Request, Response, NextFunction } from 'express'

export interface ApiError extends Error {
  statusCode?: number
  isOperational?: boolean
  translationKey?: string
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  let message = err.message || 'Internal Server Error'
  
  // Use translation if available
  if (err.translationKey && req.t) {
    message = req.t(err.translationKey)
  }

  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    statusCode,
    path: req.path,
    method: req.method
  })

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  })
}

export class AppError extends Error implements ApiError {
  statusCode: number
  isOperational: boolean
  translationKey?: string

  constructor(message: string, statusCode: number = 500, translationKey?: string) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true
    this.translationKey = translationKey
    Error.captureStackTrace(this, this.constructor)
  }
}
