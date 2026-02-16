import { useState } from 'react'
import { Heart, MessageCircle, Share2, Image, Video, Calendar, MapPin, Plus } from 'lucide-react'
import { format } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Post {
  id: string
  author: string
  authorImage?: string
  date: Date
  content: string
  images?: string[]
  video?: string
  location?: string
  event?: string
  likes: number
  comments: number
  tags: string[]
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: '佐藤 太郎',
    date: new Date('2026-02-10'),
    content: '祖父の90歳の誕生日を家族みんなで祝いました。戦後の困難な時代を生き抜き、8人の孫に恵まれた素晴らしい人生です。',
    images: ['https://via.placeholder.com/600x400/4A90E2/ffffff?text=Family+Photo'],
    event: '90歳の誕生日',
    likes: 24,
    comments: 8,
    tags: ['誕生日', '家族の集まり', '祖父'],
  },
  {
    id: '2',
    author: '佐藤 花子',
    date: new Date('2026-01-25'),
    content: '母から受け継いだレシピで、おばあちゃんの味を再現してみました。家族の味は代々受け継がれていくものですね。',
    images: ['https://via.placeholder.com/600x400/7B68EE/ffffff?text=Recipe'],
    tags: ['料理', '伝統', '家族のレシピ'],
    likes: 18,
    comments: 5,
  },
  {
    id: '3',
    author: '佐藤 次郎',
    date: new Date('2025-12-31'),
    content: '今年も無事に家族全員で新年を迎えられそうです。来年も健康で過ごせますように。',
    event: '年越し',
    likes: 32,
    comments: 12,
    tags: ['年末', '新年', '家族'],
  },
]

export default function TimelinePage() {
  const [posts, setPosts] = useState<Post[]>(samplePosts)
  const [showNewPost, setShowNewPost] = useState(false)
  const [newPostContent, setNewPostContent] = useState('')

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const handleAddPost = () => {
    if (!newPostContent.trim()) return

    const newPost: Post = {
      id: String(Date.now()),
      author: 'あなた',
      date: new Date(),
      content: newPostContent,
      likes: 0,
      comments: 0,
      tags: [],
    }

    setPosts([newPost, ...posts])
    setNewPostContent('')
    setShowNewPost(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-roots-dark mb-2">
            家族のタイムライン
          </h1>
          <p className="text-gray-600">
            家族の思い出や出来事を共有し、未来へ残しましょう
          </p>
        </div>

        {/* New Post Button */}
        <div className="mb-6">
          {!showNewPost ? (
            <button
              onClick={() => setShowNewPost(true)}
              className="w-full card flex items-center justify-center gap-2 py-4 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <Plus size={24} className="text-roots-primary" />
              <span className="text-lg font-semibold text-roots-dark">
                新しい投稿を作成
              </span>
            </button>
          ) : (
            <div className="card">
              <h3 className="text-xl font-bold mb-4">新しい投稿</h3>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="家族の思い出や出来事を共有しましょう..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-roots-primary"
                rows={4}
              />
              <div className="flex gap-4 mt-4">
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Image size={20} />
                  写真
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Video size={20} />
                  動画
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <Calendar size={20} />
                  イベント
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                  <MapPin size={20} />
                  場所
                </button>
              </div>
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  キャンセル
                </button>
                <button
                  onClick={handleAddPost}
                  className="btn-primary"
                >
                  投稿する
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="card hover:shadow-xl transition-shadow">
              {/* Post Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-roots-primary to-roots-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {post.author[0]}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-roots-dark">{post.author}</h4>
                  <p className="text-sm text-gray-500">
                    {format(post.date, 'yyyy年MM月dd日', { locale: ja })}
                  </p>
                </div>
              </div>

              {/* Event Badge */}
              {post.event && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-roots-accent bg-opacity-20 text-roots-accent rounded-full mb-3">
                  <Calendar size={16} />
                  <span className="font-semibold">{post.event}</span>
                </div>
              )}

              {/* Post Content */}
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-4 rounded-lg overflow-hidden">
                  {post.images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`投稿画像 ${idx + 1}`}
                      className="w-full object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  <Heart size={20} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-roots-primary transition-colors">
                  <MessageCircle size={20} />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-roots-secondary transition-colors">
                  <Share2 size={20} />
                  <span>共有</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

