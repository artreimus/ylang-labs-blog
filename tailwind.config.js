// @ts-check
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './node_modules/pliny/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}',
    './layouts/**/*.{js,ts,tsx}',
    './data/**/*.mdx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fefde8',
          100: '#fffdc2',
          200: '#fff787',
          300: '#ffeb43',
          400: '#ffd702',
          500: '#efc003',
          600: '#ce9500',
          700: '#a46a04',
          800: '#88520b',
          900: '#734310',
          950: '#432305',
        },
        secondary: {
          50: '#f3f8ed',
          100: '#e3f0d7',
          200: '#c9e3b3',
          300: '#a7d086',
          400: '#87bb60',
          500: '#75b34a',
          600: '#507f31',
          700: '#3e6229',
          800: '#354f25',
          900: '#2f4423',
          950: '#16240f',
        },
        gray: colors.gray,
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
      keyframes: {
        typewriter: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        blinkCaret: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
        },
        typewriterWithCaret: {
          '0%': {
            width: '0%',
            borderRightColor: 'currentColor',
          },
          '90%': {
            width: '100%',
            borderRightColor: 'currentColor',
          },
          '100%': {
            width: '100%',
            borderRightColor: 'transparent',
          },
        },
      },
      animation: {
        typewriter: 'typewriter 4s steps(40) forwards',
        blinkCaret: 'blinkCaret 0.75s step-end infinite',
        typewriterWithCaret: 'typewriterWithCaret 4s steps(40) forwards',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
  ],
}
