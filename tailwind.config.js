/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        google: {
          'text-gray': '#3c4043',
          'button-blue': '#1a73e8',
          'button-blue-hover': '#5195ee',
          'button-dark': '#202124',
          'button-dark-hover': '#555658',
          'button-border-light': '#dadce0',
          'logo-blue': '#4285f4',
          'logo-green': '#34a853',
          'logo-yellow': '#fbbc05',
          'logo-red': '#ea4335',
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thick',
          scrollbarColor: '#ffffff1e #212121',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '10px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1F2937',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#4B5563',
            borderRadius: '20px',
            border: '3px solid #1F2937',
          },
        },
      }
      addUtilities(newUtilities, ['responsive', 'hover']);
    }
  ],
}

