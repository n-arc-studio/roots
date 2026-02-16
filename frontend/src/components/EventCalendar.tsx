import { useState } from 'react'
import { Calendar, Plus, MapPin, Users, Clock, Bell } from 'lucide-react'
import { format, addDays } from 'date-fns'
import { ja } from 'date-fns/locale'

interface Event {
  id: string
  title: string
  date: Date
  type: 'birthday' | 'anniversary' | 'reunion' | 'memorial' | 'other'
  location?: string
  attendees?: string[]
  description?: string
  reminder?: boolean
}

const sampleEvents: Event[] = [
  {
    id: '1',
    title: '祖父の91歳の誕生日',
    date: addDays(new Date(), 30),
    type: 'birthday',
    location: '実家',
    attendees: ['家族全員'],
    reminder: true,
  },
  {
    id: '2',
    title: '両親の結婚記念日',
    date: addDays(new Date(), 60),
    type: 'anniversary',
    description: '結婚45周年',
    reminder: true,
  },
  {
    id: '3',
    title: '家族の集まり',
    date: addDays(new Date(), 7),
    type: 'reunion',
    location: 'レストラン',
    attendees: ['佐藤家', '田中家'],
  },
  {
    id: '4',
    title: '祖母の命日',
    date: addDays(new Date(), 90),
    type: 'memorial',
    reminder: true,
  },
]

export default function EventCalendar() {
  const [events] = useState<Event[]>(sampleEvents)
  const [showNewEvent, setShowNewEvent] = useState(false)

  const getEventColor = (type: string) => {
    switch (type) {
      case 'birthday':
        return 'bg-pink-100 border-pink-300 text-pink-700'
      case 'anniversary':
        return 'bg-purple-100 border-purple-300 text-purple-700'
      case 'reunion':
        return 'bg-blue-100 border-blue-300 text-blue-700'
      case 'memorial':
        return 'bg-gray-100 border-gray-300 text-gray-700'
      default:
        return 'bg-green-100 border-green-300 text-green-700'
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'birthday':
        return '🎂'
      case 'anniversary':
        return '💑'
      case 'reunion':
        return '👨‍👩‍👧‍👦'
      case 'memorial':
        return '🕯️'
      default:
        return '📅'
    }
  }

  const getEventLabel = (type: string) => {
    switch (type) {
      case 'birthday':
        return '誕生日'
      case 'anniversary':
        return '記念日'
      case 'reunion':
        return '家族の集まり'
      case 'memorial':
        return '命日'
      default:
        return 'その他'
    }
  }

  const sortedEvents = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-roots-dark mb-2">
              イベント・記念日カレンダー
            </h2>
            <p className="text-gray-600">
              家族の大切な日を記録し、思い出を作りましょう
            </p>
          </div>
          <button
            onClick={() => setShowNewEvent(!showNewEvent)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            新規追加
          </button>
        </div>

        {/* New Event Form */}
        {showNewEvent && (
          <div className="mb-6 p-4 border-2 border-roots-primary rounded-lg bg-blue-50">
            <h3 className="font-bold mb-4">新しいイベントを追加</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="イベント名"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
                />
                <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary">
                  <option value="birthday">誕生日</option>
                  <option value="anniversary">記念日</option>
                  <option value="reunion">家族の集まり</option>
                  <option value="memorial">命日</option>
                  <option value="other">その他</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="場所（任意）"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary"
              />
              <textarea
                placeholder="詳細（任意）"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-roots-primary resize-none"
                rows={2}
              />
              <div className="flex items-center gap-2">
                <input type="checkbox" id="reminder" className="w-4 h-4" />
                <label htmlFor="reminder" className="text-sm text-gray-700">
                  リマインダーを設定
                </label>
              </div>
              <div className="flex gap-3">
                <button className="btn-primary flex-1">保存</button>
                <button
                  onClick={() => setShowNewEvent(false)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  キャンセル
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Calendar className="text-roots-primary" size={24} />
            今後のイベント
          </h3>
          <div className="space-y-3">
            {sortedEvents.map((event) => (
              <div
                key={event.id}
                className={`p-4 rounded-lg border-2 ${getEventColor(event.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{getEventIcon(event.type)}</span>
                      <h4 className="font-bold text-lg">{event.title}</h4>
                      {event.reminder && (
                        <Bell size={16} className="text-orange-500" />
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{format(event.date, 'yyyy年MM月dd日 (E)', { locale: ja })}</span>
                        <span className="px-2 py-0.5 bg-white rounded-full text-xs font-semibold">
                          {Math.ceil((event.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}日後
                        </span>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center gap-2">
                          <Users size={16} />
                          <span>{event.attendees.join(', ')}</span>
                        </div>
                      )}
                      {event.description && (
                        <p className="mt-2 opacity-75">{event.description}</p>
                      )}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold">
                    {getEventLabel(event.type)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <div className="text-3xl font-bold text-roots-primary">
            {events.filter(e => e.type === 'birthday').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">誕生日</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-roots-secondary">
            {events.filter(e => e.type === 'anniversary').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">記念日</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-blue-500">
            {events.filter(e => e.type === 'reunion').length}
          </div>
          <div className="text-sm text-gray-600 mt-1">集まり</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-gray-500">
            {events.filter(e => e.reminder).length}
          </div>
          <div className="text-sm text-gray-600 mt-1">リマインダー</div>
        </div>
      </div>
    </div>
  )
}
