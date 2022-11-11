import {CanvasObject} from './CanvasObject'

export class CanvasLine extends CanvasObject {

    constructor(context: CanvasRenderingContext2D, x: number, y: number, private x1: number, private y1: number) {
        super(context, x, y)
    }

    static drawStatic(context: CanvasRenderingContext2D, x: number, y: number, x1: number, y1: number) {
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x1, y1)
        context.stroke()
    }

    draw() {
        CanvasLine.drawStatic(this.context, this.x, this.y, this.x1, this.y1)
    }
}