import {Layout} from './components/Layout'
import {CanvasController} from './modules/canvas/CanvasController'
import {CanvasModel} from './modules/canvas/CanvasModel'
import {UIController} from './modules/ui/UIController'
import {UIModel} from './modules/ui/UIModel'
import './style.less'

const uiModel = new UIModel()
const uiController = new UIController(uiModel)

const {component, canvas, setStartDropdownValues, setEndDropdownValues} = Layout(
    uiController.onTemperatureButtonClicked.bind(uiController),
    uiController.onPrecipitationButtonClicked.bind(uiController),
    uiController.onStartYearChanged.bind(uiController),
    uiController.onEndYearChanged.bind(uiController),
)

const canvasModel = new CanvasModel()
const canvasController = new CanvasController(canvasModel, canvas)

uiController.setCanvasController(canvasController)
uiController.setStartDropdownCallback(setStartDropdownValues)
uiController.setEndDropdownCallback(setEndDropdownValues)

document.getElementsByTagName('body')[0].appendChild(component)

uiController.init()
