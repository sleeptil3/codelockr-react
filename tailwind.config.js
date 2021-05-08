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
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
