import {Layout} from "./components/Layout"

document.getElementsByTagName('body')[0].appendChild(Layout(
	() => {
		console.log('Temperature clicked')
	},
	() => {
		console.log('Precipitation clicked')
	}
))

console.log('Hello world')