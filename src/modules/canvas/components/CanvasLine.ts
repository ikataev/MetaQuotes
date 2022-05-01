import {IPoint} from "../interfaces/IPoint"

export class CanvasLine {
	private readonly context: CanvasRenderingContext2D

	private start: IPoint
	private end: IPoint

	constructor(context: CanvasRenderingContext2D, start: IPoint, end: IPoint) {
		this.context = context
		this.setCoordinates(start, end)
	}

	setCoordinates(start: IPoint, end: IPoint) {
		this.start = start
		this.end = end
	}

	draw() {
		const context = this.context

		context.beginPath()
		context.moveTo(this.start.x, this.start.y)
		context.lineTo(this.end.x, this.end.y)
		context.stroke()
	}
}