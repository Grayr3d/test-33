/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      maxWidth: {
        '1280': '1280px',
      },
      spacing: {
        '72': '72px',
      },
      colors: {
        gray: {
          100: '#F3F4F6',
          200: '#E5E7EB',
          400: '#9CA3AF',
          500: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};