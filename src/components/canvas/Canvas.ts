export const Canvas = (id: string, width: number, height: number): HTMLCanvasElement => {
	const canvas = document.createElement('canvas')

	canvas.id = id
	canvas.width = width
	canvas.height = height

	return canvas
}