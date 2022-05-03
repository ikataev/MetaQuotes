import {CanvasObject} from "./CanvasObject"
import {IPoint} from "../interfaces/IPoint"
import {CanvasLine} from "./CanvasLine";

const CROSS_SIZE = 10

export class CanvasAxisValue extends CanvasObject {
	private label: string
	private crossPoint: IPoint
	private lineVisual: CanvasLine

	constructor(context: CanvasRenderingContext2D, crossPoint: IPoint, label: string) {
		super(context)
		this.label = label
		this.crossPoint = crossPoint
		this.lineVisual = new CanvasLine(
			context,
			{
				x: crossPoint.x - CROSS_SIZE / 2,
				y: crossPoint.y,
			},
			{
				x: crossPoint.x + CROSS_SIZE / 2,
				y: crossPoint.y,
			}
		)
	}

	draw() {
		this.lineVisual.draw()
	}

}