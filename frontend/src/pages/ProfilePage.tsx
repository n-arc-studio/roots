import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, Users, Heart, Edit } from 'lucide-react'

export default function ProfilePage() {
  const { id } = useParams()
  
  // Sample data
  const person = {
    id: id || '1',
    name: '佐藤 太郎',
    birthDate: '1935年3月15日',
    birthPlace: '東京都',
    biography: '戦後の困難な時代を生き抜き、家族のために尽力してきました。8人の孫と3人のひ孫に恵まれています。',
    occupation: '会社経営',
    spouse: '佐藤 花子',
    children: ['佐藤 次郎', '佐藤 三郎'],
    parents: ['佐藤 一郎', '佐藤 桜'],
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Link
          to="/tree"
          className="inline-flex items-center gap-2 text-roots-primary hover:underline mb-6"
        >
          <ArrowLeft size={20} />
          家系図に戻る
        </Link>

        {/* Profile Card */}
        <div className="card">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-roots-primary to-roots-secondary rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {person.name[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-roots-dark">{person.name}</h1>
                <p className="text-gray-600 mt-1">{person.occupation}</p>
              </div>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Edit size={18} />
              編集
            </button>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <Calendar className="text-roots-primary" size={20} />
              <div>
                <p className="text-sm text-gray-600">生年月日</p>
                <p className="font-semibold">{person.birthDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <MapPin className="text-roots-secondary" size={20} />
              <div>
                <p className="text-sm text-gray-600">出生地</p>
                <p className="font-semibold">{person.birthPlace}</p>
              </div>
            </div>
          </div>

          {/* Biography */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-roots-dark mb-3">経歴</h3>
            <p className="text-gray-700 leading-relaxed">{person.biography}</p>
          </div>

          {/* Family Relations */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-roots-dark">家族関係</h3>
            
            {person.spouse && (
              <div className="p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="text-pink-500" size={20} />
                  <h4 className="font-semibold">配偶者</h4>
                </div>
                <p className="text-gray-700">{person.spouse}</p>
              </div>
            )}

            {person.parents && person.parents.length > 0 && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-blue-500" size={20} />
                  <h4 className="font-semibold">両親</h4>
                </div>
                <div className="flex flex-col gap-1">
                  {person.parents.map((parent, idx) => (
                    <p key={idx} className="text-gray-700">{parent}</p>
                  ))}
                </div>
              </div>
            )}

            {person.children && person.children.length > 0 && (
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="text-green-500" size={20} />
                  <h4 className="font-semibold">子供</h4>
                </div>
                <div className="flex flex-col gap-1">
                  {person.children.map((child, idx) => (
                    <p key={idx} className="text-gray-700">{child}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Memories */}
        <div className="card mt-6">
          <h3 className="text-xl font-bold text-roots-dark mb-4">関連する思い出</h3>
          <p className="text-gray-500 text-center py-8">
            この人物に関連する思い出がまだありません
          </p>
        </div>
      </div>
    </div>
  )
}
