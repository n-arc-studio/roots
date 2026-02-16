import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../ProtectedRoute';
import { useStore } from '../../hooks/useStore';

// Mock component for testing
const TestComponent = () => <div>Protected Content</div>;
const LoginComponent = () => <div>Login Page</div>;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    // Clear store state before each test
    useStore.setState({
      currentUser: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should redirect to login when user is not authenticated', () => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    // Should show login page instead of protected content
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('should render children when user is authenticated', () => {
    // Set authenticated state
    useStore.setState({
      currentUser: {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test User',
        createdAt: new Date(),
      },
      token: 'mock-token',
      isAuthenticated: true,
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginComponent />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TestComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );

    // Should show protected content
    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });
});
