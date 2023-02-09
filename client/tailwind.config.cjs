/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/flowbite/**/*.js"

  ],

  theme: {
   
    extend: {
      colors :{
        green : '#3C6255',
        darkGreen : '#021710',
        red:'#8C2222',
        white:'#ffffff',
        lightGreen : '#A6BB8D',
        dark:'#F3F3F3'

      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
