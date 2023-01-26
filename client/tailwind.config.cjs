/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
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
  plugins: [],
}
