import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		backgroundImage:{
			hero:"url('/images/hero-background.png')",
		},
  		colors: {
			dark:{
1: '#1c1f2e',
2:'#161925'
			},
			blue:{
				1:'#0e78f9'
			},
			sky:{
				1:'#c9ddff'
			},
		}
  			
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
