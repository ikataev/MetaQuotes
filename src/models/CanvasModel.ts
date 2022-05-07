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
    private _canvasWidth: number
    private _canvasHeight: number

    private _halfCanvasWidth: number
    private _halfCanvasHeight: number

    private _xAxis: AxisCoordinates
    private _xAxisValues: AxisValue[]

    private _yAxis: AxisCoordinates
    private _yAxisValues: AxisValue[]

    get canvasWidth(): number {
        return this._canvasWidth
    }

    get canvasHeight(): number {
        return this._canvasHeight
    }

    get halfCanvasWidth(): number {
        return this._halfCanvasWidth
    }

    get halfCanvasHeight(): number {
        return this._halfCanvasHeight
    }

    get xAxis(): AxisCoordinates {
        return this._xAxis
    }

    get xAxisValues(): AxisValue[] {
        return this._xAxisValues
    }

    get yAxis(): AxisCoordinates {
        return this._yAxis
    }

    get yAxisValues(): AxisValue[] {
        return this._yAxisValues
    }

    setSize(width: number, height: number) {
        this._canvasWidth = width
        this._canvasHeight = height

        this._halfCanvasWidth = width / 2
        this._halfCanvasHeight = height / 2
    }

    setXAxisCoordinates(coordinates: AxisCoordinates) {
        this._xAxis = coordinates
    }

    setYAxisCoordinates(coordinates: AxisCoordinates) {
        this._yAxis = coordinates
    }

    setXAxisValues(axisValues: AxisValue[]) {
        this._xAxisValues = axisValues
    }

    setYAxisValues(axisValues: AxisValue[]) {
        this._yAxisValues = axisValues
    }
}
