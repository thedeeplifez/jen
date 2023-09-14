/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        body: 'var(--body)',
        content: 'var(--content)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        'text-base': 'var(--text-base)',
        'text-light': 'var(--text-light)',
        line: 'var(--line)'
      }
    },
  },
  plugins: [],
  darkMode: 'class'
}
