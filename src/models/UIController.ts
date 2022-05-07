import {ServiceMode, UIModel} from "./UIModel"
import {provider} from "../modules/Providers"
import {CanvasProvider} from "../modules/canvas/CanvasProvider"
import {CanvasController} from "./CanvasController"
import {DropdownSetValuesCallback} from "../components/dropdown/Dropdown"

export class UIController {
    private canvasController: CanvasController

    private _setStartDropdownCallback: DropdownSetValuesCallback
    private _setEndDropdownCallback: DropdownSetValuesCallback

    constructor(private uiModel: UIModel) {}

    async init() {
        await this.onTemperatureButtonClicked()
    }

    async onTemperatureButtonClicked() {
        console.info("[UiController] onTemperatureButtonClicked")
        this.uiModel.setMode(ServiceMode.TEMPERATURE)

        const {records, records1, years, startYear, endYear} = await provider(this.uiModel.mode)

        this.uiModel.setYears(years)
        this.uiModel.setStartYear(startYear)
        this.uiModel.setEndYear(endYear)

        // this.canvasProvider.setRecords(records, startYear, endYear)
        // this.canvasProvider.setRecords1(records1)
        // this.canvasProvider.draw()

        this.canvasController.setRecords(records1)
        this.canvasController.draw()

        this.updateDropdowns()
    }

    async onPrecipitationButtonClicked() {
        console.info("[UiController] onPrecipitationButtonClicked")
    }

    async onStartYearChanged(startYear: number) {
        console.info("[UiController] onStartYearChanged", startYear)
        this.uiModel.setStartYear(startYear)
        this.updateDropdowns()
    }

    async onEndYearChanged(endYear: number) {
        console.info("[UiController] onEndYearChanged", endYear)
        this.uiModel.setEndYear(endYear)
        this.updateDropdowns()
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

    private updateDropdowns() {
        this._setStartDropdownCallback(this.uiModel.startYears, this.uiModel.startYear)
        this._setEndDropdownCallback(this.uiModel.endYears, this.uiModel.endYear)
    }
}
