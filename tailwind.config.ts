import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B1E2A',
        'ink-soft': '#2A2E40',
        paper: '#F6F1E4',
        'paper-dim': '#EAE3D0',
        gold: '#D9A441',
        rust: '#A3432B',
        sage: '#6B7F62',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        sans: ['var(--font-source-sans)', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      maxWidth: {
        content: '1120px',
      },
    },
  },
  plugins: [],
}
export default config
