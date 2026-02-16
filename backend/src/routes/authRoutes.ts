import { Router, Request, Response } from 'express';
import { UserModel } from '../models/User';
import { generateToken } from '../utils/jwt';
import { validateEmail, validatePassword, validateUsername } from '../utils/validation';
import { authenticate, AuthRequest } from '../middleware/auth';

const router = Router();

// Register
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Validation
    if (!email || !password || !username) {
      res.status(400).json({ error: 'メールアドレス、パスワード、ユーザー名は必須です' });
      return;
    }

    if (!validateEmail(email)) {
      res.status(400).json({ error: '有効なメールアドレスを入力してください' });
      return;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      res.status(400).json({ error: passwordValidation.message });
      return;
    }

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.valid) {
      res.status(400).json({ error: usernameValidation.message });
      return;
    }

    // Check if email already exists
    const emailExists = await UserModel.emailExists(email);
    if (emailExists) {
      res.status(409).json({ error: 'このメールアドレスは既に登録されています' });
      return;
    }

    // Create user
    const user = await UserModel.create({ email, password, username });

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    res.status(201).json({
      message: 'ユーザー登録が完了しました',
      user,
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: '登録処理中にエラーが発生しました' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      res.status(400).json({ error: 'メールアドレスとパスワードは必須です' });
      return;
    }

    // Find user
    const user = await UserModel.findByEmail(email);
    if (!user) {
      res.status(401).json({ error: 'メールアドレスまたはパスワードが正しくありません' });
      return;
    }

    // Check if user is active
    if (!user.is_active) {
      res.status(403).json({ error: 'このアカウントは無効化されています' });
      return;
    }

    // Verify password
    const isPasswordValid = await UserModel.verifyPassword(user, password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'メールアドレスまたはパスワードが正しくありません' });
      return;
    }

    // Update last login
    await UserModel.updateLastLogin(user.id);

    // Generate token
    const token = generateToken({ userId: user.id, email: user.email });

    // Return user data (without password)
    const { password_hash, ...userWithoutPassword } = user;

    res.json({
      message: 'ログインに成功しました',
      user: userWithoutPassword,
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'ログイン処理中にエラーが発生しました' });
  }
});

// Get current user
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: '認証が必要です' });
      return;
    }

    const user = await UserModel.findById(req.user.userId);
    
    if (!user) {
      res.status(404).json({ error: 'ユーザーが見つかりません' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'ユーザー情報の取得中にエラーが発生しました' });
  }
});

// Verify token
router.get('/verify', authenticate, async (req: AuthRequest, res: Response) => {
  res.json({ valid: true, user: req.user });
});

export default router;
