import { describe, it, expect } from '@jest/globals';
import { validateEmail, validatePassword, validateUsername } from '../validation';

describe('Validation Utils', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.jp')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('invalid@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('invalid@.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return valid for strong passwords', () => {
      const result = validatePassword('StrongPass123');
      expect(result.valid).toBe(true);
      expect(result.message).toBeUndefined();
    });

    it('should reject passwords shorter than 8 characters', () => {
      const result = validatePassword('Short1A');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('パスワードは8文字以上である必要があります');
    });

    it('should reject passwords without uppercase letters', () => {
      const result = validatePassword('lowercase123');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('パスワードには大文字を含める必要があります');
    });

    it('should reject passwords without lowercase letters', () => {
      const result = validatePassword('UPPERCASE123');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('パスワードには小文字を含める必要があります');
    });

    it('should reject passwords without numbers', () => {
      const result = validatePassword('NoNumbers');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('パスワードには数字を含める必要があります');
    });

    it('should accept passwords with all requirements', () => {
      expect(validatePassword('ValidPass123').valid).toBe(true);
      expect(validatePassword('MyP@ssw0rd').valid).toBe(true);
      expect(validatePassword('Test1234').valid).toBe(true);
    });
  });

  describe('validateUsername', () => {
    it('should return valid for acceptable usernames', () => {
      expect(validateUsername('yamada').valid).toBe(true);
      expect(validateUsername('user_123').valid).toBe(true);
      expect(validateUsername('山田太郎').valid).toBe(true);
      expect(validateUsername('やまだ太郎').valid).toBe(true);
    });

    it('should reject usernames shorter than 3 characters', () => {
      const result = validateUsername('ab');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('ユーザー名は3文字以上である必要があります');
    });

    it('should reject usernames longer than 50 characters', () => {
      const longName = 'a'.repeat(51);
      const result = validateUsername(longName);
      expect(result.valid).toBe(false);
      expect(result.message).toBe('ユーザー名は50文字以下である必要があります');
    });

    it('should reject usernames with invalid characters', () => {
      const result = validateUsername('user@name');
      expect(result.valid).toBe(false);
      expect(result.message).toBe('ユーザー名には英数字、アンダースコア、日本語のみ使用できます');
    });

    it('should accept usernames with exactly 3 characters', () => {
      const result = validateUsername('abc');
      expect(result.valid).toBe(true);
    });

    it('should accept usernames with exactly 50 characters', () => {
      const name50 = 'a'.repeat(50);
      const result = validateUsername(name50);
      expect(result.valid).toBe(true);
    });

    it('should accept Japanese characters', () => {
      expect(validateUsername('田中太郎').valid).toBe(true);
      expect(validateUsername('たなか').valid).toBe(true);
      expect(validateUsername('タナカ').valid).toBe(true);
    });
  });
});
