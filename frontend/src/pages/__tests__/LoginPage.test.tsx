import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { LoginPage } from '../LoginPage';
import { useStore } from '../../hooks/useStore';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock fetch
global.fetch = vi.fn();

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useStore.setState({
      currentUser: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should render login form by default', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(screen.getByText('Roots')).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('example@email.com')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument();
  });

  it('should switch to registration form when clicked', async () => {
    const user = userEvent.setup();
    
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const registerTab = screen.getByRole('button', { name: '新規登録' });
    await user.click(registerTab);

    expect(screen.getByPlaceholderText('山田太郎')).toBeInTheDocument();
  });

  it('should show error for invalid email', async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: '有効なメールアドレスを入力してください' }),
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Switch to registration
    const registerTab = screen.getByRole('button', { name: '新規登録' });
    await user.click(registerTab);

    // Fill form with invalid email
    await user.type(screen.getByPlaceholderText('山田太郎'), 'testuser');
    await user.type(screen.getByPlaceholderText('example@email.com'), 'invalid-email');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Test1234');

    // Submit
    const submitButton = screen.getByRole('button', { name: '登録する' });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/メールアドレス/)).toBeInTheDocument();
    });
  });

  it('should successfully login with valid credentials', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      user: {
        id: 1,
        email: 'test@example.com',
        username: 'testuser',
      },
      token: 'mock-token',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Fill login form
    await user.type(screen.getByPlaceholderText('example@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Test1234');

    // Submit
    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/family-tree');
    });
  });

  it('should successfully register with valid data', async () => {
    const user = userEvent.setup();
    const mockResponse = {
      user: {
        id: 1,
        email: 'newuser@example.com',
        username: 'newuser',
      },
      token: 'mock-token',
      message: 'ユーザー登録が完了しました',
    };

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    // Switch to registration
    const registerTab = screen.getByRole('button', { name: '新規登録' });
    await user.click(registerTab);

    // Fill registration form
    await user.type(screen.getByPlaceholderText('山田太郎'), 'newuser');
    await user.type(screen.getByPlaceholderText('example@email.com'), 'newuser@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'NewPass123');

    // Submit
    const registerButton = screen.getByRole('button', { name: '登録する' });
    await user.click(registerButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/family-tree');
    });
  });

  it('should show loading state during submission', async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    await user.type(screen.getByPlaceholderText('example@email.com'), 'test@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'Test1234');

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    expect(screen.getByText('処理中...')).toBeInTheDocument();
  });

  it('should display error message on failed login', async () => {
    const user = userEvent.setup();

    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'メールアドレスまたはパスワードが正しくありません' }),
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    await user.type(screen.getByPlaceholderText('example@email.com'), 'wrong@example.com');
    await user.type(screen.getByPlaceholderText('••••••••'), 'WrongPass123');

    const loginButton = screen.getByRole('button', { name: 'ログイン' });
    await user.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText(/正しくありません/)).toBeInTheDocument();
    });
  });
});
