import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-roots-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">ページが見つかりません</p>
        <Link to="/" className="btn-primary">
          ホームに戻る
        </Link>
      </div>
    </div>
  )
}
