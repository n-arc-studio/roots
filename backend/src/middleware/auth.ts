import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { UserModel } from '../models/User';

export interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ error: '認証が必要です' });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({ error: '無効なトークンです' });
      return;
    }

    // Verify user still exists and is active
    const user = await UserModel.findById(payload.userId);
    
    if (!user || !user.is_active) {
      res.status(401).json({ error: 'ユーザーが見つかりません' });
      return;
    }

    req.user = {
      userId: payload.userId,
      email: payload.email,
    };

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: '認証処理中にエラーが発生しました' });
  }
};

export const optionalAuth = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyToken(token);

      if (payload) {
        const user = await UserModel.findById(payload.userId);
        if (user && user.is_active) {
          req.user = {
            userId: payload.userId,
            email: payload.email,
          };
        }
      }
    }

    next();
  } catch (error) {
    // Continue without auth
    next();
  }
};
