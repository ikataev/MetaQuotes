import "./style.less"
import {Layout} from "./components/Layout"
import {provider} from "./modules/Providers"
import {JsonType} from "./modules/utils/JSONLoader"
import {CanvasProvider} from "./modules/canvas/CanvasProvider"

const canvasProvider = new CanvasProvider()

const {layout, setStartDropdownValues, setEndDropdownValues, canvas} = Layout(
	async () => {
		const {records, years, startYear, endYear} = await provider(JsonType.TEMPERATURE)

		setStartDropdownValues(years, startYear)
		setEndDropdownValues(years, endYear)

		canvasProvider.setRecords(records, startYear, endYear)
		canvasProvider.draw()
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

canvasProvider.setCanvas(canvas)

document.getElementsByTagName('body')[0].appendChild(layout)