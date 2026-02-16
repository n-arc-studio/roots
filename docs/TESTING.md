# テストガイド

## 🧪 ユニットテストの実行方法

Rootsプロジェクトには、バックエンドとフロントエンドの両方に包括的なユニットテストが実装されています。

---

## 🔧 バックエンドテスト (Jest + Supertest)

### セットアップ

```bash
cd backend
npm install
```

### テストの実行

```bash
# すべてのテストを実行
npm test

# ウォッチモードで実行（開発時）
npm run test:watch

# カバレッジレポート付きで実行
npm run test:coverage
```

### テストファイル構成

```
backend/src/
├── utils/__tests__/
│   ├── jwt.test.ts              # JWT生成・検証のテスト
│   └── validation.test.ts       # バリデーション関数のテスト
└── routes/__tests__/
    └── authRoutes.test.ts       # 認証APIエンドポイントのテスト
```

### テスト内容

#### JWT Utils (`jwt.test.ts`)
- ✅ トークン生成の正常動作
- ✅ 異なるペイロードで異なるトークン生成
- ✅ 有効なトークンの検証
- ✅ 無効なトークンの拒否
- ✅ 期限切れトークンの拒否
- ✅ 改ざんされたトークンの拒否

#### Validation Utils (`validation.test.ts`)
- **Email検証**:
  - ✅ 有効なメールアドレスの受け入れ
  - ✅ 無効なメールアドレスの拒否
  
- **Password検証**:
  - ✅ 8文字以上の要件
  - ✅ 大文字・小文字・数字の要件
  - ✅ 強力なパスワードの受け入れ
  
- **Username検証**:
  - ✅ 3-50文字の範囲チェック
  - ✅ 英数字・アンダースコア・日本語の許可
  - ✅ 無効な文字の拒否

#### Auth Routes (`authRoutes.test.ts`)
- **登録 (POST /api/auth/register)**:
  - ✅ 有効なデータでの登録成功
  - ✅ 必須フィールド欠落時のエラー
  - ✅ 無効なメールでのエラー
  - ✅ 弱いパスワードでのエラー
  - ✅ 既存メールでの競合エラー

- **ログイン (POST /api/auth/login)**:
  - ✅ 有効な認証情報でのログイン成功
  - ✅ 必須フィールド欠落時のエラー
  - ✅ 存在しないユーザーでのエラー
  - ✅ 誤ったパスワードでのエラー
  - ✅ 無効化されたアカウントでのエラー

### カバレッジ目標

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## ⚛️ フロントエンドテスト (Vitest + React Testing Library)

### セットアップ

```bash
cd frontend
npm install
```

### テストの実行

```bash
# すべてのテストを実行
npm test

# UIモードで実行（インタラクティブ）
npm run test:ui

# カバレッジレポート付きで実行
npm run test:coverage
```

### テストファイル構成

```
frontend/src/
├── components/__tests__/
│   └── ProtectedRoute.test.tsx   # 保護されたルートのテスト
├── pages/__tests__/
│   └── LoginPage.test.tsx        # ログインページのテスト
└── hooks/__tests__/
    └── useStore.test.ts          # 状態管理ストアのテスト
```

### テスト内容

#### ProtectedRoute Component (`ProtectedRoute.test.tsx`)
- ✅ 未認証時のログインページへのリダイレクト
- ✅ 認証済み時の保護されたコンテンツの表示

#### LoginPage Component (`LoginPage.test.tsx`)
- ✅ ログインフォームのデフォルト表示
- ✅ 登録フォームへの切り替え
- ✅ 無効なメールでのエラー表示
- ✅ 有効な認証情報でのログイン成功
- ✅ 有効なデータでの登録成功
- ✅ 送信中のローディング状態表示
- ✅ ログイン失敗時のエラーメッセージ表示

#### useStore Hook (`useStore.test.ts`)
- **認証機能**:
  - ✅ ログイン時のユーザーとトークン設定
  - ✅ LocalStorageへの認証状態永続化
  - ✅ ログアウト時のデータクリア
  - ✅ LocalStorageのクリア

- **家族メンバー管理**:
  - ✅ メンバーの追加
  - ✅ メンバーの更新
  - ✅ メンバーの削除

---

## 📊 テストカバレッジの確認

### バックエンド

```bash
cd backend
npm run test:coverage
```

カバレッジレポート: `backend/coverage/index.html`

### フロントエンド

```bash
cd frontend
npm run test:coverage
```

カバレッジレポート: `frontend/coverage/index.html`

ブラウザで開く:
```bash
# Windows
start frontend/coverage/index.html

# Mac/Linux
open frontend/coverage/index.html
```

---

## 🔍 CI/CD統合

### GitHub Actions設定例

```yaml
name: Tests

on: [push, pull_request]

jobs:
  backend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd backend && npm ci
      - run: cd backend && npm test
      - run: cd backend && npm run test:coverage

  frontend-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: cd frontend && npm ci
      - run: cd frontend && npm test
      - run: cd frontend && npm run test:coverage
```

---

## 🐛 デバッグ

### Jestデバッグ (バックエンド)

```bash
# 特定のテストファイルのみ実行
npm test -- jwt.test.ts

# デバッグ情報を表示
npm test -- --verbose

# 失敗したテストのみ再実行
npm test -- --onlyFailures
```

### Vitestデバッグ (フロントエンド)

```bash
# 特定のテストファイルのみ実行
npm test -- LoginPage.test.tsx

# UIモードでインタラクティブにデバッグ
npm run test:ui

# デバッグ情報を表示
npm test -- --reporter=verbose
```

---

## 📝 テストの追加方法

### バックエンド

1. `__tests__` ディレクトリ作成
2. `*.test.ts` ファイル作成
3. Jest + Supertestでテスト記述

```typescript
import { describe, it, expect } from '@jest/globals';

describe('Feature Name', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### フロントエンド

1. `__tests__` ディレクトリ作成
2. `*.test.tsx` ファイル作成
3. Vitest + React Testing Libraryでテスト記述

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('Component Name', () => {
  it('should render', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 🎯 ベストプラクティス

1. **Arrange-Act-Assert** パターンを使用
2. **各テストは独立**させる
3. **モックは最小限**に
4. **テスト名は説明的**に（何をテストしているか明確に）
5. **エッジケースもカバー**する
6. **カバレッジ80%以上**を目指す
7. **Flaky test**は避ける（時間依存、非決定的なテスト）

---

## 🚀 次のステップ

- [ ] E2Eテストの追加 (Playwright/Cypress)
- [ ] 統合テストの追加
- [ ] パフォーマンステスト
- [ ] セキュリティテスト
- [ ] 負荷テスト

---

## 📚 参考リンク

- [Jest公式ドキュメント](https://jestjs.io/)
- [Vitest公式ドキュメント](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Supertest](https://github.com/visionmedia/supertest)
