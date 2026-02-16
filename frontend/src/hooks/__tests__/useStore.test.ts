import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStore } from '../useStore';

describe('useStore - Authentication', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({
      currentUser: null,
      token: null,
      isAuthenticated: false,
      familyMembers: [],
      memories: [],
    });
  });

  describe('login', () => {
    it('should set user and token on login', () => {
      const { result } = renderHook(() => useStore());

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test User',
        createdAt: new Date(),
      };
      const mockToken = 'mock-jwt-token';

      act(() => {
        result.current.login(mockUser, mockToken);
      });

      expect(result.current.currentUser).toEqual(mockUser);
      expect(result.current.token).toBe(mockToken);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should persist authentication state in localStorage', () => {
      const { result } = renderHook(() => useStore());

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        username: 'testuser',
        name: 'Test User',
        createdAt: new Date(),
      };
      const mockToken = 'mock-jwt-token';

      act(() => {
        result.current.login(mockUser, mockToken);
      });

      // Check localStorage (zustand persist stores in localStorage)
      const stored = localStorage.getItem('roots-storage');
      expect(stored).toBeDefined();
      
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state.isAuthenticated).toBe(true);
        expect(parsed.state.token).toBe(mockToken);
      }
    });
  });

  describe('logout', () => {
    it('should clear user data on logout', () => {
      const { result } = renderHook(() => useStore());

      // First login
      act(() => {
        result.current.login(
          {
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            name: 'Test User',
            createdAt: new Date(),
          },
          'mock-token'
        );
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Then logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.currentUser).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.familyMembers).toEqual([]);
      expect(result.current.memories).toEqual([]);
    });

    it('should clear localStorage on logout', () => {
      const { result } = renderHook(() => useStore());

      // Login first
      act(() => {
        result.current.login(
          {
            id: '1',
            email: 'test@example.com',
            username: 'testuser',
            name: 'Test User',
            createdAt: new Date(),
          },
          'mock-token'
        );
      });

      // Logout
      act(() => {
        result.current.logout();
      });

      const stored = localStorage.getItem('roots-storage');
      if (stored) {
        const parsed = JSON.parse(stored);
        expect(parsed.state.isAuthenticated).toBe(false);
        expect(parsed.state.token).toBeNull();
      }
    });
  });

  describe('family members', () => {
    it('should add family member', () => {
      const { result } = renderHook(() => useStore());

      const newMember = {
        id: '1',
        name: 'John Doe',
        gender: 'male' as const,
        parentIds: [],
        childrenIds: [],
        spouseIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      act(() => {
        result.current.addFamilyMember(newMember);
      });

      expect(result.current.familyMembers).toHaveLength(1);
      expect(result.current.familyMembers[0]).toEqual(newMember);
    });

    it('should update family member', () => {
      const { result } = renderHook(() => useStore());

      const member = {
        id: '1',
        name: 'John Doe',
        gender: 'male' as const,
        parentIds: [],
        childrenIds: [],
        spouseIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      act(() => {
        result.current.addFamilyMember(member);
      });

      act(() => {
        result.current.updateFamilyMember('1', { name: 'Jane Doe' });
      });

      expect(result.current.familyMembers[0].name).toBe('Jane Doe');
    });

    it('should remove family member', () => {
      const { result } = renderHook(() => useStore());

      const member = {
        id: '1',
        name: 'John Doe',
        gender: 'male' as const,
        parentIds: [],
        childrenIds: [],
        spouseIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      act(() => {
        result.current.addFamilyMember(member);
      });

      expect(result.current.familyMembers).toHaveLength(1);

      act(() => {
        result.current.removeFamilyMember('1');
      });

      expect(result.current.familyMembers).toHaveLength(0);
    });
  });
});
