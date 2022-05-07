export enum ServiceMode {
    TEMPERATURE,
    PRECIPITATION,
}

export class UIModel {
    private _mode = ServiceMode.TEMPERATURE

    private _years: number[]
    private _startYear: number
    private _endYear: number

    get mode(): ServiceMode {
        return this._mode
    }

    get startYear(): number {
        return this._startYear
    }

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
