import {DB_KEY} from '../data/DataHelper'
import {ServiceMode} from '../ui/UIModel'

export class IndexedDBHelper {
    static onUpgradeNeeded(database: IDBDatabase): Promise<any> {
        console.info('onUpgradeNeeded', database)
        return new Promise((resolve, reject) => {
            Promise.all([
                IndexedDBHelper.makeScheme(database, DB_KEY[ServiceMode.TEMPERATURE]),
                IndexedDBHelper.makeScheme(database, DB_KEY[ServiceMode.PRECIPITATION]),
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