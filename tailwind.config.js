/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f5f3ff',
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
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
      },
      fontFamily: {
        inter: ['Inter', 'Arial', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
        poppins: ['Poppins', 'Arial', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        roboto: ['Roboto', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'sans-serif'],
        raleway: ['Raleway', 'Arial', 'sans-serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        merriweather: ['Merriweather', 'Georgia', 'serif'],
        nunito: ['Nunito', 'Arial', 'sans-serif'],
        oswald: ['Oswald', 'Arial', 'sans-serif'],
        sourcesans: ['Source Sans Pro', 'Arial', 'sans-serif'],
        ubuntu: ['Ubuntu', 'Arial', 'sans-serif'],
        ptserif: ['PT Serif', 'Georgia', 'serif'],
        worksans: ['Work Sans', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0.3))',
        'radial-soft': 'radial-gradient( circle at 20% 20%, rgba(59,130,246,0.15), transparent 40% ), radial-gradient( circle at 80% 30%, rgba(168,85,247,0.15), transparent 45% ), radial-gradient( circle at 50% 80%, rgba(16,185,129,0.15), transparent 40% )',
        'gradient-primary': 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%)',
        'grid-pattern': "linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(0,0,0,0.04) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      boxShadow: {
        'xl-soft': '0 25px 50px -12px rgba(0,0,0,0.25)',
        'card': '0 10px 25px rgba(2,6,23,0.08)'
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'rotate-full': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
};
