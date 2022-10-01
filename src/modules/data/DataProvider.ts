import {IndexedDBProvider} from '../indexed-db/IndexedDBProvider'
import {JSONLoader} from '../json-loader/JSONLoader'
import {ServiceMode} from '../ui/UIModel'
import {DB_KEY} from './DataHelper'
import {DataTransformer, Response as DataTransformedResponse} from './DataTransformer'

export type RawRecord = {
    t: string
    v: number
}

type Response = {
    rawRecords: RawRecord[]
    transformedRecords: DataTransformedResponse
}

export class DataProvider {

    private dbProvider: IndexedDBProvider

    constructor(dbProvider: IndexedDBProvider) {
        this.dbProvider = dbProvider
    }

    async get(serviceMode: ServiceMode): Promise<Response> {
        if (!ServiceMode[serviceMode]) {
            throw Error(`Unexpected serviceMode, ${serviceMode}`)
        }

        let rawRecords = await this.loadDataFromIndexedDB(serviceMode)

        if (!rawRecords || !rawRecords.length) {
            rawRecords = await this.loadData(serviceMode)
            await this.uploadDataIntoIndexedDB(serviceMode, rawRecords)
        }

        const transformedRecords = DataTransformer.transform(rawRecords)

        return {rawRecords, transformedRecords}
    }

    private async loadData(mode: ServiceMode): Promise<RawRecord[]> {
        let records: RawRecord[] = []

        if (!records || !records.length) {
            records = await JSONLoader.loadJson(mode)
        }

        return records
    }

    private async uploadDataIntoIndexedDB(serviceMode: ServiceMode, records: RawRecord[]) {
        const database = await this.dbProvider.open()
        const transaction = database.transaction([DB_KEY[serviceMode]], 'readwrite')
        const store = transaction.objectStore(DB_KEY[serviceMode])

        records.forEach(record => store.add(record))
    }

    private async loadDataFromIndexedDB(serviceMode: ServiceMode): Promise<RawRecord[]> {
        const database = await this.dbProvider.open()
        const transaction = database.transaction([DB_KEY[serviceMode]], 'readonly')
        const objectStore = transaction.objectStore(DB_KEY[serviceMode])

        return new Promise((resolve, reject) => {
            const request = objectStore.getAll()

            request.addEventListener('success', (event: any) => {
                resolve(event.target.result)
            })
        })
    }

}