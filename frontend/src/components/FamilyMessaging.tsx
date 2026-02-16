import { useState, useRef, useEffect } from 'react'
import { Send, Smile, Paperclip, MoreVertical, Search } from 'lucide-react'

interface Message {
  id: string
  sender: string
  content: string
  timestamp: Date
  isOwn: boolean
  read: boolean
}

interface Chat {
  id: string
  name: string
  avatar: string
  lastMessage: string
  lastMessageTime: Date
  unread: number
  online: boolean
}

const sampleChats: Chat[] = [
  {
    id: '1',
    name: '佐藤家グループ',
    avatar: '👨‍👩‍👧‍👦',
    lastMessage: '来週の集まりの件ですが...',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
    unread: 3,
    online: true,
  },
  {
    id: '2',
    name: '父',
    avatar: '👨',
    lastMessage: '写真ありがとう',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: '母',
    avatar: '👩',
    lastMessage: 'レシピ送るね',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    unread: 1,
    online: true,
  },
]

const sampleMessages: Message[] = [
  {
    id: '1',
    sender: '父',
    content: 'みんな、来週の日曜日は空いてる？',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    isOwn: false,
    read: true,
  },
  {
    id: '2',
    sender: 'あなた',
    content: '大丈夫です！何かあるんですか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 50),
    isOwn: true,
    read: true,
  },
  {
    id: '3',
    sender: '母',
    content: '祖父の誕生日パーティーをやろうと思って',
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    isOwn: false,
    read: true,
  },
  {
    id: '4',
    sender: 'あなた',
    content: 'いいですね！場所はどこにしますか？',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isOwn: true,
    read: true,
  },
]

export default function FamilyMessaging() {
  const [chats] = useState<Chat[]>(sampleChats)
  const [selectedChat, setSelectedChat] = useState<Chat | null>(chats[0])
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: String(Date.now()),
      sender: 'あなた',
      content: newMessage,
      timestamp: new Date(),
      isOwn: true,
      read: false,
    }

    setMessages([...messages, message])
    setNewMessage('')
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) return 'たった今'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}分前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}時間前`
    return date.toLocaleDateString('ja-JP')
  }

  return (
    <div className="card p-0 h-[600px] flex overflow-hidden">
      {/* Chat List Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-roots-dark mb-3">メッセージ</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="検索..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-roots-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === chat.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-roots-primary to-roots-secondary rounded-full flex items-center justify-center text-2xl">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-semibold text-roots-dark truncate">{chat.name}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <span className="ml-2 px-2 py-0.5 bg-roots-primary text-white rounded-full text-xs font-semibold flex-shrink-0">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-roots-primary to-roots-secondary rounded-full flex items-center justify-center text-xl">
                  {selectedChat.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-roots-dark">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-500">
                    {selectedChat.online ? 'オンライン' : '最終ログイン: 2時間前'}
                  </p>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <MoreVertical size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-gray-50 to-blue-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-roots-primary text-white rounded-tr-sm'
                          : 'bg-white text-gray-800 rounded-tl-sm shadow'
                      }`}
                    >
                      {!message.isOwn && (
                        <p className="text-xs font-semibold mb-1 opacity-75">{message.sender}</p>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.isOwn ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-end gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
                  <Paperclip size={20} className="text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full flex-shrink-0">
                  <Smile size={20} className="text-gray-600" />
                </button>
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSend()
                    }
                  }}
                  placeholder="メッセージを入力..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-roots-primary"
                  rows={1}
                />
                <button
                  onClick={handleSend}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-roots-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
                >
                  <Send size={18} />
                  送信
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            チャットを選択してください
          </div>
        )}
      </div>
    </div>
  )
}
