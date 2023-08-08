import type { CategoryType, DcidFilter } from "../queries/dcid"
import { Dcid } from "../queries/dcid"
import type { QueryResult } from "../queries/query"
import { Query, query2dcids } from "../queries/query"
import { DCIDS } from './dcids'
import { Categories } from './categories'


const filter: DcidFilter = {
    ignorePrefix: 'Count_Person',
    omitDimensions: new Set<string>([])
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

const dcids = []
DCIDS.forEach((id) => {
    dcids.push(new Dcid(id, filter, dimension2Category))
})

// If we're querying both
// 1. a subset of enthicity dimensions, and
// 2. all gender dimensions
// we need to query each gender dimension separately and the sum the values; that is,
// we can't use the `gender:` dimension key to search for dcids that have a summarized
// ethnicity metric that includes all genders.
//// EXAMPLE: const categoryDependencies: [string, string][] = [['ethnicity', 'gender']]
const categoryDependencies: [string, string][] = [['gender', 'major']]

class Base {
    protected categoryDependencies: [string, string][] = categoryDependencies
    protected dcids: Array<Dcid> = dcids
    protected annotatedDimensions: Set<string> = annotatedDimensions
}

export class Query_demo extends Base {
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
