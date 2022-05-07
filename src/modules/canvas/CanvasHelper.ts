import {DataHelper} from '../data/DataHelper'
import {Records} from '../data/DataTransformer'

export class CanvasHelper {
    static getYAxisValues(records: Records) {
        DataHelper.forEachYear(records, (yearObject, yearKey, yearKeyAsNumber) => {})
    }
}
