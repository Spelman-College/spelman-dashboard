import { Dcid, TsDcid, DcidFilter, CategoryType } from "../queries/dcid"
import { Query, QueryResult, query2dcids } from "../queries/query"
import { DCIDS } from './dcids'
import { Categories } from './categories'

const filter: DcidFilter = {
    ignorePrefix: 'Count_Person',
    omitDimensions: new Set<string>([
	'EducationalAttainmentBachelorsDegreeOrHigher',
    ]),
    additions: {}
} as DcidFilter

const dimension2Category = {}
const annotatedDimensions = new Set<string>()


Object.keys(Categories).forEach((cat) => {
    const values = Categories[cat]
    values.forEach((dim) => {
        dimension2Category[dim] = cat
	annotatedDimensions.add(`${cat}:${dim}`)
    })
})
// Because we're using timeseries, we'll need to create a set of all of the available
// DCIDs that include each year. There may be keys that don't exist in some years
// that do exist in other years. Since we're collecting the unique set of all years,
// we can find any key.
// Also, we're NOT adding a date dimension, since the DC API we're using returns all
// dates in the response; another way of saying this is that any key will return all years
// so we're collecting just the unique set of keys.
const dcids = []
const dcids_set = new Set()

for (const date in DCIDS) {
    const keys = DCIDS[date]
    keys.forEach((id) => {
	dcids_set.add(id)
    })
}
dcids_set.forEach((id) => {
    dcids.push(new Dcid(id, filter, dimension2Category))
})

// If we're querying both
// 1. a subset of enthicity dimensions, and
// 2. all gender dimensions
// we need to query each gender dimension separately and the sum the values; that is,
// we can't use the `gender:` dimension key to search for dcids that have a summarized
// ethnicity metric that includes all genders.
// EXAMPLE:
// const categoryDependencies: [string, string][] = [['ethnicity', 'gender']]
const categoryDependencies: [string, string][] = []

class Base {
    protected categoryDependencies: [string, string][] = categoryDependencies
    protected dcids: Array<Dcid | TsDcid> = dcids
    protected annotatedDimensions: Set<string> = annotatedDimensions
}

export class Query_nsf23306_6_2 extends Base {
    constructor() {
	super()
    }
    query(...queries: Array<Query>): QueryResult {
	return query2dcids(this.dcids,
			   Categories,
			   this.categoryDependencies,
			   this.annotatedDimensions,
			   ...queries)
    }
}
