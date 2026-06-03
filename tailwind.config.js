/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff5f9',
          100: '#ffe8f3',
          200: '#ffd1e8',
          300: '#ffaed6',
          400: '#ff80bc',
          500: '#ff4da0',
          600: '#f0308a',
          700: '#cc2272',
          800: '#a81d5e',
          900: '#8a1a4e',
        },
        accent: {
          50: '#fff5f9',
          100: '#ffe8f3',
          200: '#ffd1e8',
          300: '#ffaed6',
          400: '#ff80bc',
          500: '#ff4da0',
          600: '#f0308a',
          700: '#cc2272',
          800: '#a81d5e',
          900: '#8a1a4e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
    },
  },
  plugins: [],
}
