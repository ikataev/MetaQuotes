import {CanvasObject} from '../CanvasObject'

export class CanvasYAxisLabel extends CanvasObject {
    static drawStatic(context: CanvasRenderingContext2D, x: number, y: number, label: string) {
        context.save()
        context.textBaseline = 'middle'
        context.font = '16px Arial'

        const labelWidth = Math.ceil(context.measureText(label).width)

        context.fillText(
            label,
            Math.floor(x - labelWidth),
            Math.floor(y),
            labelWidth,
        )

        context.restore()
    }

    draw(label: string) {
        CanvasYAxisLabel.drawStatic(this.context, this.x, this.y, label)
    }
}
