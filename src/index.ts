import "./style.less"
import {Layout} from "./components/Layout"
import {provider} from "./modules/Providers"
import {JsonType} from "./modules/utils/JSONLoader"

const {layout, setStartDropdownValues, setEndDropdownValues, canvas} = Layout(
	async () => {
		const {years, startYear, endYear} = await provider(JsonType.TEMPERATURE)

		setStartDropdownValues(years, startYear)
		setEndDropdownValues(years, endYear)
	},
	() => {
		console.log('Precipitation clicked')
	},
	(value: string) => {
		console.log('Start changed', value)
	},
	(value: string) => {
		console.log('End changed', value)
	},
)

document.getElementsByTagName('body')[0].appendChild(layout)