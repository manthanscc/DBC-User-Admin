/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'Arial', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
        helvetica: ['Helvetica', 'Arial', 'sans-serif'],
        poppins: ['Poppins', 'Arial', 'sans-serif'],
        playfair: ['Playfair Display', 'Georgia', 'serif'],
        roboto: ['Roboto', 'Arial', 'sans-serif'],
        montserrat: ['Montserrat', 'Arial', 'sans-serif'],
        raleway: ['Raleway', 'Arial', 'sans-serif'],
        lora: ['Lora', 'Georgia', 'serif'],
        merriweather: ['Merriweather', 'Georgia', 'serif'],
        nunito: ['Nunito', 'Arial', 'sans-serif'],
        oswald: ['Oswald', 'Arial', 'sans-serif'],
        sourcesans: ['Source Sans Pro', 'Arial', 'sans-serif'],
        ubuntu: ['Ubuntu', 'Arial', 'sans-serif'],
        ptserif: ['PT Serif', 'Georgia', 'serif'],
        worksans: ['Work Sans', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
