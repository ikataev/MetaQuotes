import {RawRecord} from './DataProvider'

export type Record = {
    timestamp: number
    value: number
}

export type YearObject = {
    [month: string]: Record[]
}

export type Records = {
    [year: string]: YearObject
}

export type Response = {
    years: number[]
    startYear: number
    endYear: number

    maxValue: number
    minValue: number

    records: Records
}

export class DataTransformer {

    static transform(rawRecords: RawRecord[]): Response {
        let startYear = Infinity,
            endYear = -Infinity,
            maxValue = -Infinity,
            minValue = Infinity
        let years: number[] = []
        let records: Records = {}

        // const json = await JSONLoader.loadJson(ServiceMode.TEMPERATURE)
        rawRecords.forEach((t) => {
            const storedDate = new Date(t.t)
            const storedUTCYear = storedDate.getUTCFullYear()
            const storedUTCMonth = storedDate.getUTCMonth()
            const UTCDate = Date.UTC(storedUTCYear, storedUTCMonth, storedDate.getUTCDate())
            const storedValue = t.v
            const record = {
                timestamp: UTCDate,
                value: storedValue,
            }

            startYear = Math.min(startYear, storedUTCYear)
            endYear = Math.max(endYear, storedUTCYear)

            maxValue = Math.max(maxValue, storedValue)
            minValue = Math.min(minValue, storedValue)

            if (!years.includes(storedUTCYear)) {
                years.push(storedUTCYear)
            }

            if (!records[storedUTCYear]) {
                records[storedUTCYear] = {}
            }

            if (!records[storedUTCYear][storedUTCMonth]) {
                records[storedUTCYear][storedUTCMonth] = []
            }

            records[storedUTCYear][storedUTCMonth].push(record)

            return record
        })

        return {records, years, startYear, endYear, maxValue, minValue}
    }

}