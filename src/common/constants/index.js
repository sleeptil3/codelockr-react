export const BASE_URL = "https://codelockr-api.herokuapp.com"
// const export BASE_URL = 'http://localhost:3030'

export const INITIAL_APP_STATE = {
	showRegistration: false,
	loggedIn: false,
	isAdmin: false,
	firstName: "",
	lastName: "",
	username: null,
	token: null,
}

export const EMAIL_REGEX =
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

export const CUSTOMER_STORIES = [
	{
		name: "Brian S.",
		review: "🧙🏽‍♀️ This is proFESH! So many good little features.",
		link: "https://www.brianpstewart.com/",
	},
	{
		name: "Tyler C.",
		review: "THIS. I need this in my life. Such a great idea. AND A SOCIAL ASPECT!",
		link: "",
	},
	{
		name: "Drew Wilson",
		review: "Love this concept. I’ll be using it for all my run commands.",
		link: "",
	},
	{
		name: "Mark R.",
		review: "This is a great idea. So dope.",
		link: "",
	},
	{
		name: "Arthur B.",
		review: "🐐",
		link: "https://www.arthurbernierjr.com/",
	},
	{
		name: "Bunmee V.",
		review: "Wow this is really nice and useful. A great idea!",
		link: "",
	},
	{
		name: "Kristen P.",
		review: "Yeah, I want to use this. LOVE!",
		link: "",
	},
	{
		name: "Evan J.",
		review: "Incredibly useful. This is awesome!",
		link: "",
	},
]
