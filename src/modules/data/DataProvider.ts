import {JSONLoader} from '../json-loader/JSONLoader'
import {ServiceMode} from '../ui/UIModel'
import {DataTransformer, Response as DataTransformedResponse} from './DataTransformer'

export type RawRecord = {
    t: string
    v: number
}

type Response = {
    rawRecords: RawRecord[]
    transformedRecords: DataTransformedResponse
}

const CACHE: { [x: string]: Response } = {}

export class DataProvider {

    static async get(serviceMode: ServiceMode): Promise<Response> {
        if (!ServiceMode[serviceMode]) {
            throw Error(`Unexpected serviceMode, ${serviceMode}`)
        }

        if (!CACHE[serviceMode]) {
            const rawRecords = await this.loadData(serviceMode)
            const transformedRecords = DataTransformer.transform(rawRecords)

            CACHE[serviceMode] = {rawRecords, transformedRecords}
        }

        return CACHE[serviceMode]
    }

    private static async loadData(mode: ServiceMode): Promise<RawRecord[]> {
        // let records = IndexedDBProvider.get()
        let records: RawRecord[] = []

        if (!records || !records.length) {
            records = await JSONLoader.loadJson(mode)
            // IndexedDBProvider.save(records)
        }

        console.log(records)

        return records
    }

}