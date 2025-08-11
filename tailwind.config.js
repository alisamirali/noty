/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "note-yellow": "#fef3c7",
        "note-blue": "#dbeafe",
        "note-green": "#dcfce7",
        "note-pink": "#fce7f3",
        "note-purple": "#f3e8ff",
        "note-orange": "#fed7aa",
        "note-red": "#fecaca",
        "note-teal": "#ccfbf1",
        "note-indigo": "#e0e7ff",
        "note-cyan": "#cffafe",
        "note-lime": "#ecfccb",
        "note-emerald": "#d1fae5",
        "note-rose": "#ffe4e6",
        "note-violet": "#ede9fe",
        "note-sky": "#e0f2fe",
        "note-amber": "#fbbf24",
        "note-slate": "#f1f5f9",
        "note-stone": "#f5f5f4",
        "note-zinc": "#f4f4f5",
        "note-neutral": "#fafafa",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        "slide-out": "slideOut 0.3s ease-in",
        "fade-in": "fadeIn 0.2s ease-out",
        "fade-out": "fadeOut 0.2s ease-in",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-10px)", opacity: "0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
