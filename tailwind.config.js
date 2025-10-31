/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        // Inter fontu Next.js'te layout.tsx'te tanımladığımız değişkenle eşleşiyor
        sans: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      colors: {
        primary: {
          DEFAULT: "#2563EB", // mavi ton (butonlar, linkler)
          dark: "#1E40AF",
          light: "#60A5FA",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
      },

      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
      },

      boxShadow: {
        card: "0 4px 10px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
