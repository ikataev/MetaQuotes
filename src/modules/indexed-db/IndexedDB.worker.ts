enum IndexedDBWorkerCommands {
    OPEN_CONNECTION,
}

type Data = {
    type: IndexedDBWorkerCommands
}

addEventListener('message', (message) => {
    console.log('IndexedDBWorker', message)
})
