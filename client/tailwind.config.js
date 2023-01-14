/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx}',
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			fontFamily: {
				cambon: ['Cambon'],
				avenirLT: ['AvenirLT'],
			},
			backgroundImage: {
				main: 'url(../public/images/backgrounds/home.jpg)',
			},
			keyframes: {
				buttonPop: {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(0.9)' },
				},
			},
			animation: {
				buttonPop: 'buttonPop 0.2s ease-in-out',
			},
			width: {
				112: '28rem',
				128: '32rem',
				144: '38rem',
				160: '42rem',
				176: '48rem',
				192: '52rem',
			},
			height: {
				112: '28rem',
				128: '32rem',
				144: '38rem',
				160: '42rem',
				176: '48rem',
				192: '52rem',
			},
			colors: {
				primary: '#694D75',
				'primary-darker': '#9F2F19',
				'on-primary-light': '#FFFFFF',
				'on-primary': '#FFFFFF',
				secondary: '#DBBEA1',
				'on-secondary': '#FFFFFF',
				'secondary-transparent': '#e1625314',
				'secondary-transparent-darker': '#9F2F1914',
				'on-secondary-transparent': '#E16253',
				background: '#A37B73',
				'on-background': '#003938',
				surface: '#F8F4F0',
				'surface-dark': '#EEE8E2',
				'on-surface': '#003938',
				'on-surface-dark': '#003938',
				gray: '#BBB6B6',
				'light-gray': '#E2DFDF',
				'dark-gray': '#989292',
				'heavy-gray': '#66676E',
				'on-gray': '#FFFFFF',
				'on-dark-gray': '#FFFFFF',
				'on-heavy-gray': '#FFFFFF',
				error: '#ff3333',
				succes: '#4BB543',
			},
			gridTemplateColumns: {
				field: 'repeat(2, minmax(0, 1fr))',
			},
			gridTemplateRows: {
				skill: '0.15fr 0.25fr 0.2fr 0.25fr 0.15fr',
			},
		},
	},
	plugins: [],
}
