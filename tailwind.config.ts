import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          DEFAULT: '#14181B',
          soft: '#5B655F',
        },
        accent: {
          DEFAULT: '#1F6F5C',
          dark: '#0E3F33',
          tint: '#E4EFEA',
        },
      },
    },
  },
}
