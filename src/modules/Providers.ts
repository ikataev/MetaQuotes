import {JSONLoader, JsonType} from "./utils/JSONLoader"

export type Records = Array<{
	timestamp: number
	// year: number
	value: number
}>

type Response = {
	years: number[]
	startYear: number
	endYear: number

	records: Records
}

export async function provider(jsonType: JsonType): Promise<Response> {
	switch (jsonType) {
		case JsonType.TEMPERATURE:
			return temperaturesProvider()

		case JsonType.PRECIPITATION:
			//

		default:
			throw Error(`Unexpected jsonType, ${jsonType}`)
	}
}

async function temperaturesProvider(): Promise<Response> {
	let startYear = Infinity, endYear = -Infinity
	let years: number[] = []

	const json = await JSONLoader.loadJson(JsonType.TEMPERATURE)
	const records = json.map(t => {
		const storedDate = new Date(t.t)
		const storedYear = storedDate.getFullYear()
		const UTCDate = Date.UTC(storedYear, storedDate.getFullYear(), storedDate.getDate())

		startYear = Math.min(startYear, storedYear)
		endYear = Math.max(endYear, storedYear)

		// console.log(storedYear)

		if (!years.includes(storedYear)) {
			years.push(storedYear)
		}

		return {
			timestamp: UTCDate,
			// date: storedDate,
			// year: storedYear,
			value: t.v
		}
	})

	return {records, years, startYear, endYear}
}