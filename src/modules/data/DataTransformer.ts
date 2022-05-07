import {RawRecord} from './DataProvider'

export type Record = {
    timestamp: number
    value: number
}

export type Records = {
    [year: string]: {
        [month: string]: Record[]
    }
}

export type Response = {
    years: number[]
    startYear: number
    endYear: number

    records: Records
}

export class DataTransformer {

    static transform(records: RawRecord[]): Response {
        let startYear = Infinity,
            endYear = -Infinity
        let years: number[] = []
        let yearsRecords: Records = {}

        // const json = await JSONLoader.loadJson(ServiceMode.TEMPERATURE)
        records.forEach((t) => {
            const storedDate = new Date(t.t)
            const storedUTCYear = storedDate.getUTCFullYear()
            const storedUTCMonth = storedDate.getUTCMonth()
            const UTCDate = Date.UTC(storedUTCYear, storedUTCMonth, storedDate.getUTCDate())
            const record = {
                timestamp: UTCDate,
                value: t.v,
            }

            startYear = Math.min(startYear, storedUTCYear)
            endYear = Math.max(endYear, storedUTCYear)

            // console.log(storedYear)

            if (!years.includes(storedUTCYear)) {
                years.push(storedUTCYear)
            }

            if (!yearsRecords[storedUTCYear]) {
                yearsRecords[storedUTCYear] = {}
            }

            if (!yearsRecords[storedUTCYear][storedUTCMonth]) {
                yearsRecords[storedUTCYear][storedUTCMonth] = []
            }

            yearsRecords[storedUTCYear][storedUTCMonth].push(record)

            return record
        })

        console.log(records, years, startYear, endYear)

        return {records: yearsRecords, years, startYear, endYear}
    }

}