/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'mars': {
          50:  '#fef2ee',
          100: '#fde0d5',
          200: '#fbbfaa',
          300: '#f8957a',
          400: '#f46040',
          500: '#e84020',
          600: '#c42f14',
          700: '#9c2312',
          800: '#7a1e13',
          900: '#641b15',
          950: '#380a08',
        },
        'space': {
          50:  '#f0f4ff',
          100: '#dde7ff',
          200: '#c2d1ff',
          300: '#9db4ff',
          400: '#758bff',
          500: '#4f5eff',
          600: '#3a3df5',
          700: '#2e2fd8',
          800: '#2628ae',
          900: '#262789',
          950: '#161752',
        },
        'navy': {
          800: '#0d1421',
          850: '#0a1018',
          900: '#070d14',
          950: '#040810',
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
