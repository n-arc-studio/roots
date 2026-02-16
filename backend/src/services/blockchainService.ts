import { ethers } from 'ethers'

// This will be populated after contract deployment
const CONTRACT_ABI = [
  "function registerPerson(string personId, string ipfsHash) external",
  "function registerMemory(string memoryId, string personId, string ipfsHash) external",
  "function updatePerson(string personId, string newIpfsHash) external",
  "function updateMemory(string memoryId, string newIpfsHash) external",
  "function getPerson(string personId) external view returns (tuple(string ipfsHash, address creator, uint256 createdAt, bool exists))",
  "function getMemory(string memoryId) external view returns (tuple(string ipfsHash, string personId, address creator, uint256 createdAt, bool exists))",
  "function getUserPersons(address user) external view returns (string[])",
  "function getUserMemories(address user) external view returns (string[])",
  "event PersonRegistered(string indexed personId, string ipfsHash, address indexed creator, uint256 timestamp)",
  "event MemoryRegistered(string indexed memoryId, string indexed personId, string ipfsHash, address indexed creator, uint256 timestamp)"
]

export class BlockchainService {
  private provider: ethers.Provider
  private contract: ethers.Contract | null = null

  constructor() {
    const rpcUrl = process.env.ETHEREUM_RPC_URL || 'http://localhost:8545'
    this.provider = new ethers.JsonRpcProvider(rpcUrl)
    this.initContract()
  }

  private initContract() {
    const contractAddress = process.env.CONTRACT_ADDRESS
    if (contractAddress) {
      this.contract = new ethers.Contract(
        contractAddress,
        CONTRACT_ABI,
        this.provider
      )
    }
  }

  /**
   * Register person on blockchain
   */
  async registerPerson(personId: string, ipfsHash: string, privateKey: string): Promise<string> {
    try {
      if (!this.contract) throw new Error('Contract not initialized')
      
      const wallet = new ethers.Wallet(privateKey, this.provider)
      const contractWithSigner = this.contract.connect(wallet)
      
      const tx = await contractWithSigner.registerPerson(personId, ipfsHash)
      const receipt = await tx.wait()
      
      return receipt.hash
    } catch (error) {
      console.error('Blockchain registerPerson error:', error)
      throw new Error('ブロックチェーン登録に失敗しました')
    }
  }

  /**
   * Register memory on blockchain
   */
  async registerMemory(
    memoryId: string,
    personId: string,
    ipfsHash: string,
    privateKey: string
  ): Promise<string> {
    try {
      if (!this.contract) throw new Error('Contract not initialized')
      
      const wallet = new ethers.Wallet(privateKey, this.provider)
      const contractWithSigner = this.contract.connect(wallet)
      
      const tx = await contractWithSigner.registerMemory(memoryId, personId, ipfsHash)
      const receipt = await tx.wait()
      
      return receipt.hash
    } catch (error) {
      console.error('Blockchain registerMemory error:', error)
      throw new Error('思い出の登録に失敗しました')
    }
  }

  /**
   * Get person from blockchain
   */
  async getPerson(personId: string): Promise<any> {
    try {
      if (!this.contract) throw new Error('Contract not initialized')
      
      const person = await this.contract.getPerson(personId)
      return {
        ipfsHash: person.ipfsHash,
        creator: person.creator,
        createdAt: new Date(Number(person.createdAt) * 1000),
        exists: person.exists
      }
    } catch (error) {
      console.error('Blockchain getPerson error:', error)
      throw new Error('ブロックチェーンからの取得に失敗しました')
    }
  }

  /**
   * Get memory from blockchain
   */
  async getMemory(memoryId: string): Promise<any> {
    try {
      if (!this.contract) throw new Error('Contract not initialized')
      
      const memory = await this.contract.getMemory(memoryId)
      return {
        ipfsHash: memory.ipfsHash,
        personId: memory.personId,
        creator: memory.creator,
        createdAt: new Date(Number(memory.createdAt) * 1000),
        exists: memory.exists
      }
    } catch (error) {
      console.error('Blockchain getMemory error:', error)
      throw new Error('思い出の取得に失敗しました')
    }
  }
}

export default new BlockchainService()
