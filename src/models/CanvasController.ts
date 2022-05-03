import {CanvasModel} from "./CanvasModel"
import {Records} from "../modules/Providers"
import {CanvasLine} from "../modules/canvas/components/CanvasLine"
import {CanvasAxisValue} from "../modules/canvas/components/CanvasAxisValue"

const OFFSET = 24

export class CanvasController {
	private canvasModel: CanvasModel
	private canvas: HTMLCanvasElement
	private context: CanvasRenderingContext2D

	private records: Records

	private xAxisVisual: CanvasLine

	private yAxisVisual: CanvasLine
	private yAxisValuesVisual: CanvasAxisValue[]

	constructor(canvasModel: CanvasModel, canvas: HTMLCanvasElement) {
		this.canvasModel = canvasModel
		this.canvas = canvas
		this.context = canvas.getContext('2d')
		this.canvasModel.setSize(canvas.width, canvas.height)
	}

	setRecords(records: Records) {
		this.records = records

		this.initXAxisVisuals()
		this.initYAxisVisuals()
	}

	draw() {
		this.xAxisVisual.draw()

		this.yAxisVisual.draw()
		this.yAxisValuesVisual.forEach(visual => visual.draw())
	}

	private initXAxisVisuals() {
		this.xAxisVisual = new CanvasLine(
			this.context,
			{
				x: OFFSET,
				y: this.canvasModel.halfCanvasHeight,
			},
			{
				x: this.canvasModel.canvasWidth - OFFSET,
				y: this.canvasModel.halfCanvasHeight,
			},
		)
	}

	private initYAxisVisuals() {
		this.yAxisVisual = new CanvasLine(
			this.context,
			{
				x: OFFSET,
				y: OFFSET,
			},
			{
				x: OFFSET,
				y: this.canvasModel.canvasHeight - OFFSET,
			},
		)

		this.yAxisValuesVisual = [
			new CanvasAxisValue(
				this.context,
				{
					x: OFFSET,
					y: this.canvasModel.halfCanvasHeight,
				},
				'0'
			)
		]
	}
}