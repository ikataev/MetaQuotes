import * as Style from "./Canvas.less"

export const Canvas = (id: string, width: number, height: number): HTMLCanvasElement => {
	const canvas = document.createElement('canvas')

	canvas.id = id
	canvas.width = width
	canvas.height = height
	canvas.className = Style.canvas

	return canvas
}