/** Tailwind build config (was inline with the Play CDN).
 *  Rebuild Styles/tailwind.css after adding Tailwind classes:
 *    npx tailwindcss@3.4.16 -i Styles/tailwind.input.css -o Styles/tailwind.css --minify
 */
module.exports = {
  content: ["./index.html", "./work/**/*.html", "./Scripts/**/*.js"],
  theme: {
    extend: {
      colors: {
        primary:  "#60A5FA",
        surface:  "#26201D",
        bg:       "#1C1917",
        muted:    "#9C8E87",
        border:   "#3C3330",
        accent:   "#60A5FA",
      },
      borderRadius: {
        none:    "0px",
        sm:      "4px",
        DEFAULT: "8px",
        md:      "12px",
        lg:      "16px",
        xl:      "20px",
        full:    "9999px",
        button:  "8px",
      },
      fontFamily: {
        sans: ["'DM Sans'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
    },
  },
};
