# 🌳 Roots - 子孫へ送るSNS

家系図と家族の歴史を未来へ紡ぐプラットフォーム

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18.2-blue)
![Node.js](https://img.shields.io/badge/Node.js-20+-green)

## 📖 概要

**Roots**は、ブロックチェーンとAI技術を活用して家族の記憶を永続的に保存するSNSプラットフォームです。

### 🎯 主な特徴

- **🌿 インタラクティブ家系図**: D3.jsによる美しい可視化
- **🔗 永続的保存**: IPFS + ブロックチェーンで分散保存
- **🤖 AI支援**: 家族史の要約、質問応答、思い出の整理
- **🔐 セキュア**: Web3認証とスマートコントラクト
- **📱 レスポンシブ**: モバイルからデスクトップまで対応

## 🏗️ 技術スタック

### フロントエンド
- **React** 18.2 + **TypeScript**
- **Vite** - 高速ビルドツール
- **Tailwind CSS** - ユーティリティファーストCSS
- **D3.js** - データ可視化
- **Ethers.js** - ブロックチェーン接続
- **React Router** - ルーティング
- **Zustand** - 状態管理

### バックエンド
- **Node.js** + **Express** + **TypeScript**
- **PostgreSQL** - メインデータベース
- **Redis** - キャッシュ
- **JWT** - 認証

### ブロックチェーン
- **Hardhat** - 開発フレームワーク
- **Solidity** 0.8.20
- **Polygon/Mumbai** - デプロイ先
- **IPFS** - 分散ストレージ

### AI
- **OpenAI GPT-4** - 自然言語処理
- カスタムプロンプトによる家族史分析

## 📁 プロジェクト構造

```
roots/
├── frontend/              # React フロントエンド
│   ├── src/
│   │   ├── components/   # 再利用可能なコンポーネント
│   │   ├── pages/        # ページコンポーネント
│   │   ├── services/     # API クライアント
│   │   ├── hooks/        # カスタムフック
│   │   ├── types/        # TypeScript 型定義
│   │   └── styles/       # スタイル
│   └── package.json
│
├── backend/              # Node.js バックエンド
│   ├── src/
│   │   ├── routes/       # API ルート
│   │   ├── controllers/  # コントローラー
│   │   ├── services/     # ビジネスロジック
│   │   ├── models/       # データモデル
│   │   ├── middleware/   # ミドルウェア
│   │   └── utils/        # ユーティリティ
│   └── package.json
│
├── blockchain/           # スマートコントラクト
│   ├── contracts/        # Solidity コントラクト
│   ├── scripts/          # デプロイスクリプト
│   └── test/             # テスト
│
├── docs/                 # ドキュメント
├── docker-compose.yml    # Docker 設定
└── package.json          # ルート package.json
```

## 🚀 セットアップ

### 前提条件

- Node.js 20+
- PostgreSQL 15+
- Redis 7+
- Docker & Docker Compose (オプション)

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/yourusername/roots.git
cd roots
\`\`\`

### 2. 依存関係のインストール

\`\`\`bash
# すべてのワークスペースの依存関係をインストール
npm install
\`\`\`

### 3. 環境変数の設定

\`\`\`bash
# .env.example をコピー
cp .env.example .env

# .env を編集して必要な値を設定
# - DATABASE_URL
# - REDIS_URL
# - OPENAI_API_KEY
# - ETHEREUM_RPC_URL (Alchemy, Infuraなど)
# - PRIVATE_KEY (デプロイ用)
# - JWT_SECRET
\`\`\`

### 4. データベースのセットアップ

#### オプション A: Docker を使用

\`\`\`bash
# PostgreSQL, Redis, IPFS を起動
docker-compose up -d postgres redis ipfs
\`\`\`

#### オプション B: ローカルインストール

PostgreSQL と Redis をローカルにインストールし、.env で接続情報を設定します。

### 5. ブロックチェーンのセットアップ

\`\`\`bash
# ブロックチェーンディレクトリに移動
cd blockchain

# 依存関係をインストール
npm install

# コントラクトをコンパイル
npm run compile

# ローカルノードを起動（別ターミナル）
npm run node

# コントラクトをデプロイ
npm run deploy:local

# デプロイされたコントラクトアドレスを .env に設定
# CONTRACT_ADDRESS=0x...
\`\`\`

### 6. 開発サーバーの起動

\`\`\`bash
# ルートディレクトリに戻る
cd ..

# フロントエンドとバックエンドを同時に起動
npm run dev
\`\`\`

- フロントエンド: http://localhost:5173
- バックエンド: http://localhost:3000

## 🔧 開発コマンド

\`\`\`bash
# すべてのワークスペースで開発サーバーを起動
npm run dev

# フロントエンドのみ
npm run dev:frontend

# バックエンドのみ
npm run dev:backend

# ビルド
npm run build

# リント
npm run lint

# テスト
npm run test
\`\`\`

## 🐳 Docker での起動

\`\`\`bash
# すべてのサービスを起動
docker-compose up

# バックグラウンドで起動
docker-compose up -d

# ログを確認
docker-compose logs -f

# 停止
docker-compose down
\`\`\`

## 📚 API エンドポイント

### 認証
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン
- `GET /api/auth/verify` - トークン検証

### 人物
- `GET /api/persons` - すべての人物を取得
- `GET /api/persons/:id` - 特定の人物を取得
- `POST /api/persons` - 新しい人物を作成
- `PUT /api/persons/:id` - 人物情報を更新
- `DELETE /api/persons/:id` - 人物を削除

### 思い出
- `GET /api/memories` - すべての思い出を取得
- `GET /api/memories/person/:personId` - 特定の人物の思い出を取得
- `POST /api/memories` - 新しい思い出を作成
- `PUT /api/memories/:id` - 思い出を更新
- `DELETE /api/memories/:id` - 思い出を削除

### AI
- `POST /api/ai/ask` - AIに質問
- `POST /api/ai/summarize` - 家族史を要約
- `POST /api/ai/organize` - 思い出を整理

## 🧪 テスト

Rootsプロジェクトには包括的なユニットテストが含まれています。

### バックエンドテスト (Jest)

```bash
cd backend

# すべてのテストを実行
npm test

# ウォッチモードで実行
npm run test:watch

# カバレッジレポートを生成
npm run test:coverage
```

### フロントエンドテスト (Vitest)

```bash
cd frontend

# すべてのテストを実行
npm test

# UIモードで実行
npm run test:ui

# カバレッジレポートを生成
npm run test:coverage
```

### テスト内容

- **バックエンド**:
  - JWT生成・検証テスト
  - バリデーション関数テスト
  - 認証APIエンドポイントテスト
  
- **フロントエンド**:
  - 認証コンポーネントテスト
  - ルート保護テスト
  - 状態管理(Zustand)テスト

詳細は [docs/TESTING.md](docs/TESTING.md) を参照してください。

## 🎨 デザインシステム

### カラーパレット

- **Primary**: `#2C5F2D` - 深い緑（家系樹のイメージ）
- **Secondary**: `#97BC62` - 若葉の緑
- **Accent**: `#D4A373` - 古びた紙のベージュ
- **Dark**: `#1A1A1A` - ダークテキスト
- **Light**: `#F5F5DC` - ベージュ背景

### タイポグラフィ

- **見出し**: Georgia, serif
- **本文**: Noto Sans JP, sans-serif

## 🔐 セキュリティ

- JWT ベースの認証
- パスワードは bcrypt でハッシュ化
- Helmet.js によるHTTPヘッダー保護
- Rate limiting
- CORS 設定
- 環境変数による機密情報の管理

## 🌐 デプロイ

### フロントエンド (Vercel/Netlify)

\`\`\`bash
cd frontend
npm run build
# dist/ フォルダをデプロイ
\`\`\`

### バックエンド (Railway/Render)

\`\`\`bash
cd backend
npm run build
npm start
\`\`\`

### ブロックチェーン (Polygon Mumbai)

\`\`\`bash
cd blockchain
npm run deploy:mumbai
\`\`\`

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。詳細は [LICENSE](LICENSE) を参照してください。

## 📧 お問い合わせ

プロジェクトリンク: [https://github.com/yourusername/roots](https://github.com/yourusername/roots)

## 🙏 謝辞

- [React](https://reactjs.org/)
- [OpenAI](https://openai.com/)
- [IPFS](https://ipfs.io/)
- [Hardhat](https://hardhat.org/)
- [D3.js](https://d3js.org/)

---

**Roots** で、あなたの家族の物語を未来へ繋ぎましょう 🌳
