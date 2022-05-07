import {ServiceMode} from '../ui/UIModel'

type Response = Array<{
    t: string
    v: number
}>

export class JSONLoader {
    static async loadJson(jsonType: ServiceMode): Promise<Response> {
        return fetch(`/${ServiceMode[jsonType]}.json`).then((response) => response.json())
    }
}
