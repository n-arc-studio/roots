export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 8) {
    return { valid: false, message: 'パスワードは8文字以上である必要があります' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'パスワードには大文字を含める必要があります' };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: 'パスワードには小文字を含める必要があります' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'パスワードには数字を含める必要があります' };
  }
  return { valid: true };
};

export const validateUsername = (username: string): { valid: boolean; message?: string } => {
  if (username.length < 3) {
    return { valid: false, message: 'ユーザー名は3文字以上である必要があります' };
  }
  if (username.length > 50) {
    return { valid: false, message: 'ユーザー名は50文字以下である必要があります' };
  }
  if (!/^[a-zA-Z0-9_\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/.test(username)) {
    return { valid: false, message: 'ユーザー名には英数字、アンダースコア、日本語のみ使用できます' };
  }
  return { valid: true };
};
