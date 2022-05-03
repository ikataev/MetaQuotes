import "./style.less"

import {Layout} from "./components/Layout"
import {CanvasProvider} from "./modules/canvas/CanvasProvider"
import {UIModel} from "./models/UIModel"
import {UIController} from "./models/UIController"
import {CanvasModel} from "./models/CanvasModel";
import {CanvasController} from "./models/CanvasController";

const uiModel = new UIModel()
const uiController = new UIController(uiModel)

const {
	layout,
	setStartDropdownValues: setStartDropdownCallback,
	setEndDropdownValues: setEndDropdownCallback,
	canvas
} = Layout(
	uiController.onTemperatureButtonClicked.bind(uiController),
	uiController.onPrecipitationButtonClicked.bind(uiController),
	uiController.onStartYearChanged.bind(uiController),
	uiController.onEndYearChanged.bind(uiController),

	// async () => {
	// 	const {records, records1, years, startYear, endYear} = await provider(JsonType.TEMPERATURE)
	//
	// 	setStartDropdownValues(years, startYear)
	// 	setEndDropdownValues(years, endYear)
	//
	// 	canvasProvider.setRecords(records, startYear, endYear)
	// 	canvasProvider.setRecords1(records1)
	// 	canvasProvider.draw()
	// },


	// async (value: string) => {
	// 	console.log('Start changed', value)
	//
	// 	const {records, records1, years, startYear, endYear} = await provider(ServiceMode.TEMPERATURE)
	//
	// 	canvasProvider.setRecords(records, Number(value), endYear)
	// 	canvasProvider.setRecords1(records1)
	// 	canvasProvider.draw()
	// },
	// (value: string) => {
	// 	console.log('End changed', value)
	// },
)

const canvasModel = new CanvasModel()
const canvasController = new CanvasController(canvasModel, canvas)

// uiController.setCanvasProvider(new CanvasProvider(canvas))
uiController.setCanvasController(canvasController)
uiController.setStartDropdownCallback(setStartDropdownCallback)
uiController.setEndDropdownCallback(setEndDropdownCallback)

document.getElementsByTagName('body')[0].appendChild(layout)

uiController.init()