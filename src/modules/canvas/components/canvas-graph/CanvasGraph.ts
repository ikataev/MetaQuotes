import {Records} from "../../../Providers"

const OFFSET = 50

const median = (values: number[]) => {
	values.sort((a, b) => a - b)

	const half = Math.floor(values.length / 2)

	if (values.length % 2) {
		return values[half]
	}

	return (values[half - 1] + values[half]) / 2.0
}

// export function draw(context: CanvasRenderingContext2D, records: Records, points = 11) {
export function draw(context: CanvasRenderingContext2D, records1: Records, points = 11) {
	// console.log(records1)

	// const length = records.length
	// const chunkSize = Math.ceil(length / points)

	const canvas = context.canvas
	const canvasCoordinates = {
		width: canvas.width,
		halfWidth: canvas.width / 2,
		height: canvas.height,
		halfHeight: canvas.height / 2
	}

	// const xOffset = canvasCoordinates.width / points
	// const halfXOffset = xOffset / 2

	// console.log('draw', canvasCoordinates.width, canvasCoordinates.height)
	//

	let xOffset = 0

	context.beginPath()

	Object.keys(records1).forEach((yearKey: string) => {
		const months = records1[yearKey]

		Object.keys(months).forEach((monthKey: string) => {
			const days = records1[yearKey][monthKey]

			const values = days.map(day => day.value)
			const maxValue = Math.max(...values)
			const minValue = Math.min(...values)
			const medianValue = median(values)

			context.lineTo(xOffset, canvasCoordinates.halfHeight - medianValue)

			console.log(maxValue, minValue, medianValue)

			xOffset += 2
		})
	})

	// // context.moveTo(0, canvasCoordinates.halfHeight)
	//
	// // @ts-ignore
	// window['__getValues'] = () => {
	// 	let str = ''
	//
	// 	records.forEach(record => {
	// 		str += `${record.timestamp}\t${record.value}\n`
	// 	})
	//
	// 	console.log(str)
	// 	// @ts-ignore
	// 	window['__values'] = str
	// }
	//
	// for (let chunkIndex = 0, loopIndex = 0; chunkIndex < length; chunkIndex += chunkSize, loopIndex++) {
	// 	const chunk = records.slice(chunkIndex, chunkIndex + chunkSize)
	// 	const values = chunk.map(c => c.value)
	// 	const maxValue = Math.max(...values)
	// 	const minValue = Math.min(...values)
	// 	const medianValue = median(values)
	//
	// 	console.log(length, chunk.length, maxValue, minValue, medianValue)
	//
	// 	switch (loopIndex) {
	// 		case 0: {
	// 			context.moveTo(0, canvasCoordinates.halfHeight + medianValue)
	// 			break
	// 		}
	//
	// 		default:
	// 			context.lineTo(xOffset * loopIndex, canvasCoordinates.halfHeight - maxValue)
	// 	}
	//
	// 	// context.quadraticCurveTo(
	// 	// 	xOffset * loopIndex - halfXOffset, canvasCoordinates.halfHeight + maxValue,
	// 	// 	xOffset * loopIndex, canvasCoordinates.halfHeight + medianValue
	// 	// )
	//
	// 	// switch (chunkIndex) {
	// 		// case 0: {
	// 		// 	context.quadraticCurveTo(
	// 		// 		xOffset * loopIndex, canvasCoordinates.halfHeight + maxValue,
	// 		// 		xOffset * loopIndex, canvasCoordinates.halfHeight + medianValue
	// 		// 	)
	// 			// context.bezierCurveTo(
	// 			// 	xOffset, canvasCoordinates.halfHeight + minValue,
	// 			// 	xOffset, canvasCoordinates.halfHeight - maxValue,
	// 			// 	xOffset, canvasCoordinates.halfHeight
	// 			// )
	// 		// }
	// 	// }
	// }
	//
	context.stroke()
}