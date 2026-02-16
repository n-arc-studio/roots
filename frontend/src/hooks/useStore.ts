import { create } from 'zustand'
import { Person, Memory, User } from '../types'

interface AppState {
  // User
  currentUser: User | null
  setCurrentUser: (user: User | null) => void

  // Family Tree
  familyMembers: Person[]
  setFamilyMembers: (members: Person[]) => void
  addFamilyMember: (member: Person) => void
  updateFamilyMember: (id: string, updates: Partial<Person>) => void
  removeFamilyMember: (id: string) => void

  // Memories & Timeline
  memories: Memory[]
  setMemories: (memories: Memory[]) => void
  addMemory: (memory: Memory) => void
  updateMemory: (id: string, updates: Partial<Memory>) => void
  removeMemory: (id: string) => void

  // UI State
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
  error: string | null
  setError: (error: string | null) => void
}

export const useStore = create<AppState>((set) => ({
  // User
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),

  // Family Tree
  familyMembers: [],
  setFamilyMembers: (members) => set({ familyMembers: members }),
  addFamilyMember: (member) =>
    set((state) => ({ familyMembers: [...state.familyMembers, member] })),
  updateFamilyMember: (id, updates) =>
    set((state) => ({
      familyMembers: state.familyMembers.map((m) =>
        m.id === id ? { ...m, ...updates } : m
      ),
    })),
  removeFamilyMember: (id) =>
    set((state) => ({
      familyMembers: state.familyMembers.filter((m) => m.id !== id),
    })),

  // Memories & Timeline
  memories: [],
  setMemories: (memories) => set({ memories }),
  addMemory: (memory) =>
    set((state) => ({ memories: [...state.memories, memory] })),
  updateMemory: (id, updates) =>
    set((state) => ({
      memories: state.memories.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    })),
  removeMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id),
    })),

  // UI State
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),
}))
