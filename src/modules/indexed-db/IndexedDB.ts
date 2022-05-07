export class IndexedDB {
    private database: IDBOpenDBRequest

    constructor(private name: string, private version = 1) {}

    openDatabase(): IDBOpenDBRequest {
        if (!this.database) {
            this.database = window.indexedDB.open(this.name, this.version)

            this.database.addEventListener("upgradeneeded", (event: IDBVersionChangeEvent) =>
                this.onUpgradeNeeded(event)
            )
            this.database.addEventListener("error", (event: Event) => this.onOpenFailed(event))
            this.database.addEventListener("success", (event: Event) => this.onOpenSuccess(event))
        }

        return this.database
    }

    openTable(tableName: string) {}

    putValue(tableName: string, value: string) {
        // const transaction = this.database.transaction(tableName, 'readwrite')
        // const store = transaction.objectStore(tableName)
        // store.add()
    }

    putValues(tableName: string, values: string[]) {}

    getValues(tableName: string) {}

    clearTable(tableName: string) {}

    private onOpenFailed(event: Event) {
        console.log("[IndexedDB] onOpenFailed", event, this.database)
    }

    private onOpenSuccess(event: Event) {
        console.log("[IndexedDB] onOpenSuccess", event, this.database)
    }

    private onUpgradeNeeded(event: IDBVersionChangeEvent) {
        console.log("[IndexedDB] onOpenSuccess", event, this.database)
    }
}
