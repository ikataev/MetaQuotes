import {CanvasObject} from './CanvasObject'

export abstract class CanvasContainer extends CanvasObject {
    protected halfWidth: number
    protected halfHeight: number

    constructor(
        context: CanvasRenderingContext2D,
        x: number, y: number,
        protected width: number,
        protected height: number,
    ) {
        super(context, x, y)

        this.halfWidth = width / 2
        this.halfHeight = height / 2
    }
}