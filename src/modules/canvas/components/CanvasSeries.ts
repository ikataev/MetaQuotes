import {CanvasContainer} from './CanvasContainer'

type Series = {
    values: number[]
    minValue: number
    maxValue: number
}

export class CanvasSeries extends CanvasContainer {

    draw(series: Series) {
        const context = this.context
        const values = series.values
        const minValue = series.minValue
        const maxValue = series.maxValue

        const xStep = this.width / values.length

        let xPosition = this.x

        context.save()
        context.beginPath()
        context.strokeStyle = '#aaaaaa'

        values.forEach((value, index) => {
            const relative = (value - minValue) / (maxValue - minValue)
            const yPosition = this.height - (this.height * relative) + this.y

            if (!index) {
                context.moveTo(xPosition, yPosition)
            } else {
                context.lineTo(xPosition, yPosition)
            }

            xPosition += xStep
        })

        context.stroke()
        context.restore()
    }

}