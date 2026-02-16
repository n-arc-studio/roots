# 多言語対応 (Multilingual Support)

Roots アプリケーションは日本語と英語の多言語対応を実装しています。

## 概要

このアプリケーションは以下の言語をサポートしています：

- **日本語 (ja)**: 日本ユーザー向け
- **英語 (en)**: 国際向け

## フロントエンド実装

### i18next のセットアップ

フロントエンドでは **react-i18next** ライブラリを使用しています。

**インストール済みパッケージ:**
- `i18next`
- `react-i18next`
- `i18next-browser-languagedetector`
- `i18next-http-backend`

### i18n 設定ファイル

```
frontend/src/i18n/
├── config.ts          # i18next 設定
└── locales/
    ├── en.json        # 英語翻訳
    └── ja.json        # 日本語翻訳
```

**翻訳キーの構造:**
```json
{
  "common": { ... },        // 共通テキスト
  "nav": { ... },           // ナビゲーション
  "pages": { ... },         // ページテキスト
  "auth": { ... },          // 認証関連
  "validation": { ... }      // 検証メッセージ
}
```

### コンポーネントでの使用

```tsx
import { useTranslation } from 'react-i18next';

export const MyComponent = () => {
  const { t } = useTranslation();
  
  return <h1>{t('pages.home.tagline')}</h1>;
};
```

### 言語切り替え

`LanguageSwitcher` コンポーネントを使用して言語を切り替えられます：

```tsx
import { LanguageSwitcher } from './components/LanguageSwitcher';

export const Header = () => (
  <header>
    <LanguageSwitcher />
  </header>
);
```

### 言語設定の保存

**フロントエンド:**
- ローカルストレージに言語設定を保存
- ページリロード時に前回選択した言語が復元される

**バックエンド:**
- ユーザー言語設定はデータベースに保存
- ログイン時にユーザーの言語設定を読み込む

## バックエンド実装

### i18next のセットアップ

バックエンドでは **i18next** とファイルベースのローディングを使用しています。

**インストール済みパッケージ:**
- `i18next`
- `i18next-fs-backend`

### 翻訳ファイル

```
backend/src/i18n/
├── config.ts          # i18next 設定
└── locales/
    ├── en.json        # 英語翻訳
    └── ja.json        # 日本語翻訳
```

### i18n ミドルウェア

アプリケーション起動時に `i18nMiddleware` が登録されます：

```typescript
// src/index.ts
app.use(i18nMiddleware);
```

このミドルウェアは以下を行います：

1. リクエストクエリ文字列の `lang` パラメータを確認
2. `Accept-Language` ヘッダーをチェック
3. デフォルト言語（英語）に設定
4. `req.t()` ヘルパーメソッドを利供

### API での使用

```typescript
// routes/authRoutes.ts
router.post('/register', async (req: Request, res: Response) => {
  try {
    // ...validation logic...
    
    throw new AppError(
      req.t('auth.userAlreadyExists'),
      409,
      'auth.userAlreadyExists'
    );
  } catch (error) {
    // エラーハンドラーが翻訳されたメッセージを返す
  }
});
```

### エラーメッセージの翻訳

`AppError` クラスで翻訳キーをサポートしています：

```typescript
throw new AppError(
  'Fallback message',
  status_code,
  'translation.key'  // 翻訳キー
);
```

## ユーザー言語設定

### データベーススキーマ

`users` テーブルに `language_preference` カラムが追加されています：

```sql
ALTER TABLE users 
ADD COLUMN language_preference VARCHAR(10) DEFAULT 'en';
```

### API エンドポイント

**言語設定の更新:**

```bash
PUT /api/auth/language
Content-Type: application/json
Authorization: Bearer {token}

{
  "language": "ja"
}
```

**レスポンス:**
```json
{
  "success": true,
  "message": "プロフィールが更新されました",
  "language": "ja"
}
```

## 翻訳キー一覧

### 共通
- `common.appName` - アプリケーション名
- `common.description` - 説明
- `common.language` - 言語
- `common.loading` - 読み込み中
- `common.error` - エラー
- `common.success` - 成功

### ナビゲーション
- `nav.home` - ホーム
- `nav.familyTree` - 家系図
- `nav.timeline` - タイムライン
- `nav.profile` - プロフィール
- `nav.messaging` - メッセージング
- `nav.mediaArchive` - メディアアーカイブ
- `nav.logout` - ログアウト
- `nav.login` - ログイン
- `nav.register` - 登録

### ページ
- `pages.home.*` - ホームページ
- `pages.login.*` - ログインページ
- `pages.profile.*` - プロフィールページ
- `pages.familyTree.*` - 家系図ページ
- `pages.timeline.*` - タイムラインページ
- `pages.messaging.*` - メッセージングページ
- `pages.mediaArchive.*` - メディアアーカイブページ

### 認証
- `auth.loginSuccess` - ログイン成功
- `auth.registerSuccess` - 登録成功
- `auth.invalidCredentials` - 認証情報が無効
- `auth.userNotFound` - ユーザーが見つからない
- `auth.unauthorized` - 認証が必要
- `auth.forbidden` - 権限がない

### 検証
- `validation.emailRequired` - メール必須
- `validation.emailInvalid` - メール無効
- `validation.passwordRequired` - パスワード必須
- `validation.passwordTooShort` - パスワード短すぎ
- `validation.usernameRequired` - ユーザー名必須

## 新しい翻訳の追加方法

### フロントエンド

1. `frontend/src/i18n/locales/ja.json` に日本語翻訳を追加：
   ```json
   {
     "pages": {
       "mypage": {
         "title": "マイページ"
       }
     }
   }
   ```

2. `frontend/src/i18n/locales/en.json` に英語翻訳を追加：
   ```json
   {
     "pages": {
       "mypage": {
         "title": "My Page"
       }
     }
   }
   ```

3. コンポーネントで使用：
   ```tsx
   const { t } = useTranslation();
   return <h1>{t('pages.mypage.title')}</h1>;
   ```

### バックエンド

1. `backend/src/i18n/locales/ja.json` に日本語翻訳を追加
2. `backend/src/i18n/locales/en.json` に英語翻訳を追加
3. API ハンドラーで使用：
   ```typescript
   const message = req.t('myfeature.success');
   res.json({ message });
   ```

## 言語検出の優先順序

### フロントエンド
1. ローカルストレージ
2. ブラウザー設定（Accept-Language）
3. デフォルト（英語）

### バックエンド
1. リクエストクエリ文字列（`?lang=ja`）
2. Accept-Language ヘッダー
3. デフォルト（英語）

## 言語別 API クエリ

任意の API エンドポイントにクエリパラメータを追加して言語を指定できます：

```bash
GET /api/auth/me?lang=ja
GET /api/persons?lang=en
```

## ベストプラクティス

### フロントエンド

1. **常に翻訳キーを使用する**
   ```tsx
   // Good
   <button>{t('common.save')}</button>
   
   // Bad
   <button>保存</button>
   ```

2. **ネストされたキーを活用する**
   ```json
   {
     "pages": {
       "login": {
         "title": "ログイン",
         "email": "メールアドレス"
       }
     }
   }
   ```

3. **共通テキストは `common` カテゴリーに**
   ```json
   {
     "common": {
       "save": "保存",
       "delete": "削除",
       "cancel": "キャンセル"
     }
   }
   ```

### バックエンド

1. **エラーメッセージに翻訳キーを関連付ける**
   ```typescript
   throw new AppError(
     req.t('auth.invalidCredentials'),
     401,
     'auth.invalidCredentials'
   );
   ```

2. **API レスポンスで翻訳済みメッセージを返す**
   ```typescript
   res.json({
     message: req.t('auth.loginSuccess'),
     user: userData
   });
   ```

## トラブルシューティング

### 翻訳が表示されない

1. 翻訳キーが存在するか確認
2. `i18n/locales/` に両言語のファイルがあるか確認
3. ブラウザーコンソールでエラーを確認

### 言語が切り替わらない

1. ブラウザーのキャッシュをクリア
2. localStorage の言語設定を確認
3. サーバーがリクエストで言語パラメータを受け取っているか確認

## 言語対応状況

- ✅ フロントエンド UI（ログイン、ホーム、基本ページ）
- ✅ バックエンド API エラーメッセージ
- ✅ データベーススキーマ（ユーザー言語設定）
- ✅ 言語切り替え機能
- ⚠️ ユーザーコンテンツ（データベース内容は多言語化されていない）
- ⚠️ メール通知（まだ未実装）

## 今後の拡張

1. **サーバーサイドレンダリング（SSR）対応**
2. **RTL 言語サポート（アラビア語、ヘブライ語など）**
3. **より多くの言語追加**
4. **ユーザーコンテンツの多言語化**
5. **メール通知の多言語対応**
6. **API ドキュメント の多言語化**
