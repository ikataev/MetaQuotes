import {JSONLoader} from "./utils/JSONLoader"
import {ServiceMode} from "../models/UIModel"

export type Record = {
	timestamp: number
	value: number
}

export type Records = {
	[x: string]: {
		[x: string]: Record[]
	}
}

type Response = {
	years: number[]
	startYear: number
	endYear: number

	records: Record[]
	records1: Records
}

export async function provider(jsonType: ServiceMode): Promise<Response> {
	switch (jsonType) {
		case ServiceMode.TEMPERATURE:
			return temperaturesProvider()

		case ServiceMode.PRECIPITATION:
			//

		default:
			throw Error(`Unexpected jsonType, ${jsonType}`)
	}
}

async function temperaturesProvider(): Promise<Response> {
	let startYear = Infinity, endYear = -Infinity
	let years: number[] = []
	let yearsRecords: Records = {}

	const json = await JSONLoader.loadJson(ServiceMode.TEMPERATURE)
	const records = json.map(t => {
		const storedDate = new Date(t.t)
		const storedUTCYear = storedDate.getUTCFullYear()
		const storedUTCMonth = storedDate.getUTCMonth()
		const UTCDate = Date.UTC(storedUTCYear, storedUTCMonth, storedDate.getUTCDate())
		const record = {
			timestamp: UTCDate,
			value: t.v
		}

		startYear = Math.min(startYear, storedUTCYear)
		endYear = Math.max(endYear, storedUTCYear)

		// console.log(storedYear)

		if (!years.includes(storedUTCYear)) {
			years.push(storedUTCYear)
		}

		if (!yearsRecords[storedUTCYear]) {
			yearsRecords[storedUTCYear] = {}
		}

		if (!yearsRecords[storedUTCYear][storedUTCMonth]) {
			yearsRecords[storedUTCYear][storedUTCMonth] = []
		}

		yearsRecords[storedUTCYear][storedUTCMonth].push(record)

		return record
	})

	return {records, records1: yearsRecords, years, startYear, endYear}
}