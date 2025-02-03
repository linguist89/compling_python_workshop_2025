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
              backgroundColor: 'var(--card-background-light)',
              color: 'var(--text-primary)',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'var(--card-background-light)',
              color: 'var(--text-primary)',
              padding: '1.5rem',
              borderRadius: '0.5rem',
              overflowX: 'auto',
              border: '1px solid var(--card-border)',
              boxShadow: 'var(--card-shadow)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: 0,
              color: 'inherit',
              fontSize: '1em',
              border: 'none',
              lineHeight: 1.75,
            },
            // Syntax highlighting colors for light mode
            '.token.comment': {
              color: 'var(--syntax-comment)',
            },
            '.token.string': {
              color: 'var(--syntax-string)',
            },
            '.token.number': {
              color: 'var(--syntax-number)',
            },
            '.token.keyword': {
              color: 'var(--syntax-keyword)',
            },
            '.token.function': {
              color: 'var(--syntax-function)',
            },
            '.token.operator': {
              color: 'var(--syntax-operator)',
            },
            color: 'var(--text-primary)',
            h1: {
              color: 'var(--text-primary)',
            },
            h2: {
              color: 'var(--text-accent)',
            },
            h3: {
              color: 'var(--text-accent)',
            },
            h4: {
              color: 'var(--text-accent)',
            },
            p: {
              color: 'var(--text-primary)',
            },
            strong: {
              color: 'var(--text-accent)',
            },
            a: {
              color: 'var(--text-accent)',
              '&:hover': {
                color: 'var(--interactive-hover)',
              },
            },
            li: {
              color: 'var(--text-primary)',
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
