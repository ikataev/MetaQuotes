import {Records, Response, YearObject} from './DataTransformer'

type ExtractedRangeResponse = Pick<Response, 'records'> & {
    minValue: number
    maxValue: number
}

export class DataHelper {

    static forEachYear(records: Records, callback: (yearObject: YearObject, yearKey: string, yearKeyAsNumber: number) => void) {
        Object.keys(records).forEach(yearKey => {
            callback(records[yearKey], yearKey, parseInt(yearKey))
        })
    }

    static extractRange(records: Records, startYear: number, endYear: number): ExtractedRangeResponse {
        const extractedRecords: Records = {}
        let maxValue = -Infinity, minValue = Infinity

        DataHelper.forEachYear(records, (yearObject, yearKey, yearKeyAsNumber) => {
            if (yearKeyAsNumber >= startYear && yearKeyAsNumber <= endYear) {
                extractedRecords[yearKey] = records[yearKey]

                Object.keys(records[yearKey]).forEach(monthKey => {
                    const values = records[yearKey][monthKey].map(day => day.value)

                    minValue = Math.min(minValue, ...values)
                    maxValue = Math.max(maxValue, ...values)
                })
            }
        })

        return {records: extractedRecords, minValue, maxValue}
    }
}