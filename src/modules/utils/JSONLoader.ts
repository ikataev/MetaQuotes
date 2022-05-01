export enum JsonType {
	TEMPERATURE,
	PRECIPITATION
}

type Response = Array<{
	t: string
	v: number
}>

export class JSONLoader {

	static async loadJson(jsonType: JsonType): Promise<Response> {
		return fetch(`/${JsonType[jsonType]}.json`)
			.then(response => response.json())
	}

}