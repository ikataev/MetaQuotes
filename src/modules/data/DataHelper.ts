import {Records, YearObject} from './DataTransformer'

export class DataHelper {

    static forEachYear(records: Records, callback: (yearObject: YearObject, yearKey: string, yearKeyAsNumber: number) => void) {
        Object.keys(records).forEach(yearKey => {
            callback(records[yearKey], yearKey, parseInt(yearKey))
        })
    }

    static extractRange(records: Records, startYear: number, endYear: number): Records {
        const extractedRecords: Records = {}

        DataHelper.forEachYear(records, (yearObject, yearKey, yearKeyAsNumber) => {
            if (yearKeyAsNumber >= startYear && yearKeyAsNumber <= endYear) {
                extractedRecords[yearKey] = records[yearKey]
            }
        })

        return extractedRecords
    }
}