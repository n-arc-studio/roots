import { create } from 'ipfs-http-client'

const ipfs = create({
  url: process.env.IPFS_URL || 'http://localhost:5001'
})

export class IPFSService {
  /**
   * Upload data to IPFS
   */
  async upload(data: any): Promise<string> {
    try {
      const jsonString = JSON.stringify(data)
      const result = await ipfs.add(jsonString)
      return result.path // Returns IPFS hash
    } catch (error) {
      console.error('IPFS upload error:', error)
      throw new Error('IPFSへのアップロードに失敗しました')
    }
  }

  /**
   * Upload file to IPFS
   */
  async uploadFile(fileBuffer: Buffer): Promise<string> {
    try {
      const result = await ipfs.add(fileBuffer)
      return result.path
    } catch (error) {
      console.error('IPFS file upload error:', error)
      throw new Error('ファイルのアップロードに失敗しました')
    }
  }

  /**
   * Retrieve data from IPFS
   */
  async retrieve(hash: string): Promise<any> {
    try {
      const chunks = []
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk)
      }
      const data = Buffer.concat(chunks).toString()
      return JSON.parse(data)
    } catch (error) {
      console.error('IPFS retrieve error:', error)
      throw new Error('IPFSからの取得に失敗しました')
    }
  }

  /**
   * Retrieve file from IPFS
   */
  async retrieveFile(hash: string): Promise<Buffer> {
    try {
      const chunks = []
      for await (const chunk of ipfs.cat(hash)) {
        chunks.push(chunk)
      }
      return Buffer.concat(chunks)
    } catch (error) {
      console.error('IPFS file retrieve error:', error)
      throw new Error('ファイルの取得に失敗しました')
    }
  }

  /**
   * Pin data to ensure persistence
   */
  async pin(hash: string): Promise<void> {
    try {
      await ipfs.pin.add(hash)
    } catch (error) {
      console.error('IPFS pin error:', error)
      throw new Error('IPFSのピン留めに失敗しました')
    }
  }

  /**
   * Get IPFS gateway URL for a hash
   */
  getGatewayUrl(hash: string): string {
    return `https://ipfs.io/ipfs/${hash}`
  }
}

export default new IPFSService()
