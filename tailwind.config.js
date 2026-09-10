/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // "Sage". Muted doubles as the meta-text color: anything lighter fails WCAG AA at 12px.
      colors: {
        ground: '#E6EAE1',
        shell: '#F4F6F0',
        ink: '#172019',
        muted: '#56615A',
        accent: '#2F6B4F',
        forest: '#1F3A2C',
        sand: '#EFE5D6',
        mist: '#DCE6E1',
        dots: '#B3BCB0',
        live: '#3F9A5A',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        shot: '0 10px 30px rgba(30, 45, 35, 0.18)',
      },
    },
  },
  plugins: [],
}
