import {IPoint} from "../modules/canvas/interfaces/IPoint"

type AxisCoordinates = {
	start: IPoint
	end: IPoint
}

type AxisValue = {
	point: IPoint
	value: string
}

export class CanvasModel {

	private xAxis: AxisCoordinates
	private xAxisValues: AxisValue[]

	private yAxis: AxisCoordinates
	private yAxisValues: AxisValue[]

	setXAxisCoordinates(coordinates: AxisCoordinates) {
		this.xAxis = coordinates
	}

	setYAxisCoordinates(coordinates: AxisCoordinates) {
		this.yAxis = coordinates
	}

	setXAxisValues(axisValues: AxisValue[]) {
		this.xAxisValues = axisValues
	}

	setYAxisValues(axisValues: AxisValue[]) {
		this.yAxisValues = axisValues
	}

}