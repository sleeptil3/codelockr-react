module.exports = {
	content: [
		"./src/*.js",
		"./src/components/*.js",
		"./src/components/forms/*.js",
		"./src/containers/*.js",
		"./src/containers/**/*.js",
		"./src/containers/**/**/*.js",
		"./public/index.html",
	],
	theme: {
		fontFamily: {
			redHat: ['"Red Hat Display"', "sans-serif"],
			mono: ["Oxygen Mono", "monospace"],
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
				darkBlue: "#0B114A",
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms")({
			strategy: "class",
		}),
	],
}
