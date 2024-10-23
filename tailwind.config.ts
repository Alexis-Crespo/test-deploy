import { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			white: 'white',
  			black: 'black',
  			primary: {
  				'50': '#f4f4ff',
  				'100': '#eceefb',
  				'200': '#e5e5ff',
  				'250': '#dedcff',
  				'300': '#ccf',
  				'400': '#9696ff',
  				'500': '#6439ff',
  				'550': '#4e26dd',
  				'600': '#3e14d7',
  				'700': '#2900bd',
  				'800': '#190064',
  				'900': '#06083f',
  				hover: '#4e26dd'
  			},
  			grey: {
  				'50': '#f7f7f7',
  				'100': '#f2f2f2',
  				'200': '#e8e8e8',
  				'300': '#dde1e6',
  				'400': '#adadad',
  				'500': '#999',
  				'600': '#616161',
  				'700': '#292929'
  			},
  			danger: {
  				'100': '#fdefee',
  				'300': '#f5ada8',
  				'500': '#d52b1e'
  			},
  			success: {
  				'100': '#ebf8f1',
  				'300': '#86d5ab',
  				'500': '#008842'
  			},
  			warning: {
  				'100': '#fffbe7',
  				'500': '#ffd710'
  			},
  			info: {
  				'500': '#365ff0'
  			},
  			blue: {
  				'500': '#4f75ff',
  				'600': '#0030dc'
  			},
  			'light-blue': {
  				'500': '#7cf5ff',
  				'600': '#0cd'
  			},
  			violet: {
  				'200': '#9740ff',
  				'300': '#8a3cd3',
  				'500': '#535484',
  				'600': '#71269e'
  			},
  			red: {
  				'300': '#f0206c',
  				'800': '#9f1f82'
  			},
  			'on-surface-text': '#5b5c8c',
  			shadow: '#3f3f3f26',
  			'bg-backdrop': '#00000060',
  			transparent: 'transparent',
  			disabled: '#ddd'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
