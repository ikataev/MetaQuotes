import {DropdownSetValuesCallback} from '../../components/dropdown/Dropdown'
import {CanvasController} from '../canvas/CanvasController'
import {DataProvider} from '../data/DataProvider'
import {ServiceMode, UIModel} from './UIModel'

export class UIController {
    private canvasController: CanvasController

    private _setStartDropdownCallback: DropdownSetValuesCallback
    private _setEndDropdownCallback: DropdownSetValuesCallback

    constructor(private uiModel: UIModel) {
    }

    async init() {
        await this.onTemperatureButtonClicked()
    }

    async onTemperatureButtonClicked() {
        console.info('[UiController] onTemperatureButtonClicked')
        if (this.uiModel.mode !== ServiceMode.TEMPERATURE) {
            this.uiModel.setMode(ServiceMode.TEMPERATURE)
            this.onButtonClicked()
        }
    }

    async onPrecipitationButtonClicked() {
        console.info('[UiController] onPrecipitationButtonClicked')
        if (this.uiModel.mode !== ServiceMode.PRECIPITATION) {
            this.uiModel.setMode(ServiceMode.PRECIPITATION)
            this.onButtonClicked()
        }
    }

    async onStartYearChanged(startYear: number) {
        console.info('[UiController] onStartYearChanged', startYear)
        this.uiModel.setStartYear(startYear)
        this.setDropdowns({startYear})
        this.canvasController.onUIChanged(this.uiModel)
    }

    async onEndYearChanged(endYear: number) {
        console.info('[UiController] onEndYearChanged', endYear)
        this.uiModel.setEndYear(endYear)
        this.setDropdowns({endYear})
        this.canvasController.onUIChanged(this.uiModel)
    }

    private async onButtonClicked() {
        const {transformedRecords} = await DataProvider.get(this.uiModel.mode)
        const {years, startYear, endYear} = transformedRecords

        this.uiModel.setYears(years)
        this.uiModel.setStartYear(startYear)
        this.uiModel.setEndYear(endYear)

        this.setDropdowns({startYear, endYear})

        this.canvasController.onUIChanged(this.uiModel)
    }

    private setDropdowns(year: { startYear?: number, endYear?: number }) {
        const model = this.uiModel

        this._setStartDropdownCallback(model.startYears, year.startYear || model.startYear)
        this._setEndDropdownCallback(model.endYears, year.endYear || model.endYear)
    }

    setStartDropdownCallback(callback: DropdownSetValuesCallback) {
        this._setStartDropdownCallback = callback
    }

    setEndDropdownCallback(callback: DropdownSetValuesCallback) {
        this._setEndDropdownCallback = callback
    }

    setCanvasController(controller: CanvasController) {
        this.canvasController = controller
    }
}
