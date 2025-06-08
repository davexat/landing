/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: ["selector", "[data-web-theme=dark]"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#21b2e3",
          color: "#fff",
          light: {
            1: "#f0fbfe",
            2: "#d6f4fc",
            3: "#b3e9f8",
            4: "#8edcf3",
            5: "#6ad0ee",
            6: "#47c3ea",
            7: "#21b2e3",
            8: "#1a9fc9",
            9: "#178db0",
            10: "#147b97",
            11: "#11697e",
            12: "#0e5765",
          },
          dark: {
            1: "#1a2a33",
            2: "#1d3a47",
            3: "#205a6b",
            4: "#237a8f",
            5: "#269ab3",
            6: "#21b2e3",
            7: "#47c3ea",
            8: "#6ad0ee",
            9: "#8edcf3",
            10: "#b3e9f8",
            11: "#d6f4fc",
            12: "#f0fbfe",
          },
        },
        body: {
          light: {
            1: "#fcfcfd",
            2: "#f9f9fb",
            3: "#eff0f3",
            4: "#e7e8ec",
            5: "#e0e1e6",
            6: "#d8d9e0",
            7: "#cdced7",
            8: "#b9bbc6",
            9: "#8b8d98",
            10: "#80828d",
            11: "#62636c",
            12: "#1e1f24",
          },
          dark: {
            1: "#212224",
            2: "#28292b",
            3: "#303134",
            4: "#36373b",
            5: "#3c3d42",
            6: "#43444a",
            7: "#4f5058",
            8: "#666872",
            9: "#72747f",
            10: "#7d7f8a",
            11: "#b4b6bf",
            12: "#eeeef0",
          },
        },
      },
      borderColor: {
        alpha: {
          light: "#00073527",
          dark: "#d6dbfc2f",
        },
      },
      backgroundColor: {
        body: {
          striped: {
            light: "#00005506",
            dark: "#adc5f30f",
          },
        },
      },
      boxShadow: {
        "card-1": "0px 0px 40px 0px rgba(0, 0, 0, 0.08)",
        "card-2": "0px 10px 20px 0 rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};
