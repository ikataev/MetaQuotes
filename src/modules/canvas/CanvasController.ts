import {DataHelper} from '../data/DataHelper'
import {DataProvider, RawRecord} from '../data/DataProvider'
import {Records} from '../data/DataTransformer'
import {IUIModelReadonly} from '../ui/UIModel'
import {CanvasModel} from './CanvasModel'
import {CanvasLine} from './components/CanvasLine'
import {CanvasYAxis} from './components/y-axis/CanvasYAxis'
import {PLOT_AXIS_OFFSET, PLOT_OFFSET, VERTICAL_AXIS_POINT_DASH_SIZE, VERTICAL_AXIS_X_POSITION} from './constants'

export class CanvasController {
    private readonly canvasModel: CanvasModel
    private readonly canvas: HTMLCanvasElement
    private readonly context: CanvasRenderingContext2D

    private records: Records
    private rawRecords: RawRecord[]

    private xAxisVisual: CanvasLine

    private yAxisVisual: CanvasLine
    private yAxisValuesVisual: CanvasYAxis[]

    constructor(canvasModel: CanvasModel, canvas: HTMLCanvasElement) {
        this.canvasModel = canvasModel
        this.canvas = canvas
        this.context = canvas.getContext('2d')
        this.canvasModel.setSize(canvas.width, canvas.height)
    }

    // Instead of EventBus implementation, will call method directly
    async onUIChanged(uiModel: IUIModelReadonly) {
        console.info('[CanvasController] onUIChanged')
        const {rawRecords, transformedRecords} = await DataProvider.get(uiModel.mode)
        const {records, minValue, maxValue} = transformedRecords
        const extractedRecords = DataHelper.extractRange(records, uiModel.startYear, uiModel.endYear)

        this.initXAxisVisual()

        this.initYAxisVisual()
        this.initYAxisPointsVisuals(minValue, maxValue)

        this.setRecords(rawRecords, extractedRecords)
        this.draw()
    }

    private setRecords(rawRecords: RawRecord[], records: Records) {
        this.records = records
        this.rawRecords = rawRecords

        // this.initXAxisVisual()
        // this.initXAxisValuesVisuals()
    }

    private draw() {
        // Clear canvas
        this.context.save()
        this.context.fillStyle = '#ffffff'
        this.context.rect(0, 0, this.canvasModel.canvasWidth, this.canvasModel.canvasHeight)
        this.context.fill()
        this.context.restore()

        this.xAxisVisual.draw()

        this.yAxisVisual.draw()
        this.yAxisValuesVisual.forEach((visual) => visual.draw())
    }

    private initXAxisVisual() {
        this.xAxisVisual = new CanvasLine(
            this.context,
            {
                x: VERTICAL_AXIS_X_POSITION + VERTICAL_AXIS_POINT_DASH_SIZE / 2,
                y: this.canvasModel.canvasHeight - PLOT_OFFSET - PLOT_AXIS_OFFSET,
            },
            {
                x: this.canvasModel.canvasWidth - PLOT_OFFSET,
                y: this.canvasModel.canvasHeight - PLOT_OFFSET - PLOT_AXIS_OFFSET,
            },
        )
    }

    private initXAxisValuesVisuals() {}

    private initYAxisVisual() {
        this.yAxisVisual = new CanvasLine(
            this.context,
            {
                x: VERTICAL_AXIS_X_POSITION,
                y: PLOT_OFFSET,
            },
            {
                x: VERTICAL_AXIS_X_POSITION,
                y: this.canvasModel.canvasHeight - PLOT_OFFSET,
            },
        )
    }

    private initYAxisPointsVisuals(minValue: number, maxValue: number) {
        const midValue = (minValue + maxValue) / 2
        const midAboveMidValue = (maxValue + midValue) / 2
        const midBelowMidValue = (minValue + midValue) / 2

        const halfCanvasHeight = this.canvasModel.halfCanvasHeight
        const midPositionOffset = (halfCanvasHeight - (PLOT_OFFSET + PLOT_AXIS_OFFSET)) / 2

        this.yAxisValuesVisual = [
            new CanvasYAxis(this.context, Math.round(maxValue).toString(), {
                x: VERTICAL_AXIS_X_POSITION,
                y: PLOT_OFFSET + PLOT_AXIS_OFFSET,
            }),
            new CanvasYAxis(this.context, Math.round(midAboveMidValue).toString(), {
                x: VERTICAL_AXIS_X_POSITION,
                y: halfCanvasHeight - midPositionOffset,
            }),
            new CanvasYAxis(this.context, Math.round(midValue).toString(), {
                x: VERTICAL_AXIS_X_POSITION,
                y: halfCanvasHeight,
            }),
            new CanvasYAxis(this.context, Math.round(midBelowMidValue).toString(), {
                x: VERTICAL_AXIS_X_POSITION,
                y: halfCanvasHeight + midPositionOffset,
            }),
            new CanvasYAxis(this.context, Math.round(minValue).toString(), {
                x: VERTICAL_AXIS_X_POSITION,
                y: this.canvasModel.canvasHeight - PLOT_OFFSET - PLOT_AXIS_OFFSET,
            }),
        ]
    }
}
