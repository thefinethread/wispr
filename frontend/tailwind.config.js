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
        sans: ["Poppins"],
        comfortaa: ["Comfortaa"],
      },
      textColor: {
        skin: {
          primary: withOpacity("--color-primary"),
          base: withOpacity("--color-text-base"),
          muted: withOpacity("--color-text-muted"),
        },
      },
      backgroundColor: {
        skin: {
          primary: withOpacity("--color-primary"),
        },
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
