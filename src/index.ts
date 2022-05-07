import "./style.less"

import {Layout} from "./components/Layout"
import {UIModel} from "./models/UIModel"
import {UIController} from "./models/UIController"
import {CanvasModel} from "./models/CanvasModel"
import {CanvasController} from "./models/CanvasController"

const uiModel = new UIModel()
const uiController = new UIController(uiModel)

const {component, canvas, setStartDropdownValues, setEndDropdownValues} = Layout(
    uiController.onTemperatureButtonClicked.bind(uiController),
    uiController.onPrecipitationButtonClicked.bind(uiController),
    uiController.onStartYearChanged.bind(uiController),
    uiController.onEndYearChanged.bind(uiController)
)

const canvasModel = new CanvasModel()
const canvasController = new CanvasController(canvasModel, canvas)

uiController.setCanvasController(canvasController)
uiController.setStartDropdownCallback(setStartDropdownValues)
uiController.setEndDropdownCallback(setEndDropdownValues)

document.getElementsByTagName("body")[0].appendChild(component)

uiController.init()
