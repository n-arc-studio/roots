import { describe, it, expect, beforeAll } from '@jest/globals';
import { generateToken, verifyToken } from '../jwt';

describe('JWT Utils', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'test-secret-key';
  });

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);

      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });

    it('should generate different tokens for different payloads', () => {
      const payload1 = { userId: 1, email: 'user1@example.com' };
      const payload2 = { userId: 2, email: 'user2@example.com' };

      const token1 = generateToken(payload1);
      const token2 = generateToken(payload2);

      expect(token1).not.toBe(token2);
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return payload', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);

      const verified = verifyToken(token);

      expect(verified).toBeDefined();
      expect(verified?.userId).toBe(payload.userId);
      expect(verified?.email).toBe(payload.email);
    });

    it('should return null for invalid token', () => {
      const invalidToken = 'invalid.token.here';
      const verified = verifyToken(invalidToken);

      expect(verified).toBeNull();
    });

    it('should return null for expired token', () => {
      // Create a token that expires immediately
      const oldSecret = process.env.JWT_SECRET;
      process.env.JWT_EXPIRES_IN = '0s';
      
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);

      // Wait a bit to ensure expiration
      return new Promise((resolve) => {
        setTimeout(() => {
          const verified = verifyToken(token);
          expect(verified).toBeNull();
          
          // Restore original settings
          process.env.JWT_SECRET = oldSecret;
          process.env.JWT_EXPIRES_IN = '7d';
          resolve(undefined);
        }, 100);
      });
    });

    it('should return null for tampered token', () => {
      const payload = { userId: 1, email: 'test@example.com' };
      const token = generateToken(payload);

      // Tamper with the token
      const tamperedToken = token.slice(0, -5) + 'xxxxx';
      const verified = verifyToken(tamperedToken);

      expect(verified).toBeNull();
    });
  });
});
