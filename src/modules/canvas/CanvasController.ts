import {DataProvider} from '../data/DataProvider'
import {Records} from '../data/DataTransformer'
import {IUIModelReadonly} from '../ui/UIModel'
import {CanvasModel} from './CanvasModel'
import {CanvasAxisValue} from './components/CanvasAxisValue'
import {CanvasLine} from './components/CanvasLine'

const OFFSET = 24

export class CanvasController {
    private readonly canvasModel: CanvasModel
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D

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

    // Instead of EventBus implementation, will call method directly
    async onUIChanged(uiModel: IUIModelReadonly) {
        console.info('[CanvasController] onUIChanged')
        const {transformedRecords} = await DataProvider.get(uiModel.mode)
        const {records} = transformedRecords

        this.setRecords(records)
        this.draw()
    }

    setRecords(records: Records) {
        this.records = records

        this.initXAxisVisuals()
        this.initYAxisVisuals()
    }

    draw() {
        this.context.clearRect(0, 0, this.canvasModel.canvasWidth, this.canvasModel.canvasHeight)

        this.xAxisVisual.draw()

        this.yAxisVisual.draw()
        this.yAxisValuesVisual.forEach((visual) => visual.draw())
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
            }
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
            }
        )

        this.yAxisValuesVisual = [
            new CanvasAxisValue(
                this.context,
                {
                    x: OFFSET,
                    y: this.canvasModel.halfCanvasHeight,
                },
                '9999',
            ),
        ]
    }
}
