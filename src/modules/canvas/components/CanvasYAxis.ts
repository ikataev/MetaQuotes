import {CanvasContainer} from './CanvasContainer'
import {CanvasLine} from './CanvasLine'
import {CanvasYAxisPoint} from './yAxis/CanvasYAxisPoint'

export class CanvasYAxis extends CanvasContainer {
    private axisCount = 5

    private lineVisual: CanvasLine

    private minValueVisual: CanvasYAxisPoint
    private maxValueVisual: CanvasYAxisPoint

    constructor(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
        super(context, x, y, width, height)

        this.lineVisual = new CanvasLine(context, x, y, x, y + height)

        this.maxValueVisual = new CanvasYAxisPoint(context, x, y)
        this.minValueVisual = new CanvasYAxisPoint(context, x, y + height)
    }

    setAxisCount(count: number) {
        this.axisCount = count
    }

    draw(minValue: number, maxValue: number) {
        const intermediateAxis = this.axisCount - 1
        const valueStep = (maxValue - minValue) / intermediateAxis
        const yStep = this.height / intermediateAxis

        let value = maxValue
        let yPosition = this.y

        this.lineVisual.draw()

        for (let index = 0; index < intermediateAxis - 1; index++) {
            yPosition += yStep
            value -= valueStep

            CanvasYAxisPoint.drawStatic(this.context, this.x, yPosition, Math.round(value).toString())
        }

        this.maxValueVisual.draw(maxValue.toString())
        this.minValueVisual.draw(minValue.toString())
    }

}