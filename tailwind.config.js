/** @type {import('tailwindcss').Config} */
const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variable}), ${opacityValue})`
    }
    return `rgb(var(${variable}))`
  }
}

module.exports = {
  mode: 'jit',
  darkMode: 'class',
  important: true,
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: withOpacityValue('--color-primary'), /// '#3DB0E7',
        secondary: withOpacityValue('--color-secondary'),
        accent: withOpacityValue('--color-accent'),
        dark: '#1d1d1d',
        'dark-page': '#121212',
        positive: withOpacityValue('--color-positive'),
        negative: withOpacityValue('--color-negative'),
        info: withOpacityValue('--color-info'),
        warning: withOpacityValue('--color-warning'),
        black: withOpacityValue('--color-base'),
        white: '#ffffff',
        'secondary-text': withOpacityValue('--color-secondary-text'),
        'disable-text': withOpacityValue('--color-disable-text'),
        base: withOpacityValue('--color-base'),
        surface: withOpacityValue('--color-surface'),
        overlay: withOpacityValue('--color-overlay'),
        border: withOpacityValue('--color-border'),
        inactive: withOpacityValue('--color-inactive'),
        active: withOpacityValue('--color-active'),
        line: withOpacityValue('--color-line'),
        'blue-arker': '#1565C0',
        'blue-dark': '#1E88E5',
        'blue-normal': '#1d52a0',
        'blue-light': '#BBDEFB',
        'blue-lighter': '#E3F2FD',
        'amber-darker': '#FF8F00',
        'amber-dark': '#FFB300',
        'amber-normal': '#FFCA28',
        'amber-light': '#FFECB3',
        'amber-lighter': '#FFF8E1',
        'green-darker': '#2E7D32',
        'green-dark': '#43A047',
        'green-normal': '#66BB6A',
        'green-light': '#C8E6C9',
        'green-lighter': '#E8F5E9',
        'purple-darker': '#4527A0',
        'purple-dark': '#5E35B1',
        'purple-normal': '#7E57C2',
        'purple-light': '#D1C4E9',
        'purple-lighter': '#EDE7F6',
        'red-darker': '#C62828',
        'red-dark': '#E53935',
        'red-normal': '#EF5350',
        'red-light': '#FFCDD2',
        'red-lighter': '#FFEBEE',
        'gray-darker': '#666666',
        'gray-dark': '#999999',
        'gray-normal': '#BDBDBD',
        'gray-light': '#E0E0E0',
        'gray-lighter': '#F7F7F7',
      },
      animation: {
        'shake-invalid': 'shake-invalid 0.3s',
        'fade-in-right': 'fade-in-right 1.5s',
        'fade-in-left': 'fade-in-left 1.5s',
        'fade-in-top': 'fade-in-top 1.5s',
        'fade-in-bottom': 'fade-in-bottom 1.5s',
      },
      keyframes: {
        'shake-invalid': {
          '25%, 75%': { transform: 'translateX(4px)' },
          '50%': { transform: 'translateX(-4px)' },
        },
        'fade-in-right': {
          '0%': { transform: 'translateX(-100px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'fade-in-left': {
          '0%': { transform: 'translateX(50px)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'fade-in-top': {
          '0%': { transform: 'translateY(50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'fade-in-bottom': {
          '0%': { transform: 'translateY(-50px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      boxShadow: {
        base: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      },
      borderRadius: {
        base: '0.375rem',
      },
      screens: {
        sm: '375px',
        md: '768px',
        lg: '1366px',
        xl: '1920px',
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey]
          const newVars =
            typeof value === 'string'
              ? { [`--q${colorGroup}-${colorKey}`]: value }
              : extractColorVars(value, `-${colorKey}`)
          return { ...vars, ...newVars }
        }, {})
      }
      addBase({
        ':root': extractColorVars(theme('colors')),
        '.no-tailwind ol': {
          'list-style-type': 'decimal',
          margin: '1em 0',
          paddingLeft: '40px',
        },
        '.no-tailwind ul': {
          'list-style-type': 'disc',
          margin: '1em 0',
          paddingLeft: '40px',
        },
        '.no-tailwind li': {
          marginBottom: '0.5em',
        },
      })
    },
  ],
}
