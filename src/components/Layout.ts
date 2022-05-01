import {Caption} from "./caption/Caption"
import {Button} from "./button/Button"
import {Dropdown} from "./dropdown/Dropdown"
import * as Style from "./Layout.less"
import {Canvas} from "./canvas/Canvas";

const tpl = `
	<div id="caption"></div>
	
	<div class="${Style.flexRow}">
		<div class="${Style.flexColumn}">
			<div id="temperature-button"></div>
			<div id="precipitation-button"></div>
		</div>
		
		<div class="${Style.flexColumn}">
			<div class="${Style.flexRow}">
				<div id="start-dropdown"></div>
				<div id="end-dropdown"></div>			
			</div>
			
			<div id="canvas"></div>	
		</div>
	</div>	
`

export const Layout = (
	onTemperatureButtonClicked: () => void,
	onPrecipitationButtonClicked: () => void,
	onStartDropdownChanged: (value: string) => void,
	onEndDropdownChanged: (value: string) => void,
) => {
	const caption = Caption('Weather service archive')
	const temperatureButton = Button('Temperature', onTemperatureButtonClicked)
	const precipitationButton = Button('Precipitation', onPrecipitationButtonClicked)
	const {component: startDropdown, setValues: setStartDropdownValues} = Dropdown(onStartDropdownChanged)
	const {component: endDropdown, setValues: setEndDropdownValues} = Dropdown(onEndDropdownChanged)
	const canvas = Canvas('canvas', 400, 265)

	const layout = document.createElement('div')

	layout.innerHTML = tpl
	layout.className = `${Style.flexColumn} ${Style.layout}`

	layout.querySelector('#caption').replaceWith(caption)
	layout.querySelector('#temperature-button').replaceWith(temperatureButton)
	layout.querySelector('#precipitation-button').replaceWith(precipitationButton)
	layout.querySelector('#start-dropdown').replaceWith(startDropdown)
	layout.querySelector('#end-dropdown').replaceWith(endDropdown)
	layout.querySelector('#canvas').replaceWith(canvas)

	return {layout, setStartDropdownValues, setEndDropdownValues, canvas}
}