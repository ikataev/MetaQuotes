import {AXIS_LABEL_OFFSET, HALF_VERTICAL_AXIS_POINT_DASH_SIZE} from '../../../canvas/constants'
import {CanvasLine} from '../CanvasLine'
import {CanvasObject} from '../CanvasObject'
import {CanvasYAxisLabel} from './CanvasYAxisLabel'

export class CanvasYAxisPoint extends CanvasObject {
    static drawStatic(context: CanvasRenderingContext2D, x: number, y: number, label: string) {
        CanvasLine.drawStatic(context,
            Math.floor(x - HALF_VERTICAL_AXIS_POINT_DASH_SIZE),
            Math.floor(y),
            Math.floor(x + HALF_VERTICAL_AXIS_POINT_DASH_SIZE),
            Math.floor(y),
        )

        CanvasYAxisLabel.drawStatic(
            context,
            Math.floor(x - HALF_VERTICAL_AXIS_POINT_DASH_SIZE - AXIS_LABEL_OFFSET),
            Math.floor(y),
            label,
        )
    }

    draw(label: string) {
        CanvasYAxisPoint.drawStatic(
            this.context,
            this.x,
            this.y,
            label,
        )
    }
}