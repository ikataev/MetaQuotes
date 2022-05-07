import {AXIS_LABEL_OFFSET, VERTICAL_AXIS_POINT_DASH_SIZE} from '../../constants'
import {IPoint} from '../../interfaces/IPoint'
import {CanvasObject} from '../CanvasObject'

export class CanvasYAxisText extends CanvasObject {
    constructor(context: CanvasRenderingContext2D, private label: string, private position: IPoint) {
        super(context)
    }

    draw() {
        this.context.save()
        this.context.textBaseline = 'middle'
        this.context.font = '16px Arial'

        const labelWidth = Math.ceil(this.context.measureText(this.label).width)

        this.context.fillText(
            this.label,
            Math.floor(this.position.x - labelWidth - (VERTICAL_AXIS_POINT_DASH_SIZE - AXIS_LABEL_OFFSET)),
            Math.floor(this.position.y),
            labelWidth,
        )

        this.context.restore()
    }
}
