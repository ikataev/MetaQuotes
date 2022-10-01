const noop = (...args: unknown[]) => Promise.resolve()

export class IndexedDBProvider {
    private request: IDBOpenDBRequest
    private database: IDBDatabase

    private upgradeNeededCallback = noop

    constructor(private name: string, private version = 1) {}

    onUpgradeNeeded(callback: (database: IDBDatabase) => Promise<void>) {
        this.upgradeNeededCallback = callback
        return this
    }

    async open(): Promise<IDBDatabase> {
        if (this.request) {
            return Promise.resolve(this.database)
        }

        return new Promise((resolve, reject) => {
            this.request = indexedDB.open(this.name, this.version)

            this.request.addEventListener('success', (event: any) => {
                const database = event.target.result as IDBDatabase

                this.database = database
                resolve(database)
            })

            this.request.addEventListener('error', (event) => {
                reject(event.target)
            })

            this.request.addEventListener('upgradeneeded', (event: any) => {
                const database = event.target.result

                this.database = database
                this.upgradeNeededCallback(database)
                    .then(() => resolve(database))
                    .catch(reject)
            })
        })
    }
}
