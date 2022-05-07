import {VERTICAL_AXIS_POINT_DASH_SIZE} from '../../constants'
import {IPoint} from '../../interfaces/IPoint'
import {CanvasLine} from '../CanvasLine'
import {CanvasObject} from '../CanvasObject'
import {CanvasYAxisText} from './CanvasYAxisText'

export class CanvasYAxis extends CanvasObject {
    private readonly label: string
    private readonly position: IPoint
    private lineVisual: CanvasLine
    private textVisual: CanvasYAxisText
    private readonly needToDrawLine: boolean

    constructor(context: CanvasRenderingContext2D, label: string, position: IPoint, needToDrawLine = true) {
        super(context)
        this.label = label
        this.position = position
        this.needToDrawLine = needToDrawLine

        this.initLineVisual()
        this.initTextVisual()
    }

    draw() {
        if (this.needToDrawLine) {
            this.lineVisual.draw()
        }

        this.textVisual.draw()
    }

    private initLineVisual() {
        const position = this.position

        this.lineVisual = new CanvasLine(
            this.context,
            {
                x: Math.floor(position.x - VERTICAL_AXIS_POINT_DASH_SIZE / 2),
                y: Math.floor(position.y),
            },
            {
                x: Math.floor(position.x + VERTICAL_AXIS_POINT_DASH_SIZE / 2),
                y: Math.floor(position.y),
            },
        )
    }

    private initTextVisual() {
        this.textVisual = new CanvasYAxisText(this.context, this.label, this.position)
    }
}
