/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './node_modules/flowbite/**/*.js'],
  daisyui: {
    themes: [
      {
        lightMode: {
          ...require('daisyui/src/theming/themes')['light'],
          'base-100': `white`,
          'base-200': `#e9f0f6`,
          'base-300': `#9ca3af`,

          primary: `#2AD4A1`,
          secondary: `#27AAE2`,
          accent: `#5E7F8A`,
          error: `#EF5F69`,
          success: `#2AD4A1`,
          info: `#F9C74F`,
          warning: '#EEA441',

          'base-content': `#2AD4A1`,
          'primary-content': `#1A75BC`,
          'secondary-content': `#27AAE2`,
          'accent-content': `#5E7F8A`,
          'error-content': `#CB4D56`,
          'success-content': '#37B38E',
          'info-content': `#F9C74F`,
          'warning-content': '#CD7747',
        },
        darkMode: {
          ...require('daisyui/src/theming/themes')['dark'],
          'base-100': `#11151c`,
          'base-200': `#343a40`,
          'base-300': `#f3f4f6`,
          primary: `white`,
          secondary: `#27AAE2`,
          accent: `#5E7F8A`,
          error: `#CB4D56`,
          success: `#2AD4A1`,
          info: `#F9C74F`,
          warning: '#CD7747',

          'base-content': `white`,
          'primary-content': `#1A75BC`,
          'secondary-content': `#27AAE2`,
          'accent-content': `#5E7F8A`,
          'error-content': `#EF5F69`,
          'success-content': '#37B38E',
          'info-content': `#F9C74F`,
          'warning-content': '#EEA441',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
};
