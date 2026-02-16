// Jest setup file
import dotenv from 'dotenv';

// Load test environment variables
dotenv.config({ path: '.env.test' });

// Set test environment
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.DB_HOST = 'localhost';
process.env.DB_PORT = '5433';
process.env.DB_USER = 'roots_user';
process.env.DB_PASSWORD = 'roots_password';
process.env.DB_NAME = 'roots_test';

// Global test timeout
jest.setTimeout(10000);
