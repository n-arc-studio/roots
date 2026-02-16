import { Link } from 'react-router-dom'
import { TreePine, BookOpen, Sparkles } from 'lucide-react'
import FamilyTree from '../components/FamilyTree'

console.log('HomePage.tsx is loading...')

export default function HomePage() {
  console.log('HomePage component is rendering...')
  
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-gradient-to-r from-roots-primary to-roots-secondary text-white py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <TreePine size={40} />
            Roots
          </h1>
          <p className="text-blue-100 mt-2">子孫へ送るSNS - 未来へつながる家族の物語</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-roots-primary to-roots-secondary bg-clip-text text-transparent mb-6">
            家族の記憶を未来へ
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            ブロックチェーンとAIの力で、あなたの家系図と思い出を永遠に保存。
            子孫たちへ、家族の歴史を紡ぎ続けましょう。
          </p>
        </div>
      </section>

      {/* Family Tree Section */}
      <section className="container mx-auto px-4 py-8">
        <FamilyTree />
      </section>

      {/* CTA Buttons */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-4 justify-center">
          <Link to="/tree" className="btn-primary">
            家系図を作成する
          </Link>
          <Link to="/timeline" className="btn-secondary">
            タイムラインを探る
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 mt-12">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12 text-roots-dark">
            主な機能
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center hover:shadow-xl transition-shadow">
              <TreePine className="w-16 h-16 mx-auto mb-4 text-roots-primary" />
              <h4 className="text-xl font-bold mb-3">インタラクティブ家系図</h4>
              <p className="text-gray-600">
                D3.jsを使用した美しい家系図で、家族のつながりを可視化します。
              </p>
            </div>
            <div className="card text-center hover:shadow-xl transition-shadow">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-roots-secondary" />
              <h4 className="text-xl font-bold mb-3">永続的な記録</h4>
              <p className="text-gray-600">
                IPFSとブロックチェーンで思い出を分散保存。データは永遠に残ります。
              </p>
            </div>
            <div className="card text-center hover:shadow-xl transition-shadow">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-roots-accent" />
              <h4 className="text-xl font-bold mb-3">AI支援</h4>
              <p className="text-gray-600">
                AIが家族史を要約し、質問に答え、思い出を整理します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-roots-dark to-gray-700 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="flex items-center justify-center gap-2">
            <TreePine size={20} />
            Roots - 家族の絆を未来へ繋ぐ
          </p>
          <p className="text-sm text-gray-400 mt-2">
            © 2026 Roots. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
