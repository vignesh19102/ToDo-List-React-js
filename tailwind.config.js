/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'login-background': "url('/src/assets/loginBackground.webp')",
      }
    },
  },
  plugins: [],
}

