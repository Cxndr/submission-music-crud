/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        blackdark: "var(--black-dark)",
        blacklight: "var(--black-light)",
        blacklighter: "var(--black-lighter)",
        white: "var(--white)",
        offwhite: "var(--off-white)",
        offerwhite: "var(--offer-white)",
        offestwhite: "var(--offest-white)",
        gcloud: "var(--gcloud)",
        gdnb: "var(--gdnb)",
        gtrap: "var(--gtrap)",
        ghouse: "var(--ghouse)",
        gphonk: "var(--gphonk)",
        gvaporwave: "var(--gvaporwave)",
        gfuturefunk: "var(--gfuturefunk)",
        gsynthwave: "var(--gsynthwave)",
        glofi: "var(--glofi)",

        'thistle': { 
          DEFAULT: '#d1bce3', 100: '#2a183a', 200: '#553174', 300: '#7f49af', 400: '#a880ca', 500: '#d1bce3', 600: '#d9c8e8', 700: '#e3d6ee', 800: '#ece4f4', 900: '#f6f1f9' 
        }, 
        'lilac': { 
          DEFAULT: '#c49bbb', 100: '#2c1a28', 200: '#593451', 300: '#854e79', 400: '#aa6f9e', 500: '#c49bbb', 600: '#d0afc9', 700: '#dcc3d7', 800: '#e8d7e4', 900: '#f3ebf2' 
        }, 
        'cinereous': { DEFAULT: '#a1867f', 100: '#211a18', 200: '#423431', 300: '#634e49', 400: '#836861', 500: '#a1867f', 600: '#b39d98', 700: '#c6b6b2', 800: '#d9cecb', 900: '#ece7e5' 

        }, 
        'ultra_violet': { 
          DEFAULT: '#585481', 100: '#12111a', 200: '#232234', 300: '#35334e', 400: '#474468', 500: '#585481', 600: '#7470a2', 700: '#9794b9', 800: '#b9b7d0', 900: '#dcdbe8' 
        }, 
        'resolution_blue': {
          DEFAULT: '#19297c', 100: '#050819', 200: '#0a1131', 300: '#0f194a', 400: '#142162', 500: '#19297c', 600: '#253eb7', 700: '#4b63da', 800: '#8797e6', 900: '#c3cbf3' 
        }
      },
    },
  },
  plugins: [],
};
