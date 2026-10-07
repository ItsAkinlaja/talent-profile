import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE',
          300: '#A5B4FC', 400: '#818CF8', 500: '#6366F1',
          600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F5F6FA',
          tertiary: '#ECEEF4',
          border: '#E2E5EF',
          hover: '#F0F2F8',
        },
        ink: {
          DEFAULT: '#0D0F1A',
          secondary: '#3D4252',
          tertiary: '#717588',
          disabled: '#A8ABBE',
        },
        success: { DEFAULT: '#10B981', light: '#D1FAE5', dark: '#065F46' },
        warning: { DEFAULT: '#F59E0B', light: '#FEF3C7' },
        danger:  { DEFAULT: '#EF4444', light: '#FEE2E2' },
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px', xl: '16px', '2xl': '20px', '3xl': '28px', '4xl': '36px',
      },
      boxShadow: {
        'xs':       '0 1px 2px 0 rgba(0,0,0,.05)',
        'card':     '0 1px 4px 0 rgba(0,0,0,.06), 0 1px 2px -1px rgba(0,0,0,.04)',
        'elevated': '0 4px 24px -4px rgba(0,0,0,.10), 0 2px 8px -2px rgba(0,0,0,.06)',
        'modal':    '0 24px 64px -12px rgba(0,0,0,.20)',
        'brand':    '0 4px 16px 0 rgba(99,102,241,.30)',
        'glow':     '0 0 0 3px rgba(99,102,241,.18)',
      },
      animation: {
        'fade-in':   'fadeIn .18s ease-out',
        'slide-up':  'slideUp .22s cubic-bezier(.16,1,.3,1)',
        'slide-in':  'slideIn .22s cubic-bezier(.16,1,.3,1)',
        'scale-in':  'scaleIn .18s ease-out',
        'shimmer':   'shimmer 1.6s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                          to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-8px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { from: { backgroundPosition: '-200% 0' }, to: { backgroundPosition: '200% 0' } },
      },
    },
  },
  plugins: [],
};

export default config;
