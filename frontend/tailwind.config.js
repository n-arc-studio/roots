/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        roots: {
          primary: '#4A90E2',      // 明るい青（未来・希望）
          secondary: '#7B68EE',    // 紫（つながり・絆）
          accent: '#FFB347',       // オレンジゴールド（温かみ）
          light: '#F0F8FF',        // アリスブルー（明るい背景）
          success: '#48C774',      // 緑（成長）
          dark: '#2C3E50',         // ダークブルーグレー
        },
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-future': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-light': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      },
    },
  },
  plugins: [],
}
