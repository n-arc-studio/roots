import { describe, it, expect, beforeAll, afterAll, jest } from '@jest/globals';
import request from 'supertest';
import express, { Express } from 'express';
import authRoutes from '../../routes/authRoutes';

// Mock dependencies
jest.mock('../../models/User');
jest.mock('../../utils/jwt');

import { UserModel } from '../../models/User';
import { generateToken } from '../../utils/jwt';

describe('Auth Routes', () => {
  let app: Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/auth/register', () => {
    it('should register a new user with valid data', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
        avatar_url: null,
        created_at: new Date(),
        email_verified: false,
      };

      const mockToken = 'mock-jwt-token';

      (UserModel.emailExists as jest.Mock).mockResolvedValue(false);
      (UserModel.create as jest.Mock).mockResolvedValue(mockUser);
      (generateToken as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'TestPass123',
          username: 'testuser',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token', mockToken);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should return 400 if required fields are missing', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          // missing password and username
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for invalid email', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'invalid-email',
          password: 'TestPass123',
          username: 'testuser',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('メールアドレス');
    });

    it('should return 400 for weak password', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'weak',
          username: 'testuser',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toContain('パスワード');
    });

    it('should return 409 if email already exists', async () => {
      (UserModel.emailExists as jest.Mock).mockResolvedValue(true);

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'existing@example.com',
          password: 'TestPass123',
          username: 'testuser',
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toContain('既に登録');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed-password',
        username: 'testuser',
        is_active: true,
      };

      const mockToken = 'mock-jwt-token';

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (UserModel.verifyPassword as jest.Mock).mockResolvedValue(true);
      (UserModel.updateLastLogin as jest.Mock).mockResolvedValue(undefined);
      (generateToken as jest.Mock).mockReturnValue(mockToken);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token', mockToken);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).not.toHaveProperty('password_hash');
    });

    it('should return 400 if email or password is missing', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          // missing password
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('should return 401 for non-existent user', async () => {
      (UserModel.findByEmail as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'TestPass123',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('正しくありません');
    });

    it('should return 401 for incorrect password', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed-password',
        username: 'testuser',
        is_active: true,
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);
      (UserModel.verifyPassword as jest.Mock).mockResolvedValue(false);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'WrongPassword123',
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toContain('正しくありません');
    });

    it('should return 403 for inactive user', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password_hash: 'hashed-password',
        username: 'testuser',
        is_active: false,
      };

      (UserModel.findByEmail as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123',
        });

      expect(response.status).toBe(403);
      expect(response.body.error).toContain('無効化');
    });
  });
});
