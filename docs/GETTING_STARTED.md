# Getting Started with Roots

このガイドでは、Rootsプロジェクトをローカル環境でセットアップし、開発を始めるための手順を説明します。

## 📋 前提条件

以下のソフトウェアがインストールされている必要があります：

- **Node.js**: v20 以上
- **npm**: v9 以上
- **Git**: 最新版
- **PostgreSQL**: v15 以上（Dockerを使用しない場合）
- **Redis**: v7 以上（Dockerを使用しない場合）
- **Docker & Docker Compose**: 最新版（オプション、推奨）

### 追加のアカウント

以下のサービスのアカウントとAPIキーが必要です：

1. **OpenAI**: [https://platform.openai.com/](https://platform.openai.com/)
   - GPT-4 APIアクセス
   
2. **Alchemy** または **Infura**: Ethereum RPCプロバイダー
   - [https://www.alchemy.com/](https://www.alchemy.com/)
   - [https://www.infura.io/](https://www.infura.io/)

3. **MetaMask** または他のWeb3ウォレット（開発・テスト用）

## 🚀 クイックスタート

### 1. リポジトリのクローン

\`\`\`bash
git clone https://github.com/yourusername/roots.git
cd roots
\`\`\`

### 2. 依存関係のインストール

\`\`\`bash
# ルートディレクトリでワークスペース全体の依存関係をインストール
npm install
\`\`\`

### 3. 環境変数の設定

\`\`\`bash
# .env.example をコピーして .env を作成
cp .env.example .env
\`\`\`

`.env` ファイルを編集し、以下の値を設定します：

\`\`\`env
# データベース（Dockerを使用する場合はそのまま）
DATABASE_URL=postgres://roots_user:roots_password@localhost:5433/roots

# Redis（Dockerを使用する場合はそのまま）
REDIS_URL=redis://localhost:6379

# IPFS（Dockerを使用する場合はそのまま）
IPFS_URL=http://localhost:5001

# ブロックチェーン（テストネット）
ETHEREUM_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=your_test_wallet_private_key_here

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key-here

# JWT秘密鍵（ランダムな文字列を生成）
JWT_SECRET=your-super-secret-jwt-key-change-this

# アプリケーション設定
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
\`\`\`

### 4. データベースとサービスの起動

#### オプション A: Docker を使用（推奨）

\`\`\`bash
# PostgreSQL, Redis, IPFS を起動
docker-compose up -d postgres redis ipfs

# ログを確認
docker-compose logs -f
\`\`\`

#### オプション B: ローカルインストール

PostgreSQL と Redis をローカルにインストールし、起動します。

**PostgreSQL**
\`\`\`bash
# データベースを作成
createdb roots
\`\`\`

**IPFS**
\`\`\`bash
# IPFS をインストール（macOS）
brew install ipfs

# 初期化
ipfs init

# デーモンを起動
ipfs daemon
\`\`\`

### 5. ブロックチェーン環境のセットアップ

\`\`\`bash
# ブロックチェーンディレクトリに移動
cd blockchain

# ローカルHardhatノードを起動（新しいターミナル）
npm run node
\`\`\`

別のターミナルで：

\`\`\`bash
# スマートコントラクトをコンパイル
npm run compile

# ローカルネットワークにデプロイ
npm run deploy:local
\`\`\`

デプロイ後、コントラクトアドレスが表示されます：

\`\`\`
RootsRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
\`\`\`

このアドレスを `.env` ファイルに追加：

\`\`\`env
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
\`\`\`

### 6. 開発サーバーの起動

ルートディレクトリに戻ります：

\`\`\`bash
cd ..

# フロントエンドとバックエンドを同時に起動
npm run dev
\`\`\`

以下のサービスが起動します：

- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:3000
- **バックエンドヘルスチェック**: http://localhost:3000/health

## 🔧 個別コンポーネントの起動

### フロントエンドのみ

\`\`\`bash
npm run dev:frontend
# または
cd frontend
npm run dev
\`\`\`

### バックエンドのみ

\`\`\`bash
npm run dev:backend
# または
cd backend
npm run dev
\`\`\`

## 🧪 テスト

### すべてのテストを実行

\`\`\`bash
npm run test
\`\`\`

### フロントエンドのテスト

\`\`\`bash
cd frontend
npm run test
\`\`\`

### バックエンドのテスト

\`\`\`bash
cd backend
npm run test
\`\`\`

### スマートコントラクトのテスト

\`\`\`bash
cd blockchain
npm run test
\`\`\`

## 📦 ビルド

### プロダクションビルド

\`\`\`bash
# すべてのワークスペースをビルド
npm run build
\`\`\`

### 個別ビルド

\`\`\`bash
# フロントエンド
cd frontend
npm run build

# バックエンド
cd backend
npm run build
\`\`\`

## 🐛 トラブルシューティング

### ポートが既に使用されている

\`\`\`bash
# ポート3000を使用しているプロセスを確認
lsof -i :3000

# プロセスを終了
kill -9 <PID>
\`\`\`

### データベース接続エラー

1. PostgreSQLが起動しているか確認
2. `.env` の `DATABASE_URL` が正しいか確認
3. データベースが存在するか確認

\`\`\`bash
psql -U roots_user -d roots
\`\`\`

### IPFS接続エラー

\`\`\`bash
# IPFSデーモンが起動しているか確認
ipfs id

# デーモンを再起動
ipfs daemon
\`\`\`

### スマートコントラクトのデプロイエラー

1. Hardhatノードが起動しているか確認
2. `.env` の `PRIVATE_KEY` が設定されているか確認
3. 十分なETH（テストネット）があるか確認

## 📚 次のステップ

- [アーキテクチャドキュメント](./ARCHITECTURE.md)を読む
- [API仕様](./API.md)を確認する
- サンプルデータを作成して機能をテストする
- 新機能の開発を始める

## 🆘 ヘルプ

問題が解決しない場合：

1. [GitHub Issues](https://github.com/yourusername/roots/issues)を確認
2. 新しいIssueを作成
3. コミュニティに質問

Happy coding! 🌳
