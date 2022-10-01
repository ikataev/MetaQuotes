import {ServiceMode} from '../ui/UIModel'
import {Records, Response, YearObject} from './DataTransformer'

type ExtractedRangeResponse = Pick<Response, 'records'> & {
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

    static onUpgradeNeeded(database: IDBDatabase): Promise<any> {
        console.info('onUpgradeNeeded', database)
        return new Promise((resolve, reject) => {
            Promise.all([
                DataHelper.makeScheme(database, DB_KEY[ServiceMode.TEMPERATURE]),
                DataHelper.makeScheme(database, DB_KEY[ServiceMode.PRECIPITATION]),
            ]).then(
                () => resolve(database),
                reject,
            )
        })
    }

    private static makeScheme(database: IDBDatabase, name: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const objectStore = database.createObjectStore(name, {
                // keyPath: 't',
                autoIncrement: true,
            })

            objectStore.createIndex('t', 't', {unique: true})
            objectStore.createIndex('v', 'v', {unique: false})

            objectStore.transaction.addEventListener('complete', event => {
                resolve()
            })

            objectStore.transaction.addEventListener('error', event => {
                reject(event)
            })
        })
    }
}