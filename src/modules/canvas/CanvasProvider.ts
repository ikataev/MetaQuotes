import {Record, Records} from "../Providers"
import {CanvasLine} from "./components/CanvasLine"
import {draw} from "./components/canvas-graph/CanvasGraph"

const OFFSET = 20

export class CanvasProvider {
	private canvas: HTMLCanvasElement
	private context: CanvasRenderingContext2D
	private canvasWidth: number
	private canvasHeight: number

	private records: Record[]
	private records1: Records
	private startYear: number
	private endYear: number

	private xLine: CanvasLine
	private yLine: CanvasLine

	setCanvas(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.context = canvas.getContext('2d')
		this.canvasWidth = canvas.width
		this.canvasHeight = canvas.height

		// this.xLine = new CanvasLine(this.context, {x: OFFSET, y: this.canvasHeight - OFFSET}, {x: this.canvasWidth - OFFSET, y: this.canvasHeight - OFFSET})
		this.xLine = new CanvasLine(this.context, {x: 0, y: this.canvasHeight / 2}, {x: this.canvasWidth, y: this.canvasHeight / 2})
		this.yLine = new CanvasLine(this.context, {x: OFFSET, y: this.canvasHeight - OFFSET}, {x: OFFSET, y: OFFSET})
	}

	setRecords(records: Record[], startYear: number, endYear: number) {
		this.records = records
		this.startYear = startYear
		this.endYear = endYear
	}

	setRecords1(records1: Records) {
		this.records1 = records1
	}

	setStartYear(startYear: number) {
		this.startYear = startYear
	}

	setEndYear(endYear: number) {
		this.endYear = endYear
	}

	draw() {
		this.context.fillStyle = '#ffffff'
		this.context.rect(0, 0, this.canvasWidth, this.canvasWidth)
		this.context.fill()

		this.xLine.draw()
		this.yLine.draw()

		const records = {}

		Object.keys(this.records1).map(yearKey => {
			const yearKeyAsNumber = parseInt(yearKey)

			if (yearKeyAsNumber >= this.startYear && yearKeyAsNumber <= this.endYear) {
				// @ts-ignore
				records[yearKey] = this.records1[yearKey]
			}
		})

		draw(this.context, records)
	}

}