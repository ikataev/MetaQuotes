import {AXIS_LABEL_OFFSET, VERTICAL_AXIS_POINT_DASH_SIZE} from '../constants'
import {IPoint} from '../interfaces/IPoint'
import {CanvasLine} from './CanvasLine'
import {CanvasObject} from './CanvasObject'

export class CanvasYAxisPoint extends CanvasObject {
    private readonly label: string
    private readonly crossPoint: IPoint
    private readonly lineVisual: CanvasLine
    private readonly needToDrawLine: boolean

    constructor(context: CanvasRenderingContext2D, label: string, position: IPoint, needToDrawLine = true) {
        super(context)
        this.label = label
        this.crossPoint = position
        this.needToDrawLine = needToDrawLine
        this.lineVisual = new CanvasLine(
            context,
            {
                x: position.x - VERTICAL_AXIS_POINT_DASH_SIZE / 2,
                y: position.y,
            },
            {
                x: position.x + VERTICAL_AXIS_POINT_DASH_SIZE / 2,
                y: position.y,
            },
        )
    }

    draw() {
        if (this.needToDrawLine) {
            this.lineVisual.draw()
        }

        this.context.save()
        this.context.textBaseline = 'middle'
        this.context.font = '16px Arial'

        const labelWidth = Math.ceil(this.context.measureText(this.label).width)

        this.context.fillText(
            this.label,
            Math.floor(this.crossPoint.x - labelWidth - (VERTICAL_AXIS_POINT_DASH_SIZE - AXIS_LABEL_OFFSET)),
            Math.floor(this.crossPoint.y),
            labelWidth,
        )

        this.context.restore()
    }
}
