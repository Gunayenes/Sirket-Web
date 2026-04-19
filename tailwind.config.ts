import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    // Service config dynamic gradient classes
    'from-blue-500', 'to-indigo-600', 'from-blue-950', 'via-indigo-900', 'to-purple-950',
    'from-emerald-500', 'to-teal-600', 'from-emerald-950', 'via-teal-900', 'to-cyan-950',
    'from-violet-500', 'to-purple-600', 'from-violet-950', 'via-purple-900', 'to-fuchsia-950',
    'from-cyan-500', 'to-blue-600', 'from-cyan-950', 'via-blue-900', 'to-indigo-950',
    'from-pink-500', 'to-fuchsia-600', 'from-pink-950', 'via-fuchsia-900',
    'from-orange-500', 'to-amber-600', 'from-orange-950', 'via-amber-900', 'to-yellow-950',
    'from-green-500', 'to-emerald-600', 'from-emerald-950', 'via-green-900',
    'from-rose-500', 'to-red-600', 'from-rose-950', 'via-red-900', 'to-orange-950',
    // Orb colors
    'bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-cyan-500',
    'bg-fuchsia-500', 'bg-orange-500', 'bg-green-500', 'bg-rose-500',
    // Text gradients
    'from-blue-400', 'via-cyan-300', 'to-indigo-400',
    'from-emerald-400', 'via-teal-300', 'to-cyan-400',
    'from-violet-400', 'via-purple-300', 'to-fuchsia-400',
    'from-cyan-400', 'via-blue-300', 'to-indigo-400',
    'from-pink-400', 'via-fuchsia-300', 'to-purple-400',
    'from-orange-400', 'via-amber-300', 'to-yellow-400',
    'from-green-400', 'via-emerald-300', 'to-teal-400',
    'from-rose-400', 'via-red-300', 'to-orange-400',
    // Badge colors and bgs
    'text-blue-300', 'text-emerald-300', 'text-violet-300', 'text-cyan-300',
    'text-fuchsia-300', 'text-orange-300', 'text-green-300', 'text-rose-300',
    'bg-blue-500/10', 'bg-emerald-500/10', 'bg-violet-500/10', 'bg-cyan-500/10',
    'bg-fuchsia-500/10', 'bg-orange-500/10', 'bg-green-500/10', 'bg-rose-500/10',
    'border-blue-500/20', 'border-emerald-500/20', 'border-violet-500/20', 'border-cyan-500/20',
    'border-fuchsia-500/20', 'border-orange-500/20', 'border-green-500/20', 'border-rose-500/20',
    // Support card colors
    'from-rose-500', 'to-rose-600', 'shadow-rose-500/30',
    'from-red-500', 'to-red-600', 'shadow-red-500/30',
    'from-orange-500', 'to-orange-600', 'shadow-orange-500/30',
    'from-amber-500', 'to-amber-600', 'shadow-amber-500/30',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        accent: {
          50:  '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundSize: {
        '300%': '300%',
      },
      typography: (theme: (path: string) => string) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            a: { color: theme('colors.brand.600'), '&:hover': { color: theme('colors.brand.700') } },
            h1: { color: theme('colors.gray.900') },
            h2: { color: theme('colors.gray.900') },
            h3: { color: theme('colors.gray.900') },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
