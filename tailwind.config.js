/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        indigo: {
          DEFAULT: "#3B41E1",
          deep: "#2C31B8",
          soft: "#F5F3FF",
        },
        ink: "#1F2937",        // main text
        slate2: "#6B7280",     // secondary text
        line: "#E5E7EB",       // border
        appbg: "#F8FAFC",      // app background
        card: "#FFFFFF",       // card white
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
      },
      fontFamily: {
        display: ["'Red Hat Display'", "sans-serif"],
        body: ["'Red Hat Text'", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(-120%) skewX(-15deg)" },
          "100%": { transform: "translateX(220%) skewX(-15deg)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0px) translateX(0px)" },
          "50%": { transform: "translateY(-16px) translateX(6px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
        pop: {
          "0%": { transform: "scale(0.85) translateY(4px)", opacity: 0 },
          "60%": { transform: "scale(1.06) translateY(-2px)", opacity: 1 },
          "100%": { transform: "scale(1) translateY(0)", opacity: 1 },
        },
        rise: {
          "0%": { transform: "translateY(18px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        blobmorph: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 45% 55% 55%" },
          "25%": { borderRadius: "58% 42% 35% 65% / 55% 65% 35% 45%" },
          "50%": { borderRadius: "50% 50% 33% 67% / 55% 27% 73% 45%" },
          "75%": { borderRadius: "33% 67% 58% 42% / 63% 40% 60% 37%" },
        },
      },
      animation: {
        sweep: "sweep 3.5s ease-in-out infinite",
        floaty: "floaty 4s ease-in-out infinite",
        blink: "blink 1.6s ease-in-out infinite",
        pop: "pop 0.55s cubic-bezier(.34,1.56,.64,1) both",
        rise: "rise 0.6s cubic-bezier(.16,1,.3,1) both",
        marquee: "marquee 22s linear infinite",
        blobmorph: "blobmorph 16s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
