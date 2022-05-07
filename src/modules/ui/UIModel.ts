export enum ServiceMode {
    TEMPERATURE,
    PRECIPITATION,
}

export interface IUIModelReadonly {
    readonly mode: ServiceMode
    readonly startYear: number
    readonly endYear: number
    readonly startYears: number[]
    readonly endYears: number[]
}

export interface IUIModel extends IUIModelReadonly {

}

export class UIModel implements IUIModel {
    private _years: number[]

    private _mode = ServiceMode.TEMPERATURE

    get mode(): ServiceMode {
        return this._mode
    }

    private _startYear: number

    get startYear(): number {
        return this._startYear
    }

    private _endYear: number

    get endYear(): number {
        return this._endYear
    }

    get startYears(): number[] {
        return this._years.filter((year) => year <= this._endYear)
    }

    get endYears(): number[] {
        return this._years.filter((year) => year >= this._startYear)
    }

    setMode(mode: ServiceMode): void {
        this._mode = mode
    }

    setYears(years: number[]): void {
        this._years = years
    }

    setStartYear(startYear: number): void {
        if (this._endYear && startYear > this._endYear) {
            throw new Error(
                `You can't set start year more then end, startYear: ${startYear}, endYear: ${this._endYear}`
            )
        }

        this._startYear = startYear
    }

    setEndYear(endYear: number): void {
        if (this._startYear && endYear < this._startYear) {
            throw new Error(
                `You can't set end year less then start, startYear: ${this._startYear}, endYear: ${endYear}`
            )
        }

        this._endYear = endYear
    }
}
