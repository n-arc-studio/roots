import { query } from '../db';
import bcrypt from 'bcrypt';

export interface User {
  id: number;
  email: string;
  password_hash: string;
  username: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
  last_login?: Date;
  email_verified: boolean;
  is_active: boolean;
}

export interface CreateUserInput {
  email: string;
  password: string;
  username: string;
}

export interface UserResponse {
  id: number;
  email: string;
  username: string;
  avatar_url?: string;
  created_at: Date;
  email_verified: boolean;
  is_active: boolean;
}

export class UserModel {
  static async create(input: CreateUserInput): Promise<UserResponse> {
    const { email, password, username } = input;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO users (email, password_hash, username) 
       VALUES ($1, $2, $3) 
       RETURNING id, email, username, avatar_url, created_at, email_verified`,
      [email, password_hash, username]
    );

    return result.rows[0];
  }

  static async findByEmail(email: string): Promise<User | null> {
    const result = await query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    return result.rows[0] || null;
  }

  static async findById(id: number): Promise<UserResponse | null> {
    const result = await query(
      `SELECT id, email, username, avatar_url, created_at, email_verified, is_active 
       FROM users WHERE id = $1 AND is_active = true`,
      [id]
    );

    return result.rows[0] || null;
  }

  static async verifyPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password_hash);
  }

  static async updateLastLogin(userId: number): Promise<void> {
    await query(
      'UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
      [userId]
    );
  }

  static async emailExists(email: string): Promise<boolean> {
    const result = await query(
      'SELECT COUNT(*) FROM users WHERE email = $1',
      [email]
    );
    return parseInt(result.rows[0].count) > 0;
  }
}
