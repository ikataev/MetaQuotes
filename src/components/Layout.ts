import {Caption} from "./caption/Caption"
import {Button} from "./button/Button"
import {Dropdown} from "./dropdown/Dropdown"
import Style from "./Layout.less"

const tpl = `
	<div class="layout">
		<div class="layout_caption" id="caption"></div>
		
		<div class="layout_container">
			<div id="temperature-button"></div>
			<div id="precipitation-button"></div>
			
			<div id="start-dropdown"></div>
			<div id="end-dropdown"></div>
		</div>
	
	</div>
`

export const Layout = (
	onTemperatureButtonClicked: () => void,
	onPrecipitationButtonClicked: () => void,
) => {
	const caption = Caption('Weather service archive')
	const temperatureButton = Button('Temperature', onTemperatureButtonClicked)
	const precipitationButton = Button('Precipitation', onPrecipitationButtonClicked)
	const startDropdown = Dropdown([1, 2, 3], 2)
	const endDropdown = Dropdown(['q', 'w', 'e'], 'e')

	const layout = document.createElement('div')

	layout.innerHTML = tpl

	console.log(Style)

	layout.querySelector('#caption').replaceWith(caption)
	layout.querySelector('#temperature-button').replaceWith(temperatureButton)
	layout.querySelector('#precipitation-button').replaceWith(precipitationButton)
	layout.querySelector('#start-dropdown').replaceWith(startDropdown)
	layout.querySelector('#end-dropdown').replaceWith(endDropdown)

	return layout
}