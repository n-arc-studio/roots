# Docker セットアップガイド

## 🐳 Docker環境での起動方法

Rootsプロジェクト全体（バックエンド、フロントエンド、データベース）をDockerコンテナで実行できます。

---

## 📦 必要なもの

- Docker Desktop (Windows/Mac) または Docker Engine + Docker Compose (Linux)
- Docker Compose v2.0以上

確認方法:
```bash
docker --version
docker compose version
```

---

## 🚀 開発環境での起動

### 1. 環境変数の設定

ルートディレクトリに `.env` ファイルを作成:

```bash
# .env.example をコピー
cp .env.example .env
```

`.env` を編集:
```env
# Database (Docker Compose内ではサービス名でアクセス)
DB_HOST=postgres
DB_PORT=5432
DB_USER=roots_user
DB_PASSWORD=roots_password
DB_NAME=roots_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d

# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 2. Dockerコンテナを起動

```bash
# すべてのサービスをビルド & 起動
docker compose up --build

# バックグラウンドで起動
docker compose up -d

# ログを確認
docker compose logs -f

# 特定のサービスのログを確認
docker compose logs -f backend
docker compose logs -f frontend
```

### 3. アクセス

- **フロントエンド**: http://localhost:5173
- **バックエンドAPI**: http://localhost:3000
- **PostgreSQL**: localhost:5433 (コンテナ内部は5432)
- **Redis**: localhost:6379
- **IPFS Gateway**: http://localhost:8080
- **IPFS API**: http://localhost:5001

### 4. データベーススキーマの初期化

初回起動時、データベーススキーマは自動的に実行されます（`schema.sql` がマウントされています）。

手動で実行する場合:
```bash
docker compose exec postgres psql -U roots_user -d roots_db -f /docker-entrypoint-initdb.d/schema.sql
```

### 5. コンテナの停止・削除

```bash
# 停止
docker compose stop

# 停止 & 削除
docker compose down

# ボリュームも含めて削除（データベースデータも削除される）
docker compose down -v
```

---

## 🏭 本番環境でのデプロイ

### 1. 本番用環境変数の設定

`.env.prod` ファイルを作成:

```env
# Database
DB_USER=roots_user
DB_PASSWORD=STRONG_PASSWORD_HERE
DB_NAME=roots_db

# JWT
JWT_SECRET=SUPER_SECRET_KEY_GENERATE_WITH_openssl_rand_base64_32
JWT_EXPIRES_IN=7d

# Application
FRONTEND_URL=https://yourdomain.com
VITE_API_URL=https://api.yourdomain.com

# API Keys
OPENAI_API_KEY=sk-...
ETHEREUM_RPC_URL=https://polygon-mainnet.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=0x...

# Ports
BACKEND_PORT=3000
FRONTEND_PORT=80
```

### 2. 本番環境で起動

```bash
# 本番用docker-composeでビルド & 起動
docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

# ログ確認
docker compose -f docker-compose.prod.yml logs -f
```

### 3. HTTPS設定（Nginx）

SSL証明書を取得（Let's Encrypt推奨）:

```bash
# Certbotで証明書取得
docker run -it --rm -v /path/to/ssl:/etc/letsencrypt certbot/certbot certonly --standalone -d yourdomain.com
```

---

## 🛠️ 便利なコマンド

### コンテナ状態の確認

```bash
# 起動中のコンテナ一覧
docker compose ps

# リソース使用状況
docker stats
```

### データベース操作

```bash
# PostgreSQLに接続
docker compose exec postgres psql -U roots_user -d roots_db

# データベースバックアップ
docker compose exec postgres pg_dump -U roots_user roots_db > backup.sql

# データベースリストア
docker compose exec -T postgres psql -U roots_user -d roots_db < backup.sql
```

### コンテナ内でコマンド実行

```bash
# バックエンドコンテナでシェル起動
docker compose exec backend sh

# npm パッケージをインストール
docker compose exec backend npm install <package-name>

# マイグレーション実行
docker compose exec backend npm run migrate
```

### ビルドキャッシュのクリア

```bash
# イメージを再ビルド（キャッシュなし）
docker compose build --no-cache

# 未使用のDockerリソースをすべて削除
docker system prune -a
```

---

## 📊 Docker Composeサービス構成

### 開発環境 (docker-compose.yml)

| サービス | ポート | 説明 |
|---------|--------|------|
| postgres | 5433 | PostgreSQL データベース |
| redis | 6379 | Redisキャッシュ |
| ipfs | 4001, 5001, 8080 | IPFS分散ストレージ |
| backend | 3000 | Node.js Express API (ホットリロード) |
| frontend | 5173 | Vite開発サーバー (ホットリロード) |

### 本番環境 (docker-compose.prod.yml)

| サービス | ポート | 説明 |
|---------|--------|------|
| postgres | - | PostgreSQL (内部のみ) |
| redis | - | Redis (内部のみ) |
| ipfs | - | IPFS (内部のみ) |
| backend | 3000 | Node.js Express API (本番ビルド) |
| frontend | 80 | Nginx静的ファイルサーバー |
| nginx | 80, 443 | リバースプロキシ & SSL |

---

## 🔧 トラブルシューティング

### ポートがすでに使用されている

```bash
# ポートを使用しているプロセスを確認 (Windows)
netstat -ano | findstr :5433

# プロセスを終了
taskkill /PID <PID> /F
```

### データベース接続エラー

```bash
# PostgreSQLコンテナが正常に起動しているか確認
docker compose logs postgres

# ヘルスチェック状態を確認
docker compose ps
```

### ホットリロードが動作しない

Windows/Mac での Docker Desktop を使用している場合、ファイル監視に問題がある場合があります:

**解決策1**: `CHOKIDAR_USEPOLLING=true` を環境変数に追加

**解決策2**: ローカルで開発、Dockerは本番のみ使用

### ボリュームマウントの問題

```bash
# ボリュームを削除して再作成
docker compose down -v
docker compose up --build
```

---

## 🎯 推奨ワークフロー

### 開発時

```bash
# 初回
docker compose up -d postgres redis ipfs
# ローカルでバックエンド・フロントエンドを起動
cd backend && npm run dev &
cd frontend && npm run dev
```

### テスト時

```bash
# すべてDocker化
docker compose up --build
```

### デプロイ前確認

```bash
# 本番環境と同じ構成でビルド
docker compose -f docker-compose.prod.yml up --build
```

---

## 📚 参考リンク

- [Docker公式ドキュメント](https://docs.docker.com/)
- [Docker Compose公式ドキュメント](https://docs.docker.com/compose/)
- [Node.js Docker ベストプラクティス](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md)
