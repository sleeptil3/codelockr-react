module.exports = {
	purge: {
		enabled: false,
		content: [
			'./src/**.js',
			'./src/**/*.js',
			'./src/**/**/*.js',
			'./public/index.html'
		],
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			'redHat': ['"Red Hat Display"', 'sans-serif']
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
	plugins: [],
}