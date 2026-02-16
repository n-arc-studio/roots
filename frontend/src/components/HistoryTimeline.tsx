import { useState } from 'react'
import { Clock, ChevronDown, ChevronUp, MapPin, Users } from 'lucide-react'

interface TimelineEvent {
  id: string
  year: number
  month?: number
  day?: number
  title: string
  description: string
  category: 'birth' | 'marriage' | 'death' | 'achievement' | 'migration' | 'other'
  personIds: string[]
  location?: string
  images?: string[]
}

const sampleTimeline: TimelineEvent[] = [
  {
    id: '1',
    year: 1935,
    month: 3,
    day: 15,
    title: '佐藤家の始まり',
    description: '曾祖父・佐藤一郎が東京で生まれる',
    category: 'birth',
    personIds: ['1'],
    location: '東京都',
  },
  {
    id: '2',
    year: 1960,
    month: 6,
    day: 20,
    title: '祖父母の結婚',
    description: '佐藤太郎と佐藤花子が結婚',
    category: 'marriage',
    personIds: ['2', '3'],
    location: '横浜市',
  },
  {
    id: '3',
    year: 1965,
    month: 5,
    day: 15,
    title: '父の誕生',
    description: '佐藤次郎が誕生',
    category: 'birth',
    personIds: ['4'],
    location: '横浜市',
  },
  {
    id: '4',
    year: 1980,
    title: '家業の成功',
    description: '祖父が経営する会社が大きく成長',
    category: 'achievement',
    personIds: ['2'],
  },
  {
    id: '5',
    year: 1995,
    month: 8,
    day: 20,
    title: 'あなたの誕生',
    description: '佐藤家の新しい世代が誕生',
    category: 'birth',
    personIds: ['5'],
    location: '東京都',
  },
  {
    id: '6',
    year: 2010,
    title: '家族の移住',
    description: '仕事の都合で大阪へ移住',
    category: 'migration',
    personIds: ['4', '5'],
    location: '大阪府',
  },
  {
    id: '7',
    year: 2020,
    month: 12,
    day: 5,
    title: '祖母の永眠',
    description: '佐藤花子が88歳で永眠',
    category: 'death',
    personIds: ['3'],
  },
]

export default function HistoryTimeline() {
  const [timeline] = useState<TimelineEvent[]>(sampleTimeline)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['1', '5']))
  const [filterCategory, setFilterCategory] = useState<string>('all')

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'birth':
        return 'bg-blue-500'
      case 'marriage':
        return 'bg-pink-500'
      case 'death':
        return 'bg-gray-500'
      case 'achievement':
        return 'bg-yellow-500'
      case 'migration':
        return 'bg-purple-500'
      default:
        return 'bg-green-500'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'birth':
        return '👶'
      case 'marriage':
        return '💑'
      case 'death':
        return '🕯️'
      case 'achievement':
        return '🏆'
      case 'migration':
        return '🏠'
      default:
        return '📌'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'birth':
        return '誕生'
      case 'marriage':
        return '結婚'
      case 'death':
        return '永眠'
      case 'achievement':
        return '功績'
      case 'migration':
        return '移住'
      default:
        return 'その他'
    }
  }

  const formatDate = (event: TimelineEvent) => {
    if (event.month && event.day) {
      return `${event.year}年${event.month}月${event.day}日`
    }
    if (event.month) {
      return `${event.year}年${event.month}月`
    }
    return `${event.year}年`
  }

  const filteredTimeline = timeline.filter(
    event => filterCategory === 'all' || event.category === filterCategory
  )

  const sortedTimeline = [...filteredTimeline].sort((a, b) => b.year - a.year)

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-roots-dark mb-2">
              家族の歴史年表
            </h2>
            <p className="text-gray-600">
              代々受け継がれる家族の物語
            </p>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
          >
            <option value="all">すべて</option>
            <option value="birth">誕生</option>
            <option value="marriage">結婚</option>
            <option value="achievement">功績</option>
            <option value="migration">移住</option>
            <option value="death">永眠</option>
            <option value="other">その他</option>
          </select>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-roots-primary via-roots-secondary to-roots-accent"></div>

          <div className="space-y-8">
            {sortedTimeline.map((event) => (
              <div key={event.id} className="relative pl-20">
                {/* Timeline Dot */}
                <div className={`absolute left-5 top-2 w-6 h-6 ${getCategoryColor(event.category)} rounded-full border-4 border-white shadow-md flex items-center justify-center text-xs`}>
                  {getCategoryIcon(event.category)}
                </div>

                {/* Event Card */}
                <div className="bg-white border-2 border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow">
                  <div
                    onClick={() => toggleExpand(event.id)}
                    className="p-4 cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 ${getCategoryColor(event.category)} text-white text-xs rounded-full font-semibold`}>
                            {getCategoryLabel(event.category)}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock size={14} />
                            {formatDate(event)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-roots-dark">{event.title}</h3>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        {expandedIds.has(event.id) ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>

                    {expandedIds.has(event.id) && (
                      <div className="mt-4 space-y-3 border-t border-gray-100 pt-4">
                        <p className="text-gray-700">{event.description}</p>
                        
                        {event.location && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={16} className="text-roots-primary" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        {event.personIds.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Users size={16} className="text-roots-secondary" />
                            <span>{event.personIds.length}人が関連</span>
                          </div>
                        )}

                        {event.images && event.images.length > 0 && (
                          <div className="grid grid-cols-2 gap-2 mt-3">
                            {event.images.map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt={`${event.title} ${idx + 1}`}
                                className="w-full h-32 object-cover rounded"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="text-2xl font-bold text-roots-dark">
            {Math.max(...timeline.map(e => e.year)) - Math.min(...timeline.map(e => e.year))}
          </div>
          <div className="text-sm text-gray-600">年の歴史</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">🗂️</div>
          <div className="text-2xl font-bold text-roots-dark">{timeline.length}</div>
          <div className="text-sm text-gray-600">記録された出来事</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl mb-2">🌍</div>
          <div className="text-2xl font-bold text-roots-dark">
            {new Set(timeline.map(e => e.location).filter(Boolean)).size}
          </div>
          <div className="text-sm text-gray-600">拠点</div>
        </div>
      </div>
    </div>
  )
}
