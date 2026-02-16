export interface Person {
  id: string
  name: string
  birthDate?: Date
  deathDate?: Date
  gender: 'male' | 'female' | 'other'
  biography?: string
  photoIpfsHash?: string
  parentIds: string[]
  childrenIds: string[]
  spouseIds: string[]
  blockchainHash?: string
  createdAt: Date
  updatedAt: Date
}

export interface Memory {
  id: string
  personId: string
  title: string
  content: string
  date: Date
  mediaIpfsHashes: string[]
  tags: string[]
  blockchainHash?: string
  createdBy: string
  createdAt: Date
}

export interface FamilyConnection {
  id: string
  type: 'parent' | 'child' | 'spouse' | 'sibling'
  fromPersonId: string
  toPersonId: string
  metadata?: Record<string, any>
}

export interface User {
  id: string
  email: string
  name: string
  profileImage?: string
  walletAddress?: string
  createdAt: Date
}
