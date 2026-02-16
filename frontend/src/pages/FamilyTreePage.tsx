import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Home, MessageCircle, Calendar, Image, Clock } from 'lucide-react'
import FamilyTree from '../components/FamilyTree'
import FamilyMessaging from '../components/FamilyMessaging'
import MediaArchive from '../components/MediaArchive'
import EventCalendar from '../components/EventCalendar'
import HistoryTimeline from '../components/HistoryTimeline'

type Tab = 'tree' | 'messaging' | 'media' | 'events' | 'history'

export default function FamilyTreePage() {
  const [activeTab, setActiveTab] = useState<Tab>('tree')
  const [editMode, setEditMode] = useState(false)

  const handleAddPerson = (parentId: string) => {
    console.log('Add person to:', parentId)
    // TODO: Implement add person logic
  }

  const handleEditPerson = (personId: string) => {
    console.log('Edit person:', personId)
    // TODO: Implement edit person logic
  }

  const handleDeletePerson = (personId: string) => {
    console.log('Delete person:', personId)
    // TODO: Implement delete person logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-roots-primary hover:opacity-80">
              <Home size={24} />
              <span className="font-bold text-lg">Roots</span>
            </Link>
            <h1 className="text-2xl font-bold text-roots-dark">家族のダッシュボード</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 ${
                activeTab === 'tree'
                  ? 'border-roots-primary text-roots-primary'
                  : 'border-transparent text-gray-600 hover:text-roots-primary'
              }`}
            >
              🌳 家系図
            </button>
            <button
              onClick={() => setActiveTab('messaging')}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'messaging'
                  ? 'border-roots-primary text-roots-primary'
                  : 'border-transparent text-gray-600 hover:text-roots-primary'
              }`}
            >
              <MessageCircle size={20} />
              メッセージ
            </button>
            <button
              onClick={() => setActiveTab('media')}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'media'
                  ? 'border-roots-primary text-roots-primary'
                  : 'border-transparent text-gray-600 hover:text-roots-primary'
              }`}
            >
              <Image size={20} />
              アーカイブ
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'border-roots-primary text-roots-primary'
                  : 'border-transparent text-gray-600 hover:text-roots-primary'
              }`}
            >
              <Calendar size={20} />
              イベント
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-4 font-semibold transition-colors border-b-2 flex items-center gap-2 ${
                activeTab === 'history'
                  ? 'border-roots-primary text-roots-primary'
                  : 'border-transparent text-gray-600 hover:text-roots-primary'
              }`}
            >
              <Clock size={20} />
              歴史年表
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'tree' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-roots-dark">家系図</h2>
              <button
                onClick={() => setEditMode(!editMode)}
                className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                  editMode
                    ? 'bg-gray-500 text-white hover:bg-gray-600'
                    : 'bg-roots-primary text-white hover:opacity-90'
                }`}
              >
                {editMode ? '表示モード' : '編集モード'}
              </button>
            </div>
            <FamilyTree
              editable={editMode}
              onAddPerson={handleAddPerson}
              onEditPerson={handleEditPerson}
              onDeletePerson={handleDeletePerson}
            />
          </div>
        )}

        {activeTab === 'messaging' && <FamilyMessaging />}

        {activeTab === 'media' && <MediaArchive />}

        {activeTab === 'events' && <EventCalendar />}

        {activeTab === 'history' && <HistoryTimeline />}
      </div>
    </div>
  )
}
