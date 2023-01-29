/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        pyro: "#ef7a35",
        hydro: "#4bc3f1",
        cryo: "#99ccda",
        electro: "#b08fc2",
        geo: "#ecae31",
        anemo: "#75c3a9",
        dendro: "#a0bf3a",
        physical: "#cccccc",
        starsgold: "#eeca4f",
        starspurple: "#cb67ed",
        starsblue: "#60bded"
      }
    },
  },
  plugins: [],
}
