import axios from 'axios'
import { Person, Memory } from '../types'

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth
export const authAPI = {
  login: async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password })
    return data
  },
  register: async (email: string, password: string, name: string) => {
    const { data } = await apiClient.post('/auth/register', { email, password, name })
    return data
  },
  verify: async (token: string) => {
    const { data } = await apiClient.get('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  },
}

// Persons
export const personAPI = {
  getAll: async (): Promise<Person[]> => {
    const { data } = await apiClient.get('/persons')
    return data
  },
  getById: async (id: string): Promise<Person> => {
    const { data } = await apiClient.get(`/persons/${id}`)
    return data
  },
  create: async (person: Partial<Person>): Promise<Person> => {
    const { data } = await apiClient.post('/persons', person)
    return data
  },
  update: async (id: string, updates: Partial<Person>): Promise<Person> => {
    const { data } = await apiClient.put(`/persons/${id}`, updates)
    return data
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/persons/${id}`)
  },
}

// Memories
export const memoryAPI = {
  getAll: async (): Promise<Memory[]> => {
    const { data } = await apiClient.get('/memories')
    return data
  },
  getByPerson: async (personId: string): Promise<Memory[]> => {
    const { data } = await apiClient.get(`/memories/person/${personId}`)
    return data
  },
  create: async (memory: Partial<Memory>): Promise<Memory> => {
    const { data } = await apiClient.post('/memories', memory)
    return data
  },
  update: async (id: string, updates: Partial<Memory>): Promise<Memory> => {
    const { data } = await apiClient.put(`/memories/${id}`, updates)
    return data
  },
  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/memories/${id}`)
  },
}

// AI
export const aiAPI = {
  ask: async (question: string, context?: string) => {
    const { data } = await apiClient.post('/ai/ask', { question, context })
    return data
  },
  summarize: async (familyData: any) => {
    const { data } = await apiClient.post('/ai/summarize', { familyData })
    return data
  },
  organize: async (memories: Memory[]) => {
    const { data } = await apiClient.post('/ai/organize', { memories })
    return data
  },
}

export default apiClient
