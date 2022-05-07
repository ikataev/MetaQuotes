import {IPoint} from './interfaces/IPoint'

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

    get canvasWidth(): number {
        return this._canvasWidth
    }

    private _canvasHeight: number

    get canvasHeight(): number {
        return this._canvasHeight
    }

    private _halfCanvasWidth: number

    get halfCanvasWidth(): number {
        return this._halfCanvasWidth
    }

    private _halfCanvasHeight: number

    get halfCanvasHeight(): number {
        return this._halfCanvasHeight
    }

    private _xAxis: AxisCoordinates

    get xAxis(): AxisCoordinates {
        return this._xAxis
    }

    private _xAxisValues: AxisValue[]

    get xAxisValues(): AxisValue[] {
        return this._xAxisValues
    }

    private _yAxis: AxisCoordinates

    get yAxis(): AxisCoordinates {
        return this._yAxis
    }

    private _yAxisValues: AxisValue[]

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
