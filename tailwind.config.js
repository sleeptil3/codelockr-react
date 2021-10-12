module.exports = {
	purge: {
		enable: true,
		content: [
			'./src/*.js',
			'./src/**/*.js',
			'./src/**/**/*.js',
			'./src/**/**/**/*.js',
			'./public/index.html',
			'./src/index.css'
		]
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			'redHat': ['"Red Hat Display"', 'sans-serif'],
			'mono': ['Oxygen Mono', 'monospace']
		},
		fontWeight: {
			thin: 400,
			light: 400,
			normal: 500,
			medium: 500,
			semibold: 500,
			bold: 700,
			extrabold: 700,
			black: 900,
		},
		extend: {
			colors: {
				'darkBlue': '#0B114A',
			}
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class',
		}),
	],
}