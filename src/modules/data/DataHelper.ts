import {ServiceMode} from '../ui/UIModel'
import {RawRecord} from './DataProvider'
import {Record, Records, Response, YearObject} from './DataTransformer'

type ExtractedRangeResponse = Pick<Response, 'records'> & {
    count: number
    minValue: number
    maxValue: number
}

export const DB_KEY = {
    [ServiceMode.TEMPERATURE]: 'temperature',
    [ServiceMode.PRECIPITATION]: 'precipitation',
}

export class DataHelper {

    static forEachYear(records: Records, callback: (yearObject: YearObject, yearKey: string, yearKeyAsNumber: number) => void) {
        Object.keys(records).forEach(yearKey => {
            callback(records[yearKey], yearKey, parseInt(yearKey))
        })
    }

    static forEachMonth(yearObject: YearObject, callback: (days: Record[], monthKey: string, monthKeyAsNumber: number) => void) {
        Object.keys(yearObject).forEach(monthKey => {
            callback(yearObject[monthKey], monthKey, parseInt(monthKey))
        })
    }

    static extractRange(records: Records, startYear: number, endYear: number): ExtractedRangeResponse {
        const extractedRecords: Records = {}

        let count = 0
        let maxValue = -Infinity
        let minValue = Infinity

        DataHelper.forEachYear(records, (yearObject, yearKey, yearKeyAsNumber) => {
            if (yearKeyAsNumber >= startYear && yearKeyAsNumber <= endYear) {
                extractedRecords[yearKey] = records[yearKey]

                Object.keys(records[yearKey]).forEach(monthKey => {
                    const values = records[yearKey][monthKey].map(day => day.value)

                    count += values.length
                    minValue = Math.min(minValue, ...values)
                    maxValue = Math.max(maxValue, ...values)
                })
            }
        })

        return {records: extractedRecords, minValue, maxValue, count}
    }

    static extractRawRange(rawRecords: RawRecord[], startYear: number, endYear: number) {
        const years = new Set()
        const series = {
            values: [] as number[],
            minValue: Infinity,
            maxValue: -Infinity,
        }

        rawRecords.forEach((t) => {
            const storedDate = new Date(t.t)
            const storedUTCYear = storedDate.getUTCFullYear()
            const storedValue = t.v

            if (storedUTCYear < startYear || storedUTCYear > endYear) {
                return
            }

            years.add(storedUTCYear)
            series.values.push(storedValue)
            series.minValue = Math.min(series.minValue, storedValue)
            series.maxValue = Math.max(series.maxValue, storedValue)
        })

        return {
            years: Array.from(years),
            series,
        }
    }
}