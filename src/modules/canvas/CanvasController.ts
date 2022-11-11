import {DataHelper} from '../data/DataHelper'
import {DataProvider} from '../data/DataProvider'
import {IUIModelReadonly} from '../ui/UIModel'
import {CanvasSeries} from './components/CanvasSeries'
import {CanvasYAxis} from './components/CanvasYAxis'
import {PLOT_OFFSET} from './constants'

export class CanvasController {
    private readonly context: CanvasRenderingContext2D

    private readonly width: number
    private readonly height: number

    private series
    private yAxis

    constructor(
        private canvas: HTMLCanvasElement,
        private dataProvider: DataProvider,
    ) {
        this.width = canvas.width
        this.height = canvas.height
        this.context = canvas.getContext('2d')

        this.series = new CanvasSeries(
            this.context,
            PLOT_OFFSET * 2,
            PLOT_OFFSET,
            this.width - PLOT_OFFSET * 3,
            this.height - PLOT_OFFSET * 2,
        )

        this.yAxis = new CanvasYAxis(
            this.context,
            PLOT_OFFSET * 2,
            PLOT_OFFSET,
            this.width - PLOT_OFFSET * 3,
            this.height - PLOT_OFFSET * 2,
        )
    }

    // Instead of EventBus implementation, will call method directly
    async onUIChanged(uiModel: IUIModelReadonly) {
        console.info('[CanvasController] onUIChanged')
        const {rawRecords} = await this.dataProvider.get(uiModel.mode)
        const extractedRecords = DataHelper.extractRawRange(rawRecords, uiModel.startYear, uiModel.endYear)

        this.context.clearRect(0, 0, this.width, this.height)

        this.series.draw(extractedRecords.series)
        this.yAxis.draw(extractedRecords.series.minValue, extractedRecords.series.maxValue)
    }
}