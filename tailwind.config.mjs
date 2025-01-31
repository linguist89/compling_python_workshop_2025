/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#F5F5F5',
        accent: '#FFA726',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Courier New', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            code: {
              fontFamily: 'Fira Code, Courier New, monospace',
              backgroundColor: '#F5F5F5',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: '#1E293B',
              color: '#E2E8F0',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              color: 'inherit',
              fontSize: '0.875em',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
