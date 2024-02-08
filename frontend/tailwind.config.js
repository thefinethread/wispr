/** @type {import('tailwindcss').Config} */

const withOpacity = (varName) => {
  return ({ opacityValue }) => {
    return opacityValue
      ? `rgba(var(${varName}), ${opacityValue})`
      : `rgba(var(${varName}))`;
  };
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ["Comfortaa"],
      },
      textColor: {
        skin: {
          secondary: withOpacity("--color-text-secondary"),
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
          accent: withOpacity("--color-accent"),
        },
      },

      backgroundColor: {
        skin: {
          primary: withOpacity("--color-bg-primary"),
          secondary: withOpacity("--color-bg-secondary"),
          accent: withOpacity("--color-accent"),
        },
      },
      borderColor: {
        skin: {
          primary: withOpacity("--color-border-primary"),
        },
      },
    },
  },
  darkMode: "class",
  plugins: ["prettier-plugin-tailwindcss"],
};
