import { useState } from 'react'
import { Image as ImageIcon, Video, FileText, Download, Upload, Search, Grid, List } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface MediaItem {
  id: string
  type: 'image' | 'video' | 'document'
  title: string
  url: string
  thumbnail?: string
  uploadDate: Date
  uploader: string
  tags: string[]
  description?: string
  ipfsHash?: string
}

const sampleMedia: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    title: '家族写真 - 2026年新年',
    url: 'https://via.placeholder.com/400x300/4A90E2/ffffff?text=Family+2026',
    uploadDate: new Date('2026-01-01'),
    uploader: '佐藤 太郎',
    tags: ['家族', '新年', '2026'],
    description: '2026年の家族全員の集合写真',
    ipfsHash: 'Qm...',
  },
  {
    id: '2',
    type: 'image',
    title: '祖父の誕生日',
    url: 'https://via.placeholder.com/400x300/7B68EE/ffffff?text=Birthday',
    uploadDate: new Date('2026-02-10'),
    uploader: '佐藤 花子',
    tags: ['誕生日', '祖父', 'イベント'],
    ipfsHash: 'Qm...',
  },
  {
    id: '3',
    type: 'video',
    title: '結婚式のビデオ',
    url: 'https://www.example.com/video.mp4',
    thumbnail: 'https://via.placeholder.com/400x300/FFB347/ffffff?text=Wedding+Video',
    uploadDate: new Date('2025-06-15'),
    uploader: '佐藤 次郎',
    tags: ['結婚式', 'ビデオ', '2025'],
    ipfsHash: 'Qm...',
  },
  {
    id: '4',
    type: 'document',
    title: '家系図データ',
    url: 'https://www.example.com/family-tree.pdf',
    uploadDate: new Date('2025-01-10'),
    uploader: '佐藤 太郎',
    tags: ['家系図', 'ドキュメント'],
    ipfsHash: 'Qm...',
  },
]

export default function MediaArchive() {
  const [media, setMedia] = useState<MediaItem[]>(sampleMedia)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'image' | 'video' | 'document'>('all')

  const filteredMedia = media.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon size={40} className="text-roots-primary" />
      case 'video':
        return <Video size={40} className="text-roots-secondary" />
      case 'document':
        return <FileText size={40} className="text-roots-accent" />
      default:
        return <FileText size={40} className="text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-bold text-roots-dark mb-4">
          メディアアーカイブ
        </h2>
        <p className="text-gray-600 mb-6">
          家族の写真、動画、文書を永続的に保存・共有できます
        </p>

        {/* Upload Button */}
        <button className="btn-primary flex items-center gap-2 mb-6">
          <Upload size={20} />
          新しいファイルをアップロード
        </button>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="タイトルやタグで検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
            >
              <option value="all">すべて</option>
              <option value="image">画像</option>
              <option value="video">動画</option>
              <option value="document">ドキュメント</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            </button>
          </div>
        </div>

        {/* Media Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMedia.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  ) : item.type === 'video' && item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    getIcon(item.type)
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-roots-dark mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">
                    {format(item.uploadDate, 'yyyy/MM/dd', { locale: ja })} - {item.uploader}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-roots-primary hover:underline text-sm">
                    <Download size={16} />
                    ダウンロード
                  </button>
                  {item.ipfsHash && (
                    <p className="text-xs text-gray-400 mt-2">
                      IPFS: {item.ipfsHash}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMedia.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded flex items-center justify-center flex-shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-roots-dark truncate">{item.title}</h4>
                  <p className="text-sm text-gray-500">
                    {format(item.uploadDate, 'yyyy/MM/dd', { locale: ja })} - {item.uploader}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="btn-primary flex items-center gap-2 flex-shrink-0">
                  <Download size={16} />
                  ダウンロード
                </button>
              </div>
            ))}
          </div>
        )}

        {filteredMedia.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>メディアが見つかりません</p>
          </div>
        )}
      </div>

      {/* IPFS Info */}
      <div className="card bg-blue-50 border-2 border-blue-200">
        <h3 className="font-bold text-roots-dark mb-2">🔗 ブロックチェーン保存</h3>
        <p className="text-sm text-gray-700">
          すべてのメディアはIPFSに保存され、ブロックチェーンでハッシュが記録されます。
          データは分散保存されるため、永続的にアクセス可能です。
        </p>
      </div>
    </div>
  )
}
