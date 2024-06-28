/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: `#1A75BC`,
        secondary: `#27AAE2`,
        accent: `#5E7F8A`,
        error: `#EF5F69`,
        success: `#2AD4A1`,
        info: `#F9C74F`,
        warning: '#EEA441',
        'base-content': `black`,
        'primary-content': `#1A75BC`,
        'secondary-content': `#27AAE2`,
        'accent-content': `#5E7F8A`,
        'error-content': `#CB4D56`,
        'success-content': '#37B38E',
        'info-content': `#F9C74F`,
        'warning-content': '#CD7747',
        'base-100': `white`,
        'base-200': `#e9f0f6`,
        'base-300': `#9ca3af`,
      },
    },
  },
  plugins: [],
};
