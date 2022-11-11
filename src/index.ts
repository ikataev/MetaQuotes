import {Layout} from './components/Layout'
import {CanvasController} from './modules/canvas/CanvasController'
import {DataProvider} from './modules/data/DataProvider'
import {IndexedDBHelper} from './modules/indexed-db/IndexedDBHelper'
import {IndexedDBProvider} from './modules/indexed-db/IndexedDBProvider'
import {UIController} from './modules/ui/UIController'
import {UIModel} from './modules/ui/UIModel'
import './style.less'

const dbProvider = new IndexedDBProvider('MetaQuotes').onUpgradeNeeded(IndexedDBHelper.onUpgradeNeeded)

const dataProvider = new DataProvider(dbProvider)

const uiModel = new UIModel()
const uiController = new UIController(uiModel, dataProvider)

const {component, canvas, setStartDropdownValues, setEndDropdownValues} = Layout(
    uiController.onTemperatureButtonClicked.bind(uiController),
    uiController.onPrecipitationButtonClicked.bind(uiController),
    uiController.onStartYearChanged.bind(uiController),
    uiController.onEndYearChanged.bind(uiController),
)

const canvasController = new CanvasController(canvas, dataProvider)

uiController.setCanvasController(canvasController)
uiController.setStartDropdownCallback(setStartDropdownValues)
uiController.setEndDropdownCallback(setEndDropdownValues)

document.body.appendChild(component)

uiController.init()