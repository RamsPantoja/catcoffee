import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.tsx",
  ],
  theme: {
    fontFamily: {
      sans: ['__Nunito_14f33d', '__Nunito_Fallback_14f33d', 'sans-serif'],
      serif: ['__Nunito_14f33d', '__Nunito_Fallback_14f33d', 'serif'],
    },
    extend: {
      colors: {
        whiteMain: '#FFFFFF',
        whiteLigth: '#F0F0F0',
        grayMain: '#6A6A6A',
        grayStrong: "#888888",
        blackMain: '#000000',
        blackNormal: "#181818",
        blackLigth: '#0f0f0f',
        pinkLigth: "#fec7f6",
        pinkStrong: "#fa23b6",
        lemonLigth: "#e2fe8d",
        lemonStrong: "#51cf2d"
      },
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
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
} satisfies Config;
