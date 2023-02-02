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
        red:'#8C2222'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
