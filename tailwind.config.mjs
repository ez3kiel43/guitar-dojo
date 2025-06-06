/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				sand: '#E7D7C1',
				navy: '#223146',
				red: '#C1292E',
			},
			fontFamily: {
				serif: 'var(--font-solway)',
			},
		},
	},
	plugins: [],
};
