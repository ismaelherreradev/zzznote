import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-lufga)"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        notikBlack: "hsl(var(--notik-black))",
        notikGoldenYellow: "hsl(var(--notik-golden-yellow))",
        notikBurntOrange: "hsl(var(--notik-burnt-orange))",
        notikLightSkyBlue: "hsl(var(--notik-light-sky-blue))",
        notikPaleGreen: "hsl(var(--notik-pale-green))",
        notikCream: "hsl(var(--notik-cream))",
        notikWhite: "hsl(var(--notik-white))",

        "notikBlack-foreground": "hsl(var(--notik-black-foreground))",
        "notikGoldenYellow-foreground": "hsl(var(--notik-golden-yellow-foreground))",
        "notikBurntOrange-foreground": "hsl(var(--notik-burnt-orange-foreground))",
        "notikLightSkyBlue-foreground": "hsl(var(--notik-light-sky-blue-foreground))",
        "notikPaleGreen-foreground": "hsl(var(--notik-pale-green-foreground))",
        "notikCream-foreground": "hsl(var(--notik-cream-foreground))",
        "notikWhite-foreground": "hsl(var(--notik-white-foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
