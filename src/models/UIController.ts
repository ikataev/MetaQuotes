import {ServiceMode, UIModel} from "./UIModel"
import {provider} from "../modules/Providers"

export type setCallback = (options: Array<number>, selected: number) => void

export class UIController {

	private _setStartDropdownCallback: setCallback
	private _setEndDropdownCallback: setCallback

	constructor(private uiModel: UIModel) {
	}

	async init() {
		await this.onTemperatureButtonClicked()
	}

	async onTemperatureButtonClicked() {
		console.info('[UiController] onTemperatureButtonClicked')
		this.uiModel.setMode(ServiceMode.TEMPERATURE)

		const {records, records1, years, startYear, endYear} = await provider(this.uiModel.mode)

		this.uiModel.setYears(years)
		this.uiModel.setStartYear(startYear)
		this.uiModel.setEndYear(endYear)

		this.updateDropdowns()


		// 	const {records, records1, years, startYear, endYear} = await provider(JsonType.TEMPERATURE)
		//
		// 	setStartDropdownValues(years, startYear)
		// 	setEndDropdownValues(years, endYear)
		//
		// 	canvasProvider.setRecords(records, startYear, endYear)
		// 	canvasProvider.setRecords1(records1)
		// 	canvasProvider.draw()
		// },
	}

	async onPrecipitationButtonClicked() {
		console.info('[UiController] onPrecipitationButtonClicked')
	}

	async onStartYearChanged(startYear: number) {
		console.info('[UiController] onStartYearChanged', startYear)
		this.uiModel.setStartYear(startYear)
		this.updateDropdowns()
	}

	async onEndYearChanged(endYear: number) {
		console.info('[UiController] onEndYearChanged', endYear)
		this.uiModel.setEndYear(endYear)
		this.updateDropdowns()
	}

	setStartDropdownCallback(callback: setCallback) {
		this._setStartDropdownCallback = callback
	}

	setEndDropdownCallback(callback: setCallback) {
		this._setEndDropdownCallback = callback
	}

	private updateDropdowns() {
		this._setStartDropdownCallback(
			this.uiModel.startYears,
			this.uiModel.startYear
		)

		this._setEndDropdownCallback(
			this.uiModel.endYears,
			this.uiModel.endYear
		)
	}

}