# 認証システムセットアップガイド

## 🔐 実装内容

完全なユーザー認証システムが実装されました：

### バックエンド
- ✅ PostgreSQL データベーススキーマ
- ✅ JWT トークン認証
- ✅ bcrypt パスワードハッシュ化
- ✅ ユーザー登録・ログインAPI
- ✅ 認証ミドルウェア
- ✅ バリデーション（メール、パスワード、ユーザー名）

### フロントエンド
- ✅ ログイン/登録ページ
- ✅ Zustand 認証状態管理（永続化）
- ✅ 保護されたルート
- ✅ ログアウト機能

---

## 🚀 セットアップ手順

### 1. データベースの準備

```bash
# PostgreSQLコンテナを起動（docker-compose.ymlから）
cd d:\source\repos\roots
docker-compose up -d postgres
```

### 2. データベーススキーマの作成

```bash
# PostgreSQLに接続
docker exec -it roots-postgres psql -U roots_user -d roots_db

# または、Windows PostgreSQLクライアントから
psql -h localhost -p 5433 -U roots_user -d roots_db
```

SQLファイルを実行：
```sql
\i backend/src/db/schema.sql
```

または、コマンドラインから直接：
```bash
psql -h localhost -p 5433 -U roots_user -d roots_db -f backend/src/db/schema.sql
```

### 3. 環境変数の設定

ルートディレクトリに `.env` ファイルを作成：

```bash
# .env.example をコピー
cp .env.example .env
```

`.env` を編集して必要な値を設定：
```env
# Database
DB_HOST=localhost
DB_PORT=5433
DB_USER=roots_user
DB_PASSWORD=roots_password
DB_NAME=roots_db

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Application
NODE_ENV=development
PORT=3000
FRONTEND_URL=http://localhost:5173
```

### 4. 依存関係のインストール

```bash
# バックエンド
cd backend
npm install

# フロントエンド
cd ../frontend
npm install
```

### 5. サーバーの起動

**ターミナル1 - バックエンド:**
```bash
cd backend
npm run dev
```

**ターミナル2 - フロントエンド:**
```bash
cd frontend
npm run dev
```

### 6. 動作確認

1. ブラウザで `http://localhost:5173` を開く
2. 「今すぐ始める」または「ログイン」をクリック
3. 新規登録タブで以下を入力：
   - ユーザー名: `山田太郎`
   - メールアドレス: `test@example.com`
   - パスワード: `Test1234`（8文字以上、大文字・小文字・数字）
4. 登録ボタンをクリック
5. 自動的に家系図ページにリダイレクトされる

---

## 📋 API エンドポイント

### 認証

**POST** `/api/auth/register`
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "username": "山田太郎"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

**GET** `/api/auth/me`
- ヘッダー: `Authorization: Bearer <token>`

**GET** `/api/auth/verify`
- ヘッダー: `Authorization: Bearer <token>`

---

## 🔧 トラブルシューティング

### データベース接続エラー

```
❌ Database connection failed
```

**解決策:**
1. PostgreSQLコンテナが起動しているか確認
   ```bash
   docker ps | grep postgres
   ```
2. `.env` のDB設定を確認
3. PostgreSQLログを確認
   ```bash
   docker logs roots-postgres-1
   ```

### JWT シークレットキーエラー

**解決策:**
`.env` に `JWT_SECRET` を設定：
```bash
JWT_SECRET=$(openssl rand -base64 32)
```

### フロントエンドからAPIに接続できない

**解決策:**
1. バックエンドが `http://localhost:3000` で起動しているか確認
2. CORSが正しく設定されているか確認
3. `.env` の `FRONTEND_URL` を確認

---

## 🎯 次のステップ

1. **メール認証**: メール送信機能（SendGrid/AWS SES）
2. **パスワードリセット**: トークンベースのリセット機能
3. **OAuth**: Google/Apple ログイン統合
4. **2FA**: 二段階認証の実装
5. **ユーザープロフィール**: アバター画像アップロード

---

## 📚 技術スタック

- **認証**: JWT (jsonwebtoken)
- **パスワード**: bcrypt
- **状態管理**: Zustand (永続化付き)
- **バリデーション**: カスタムバリデーター
- **データベース**: PostgreSQL + pg driver
- **ルーティング**: React Router v6 (保護されたルート)
