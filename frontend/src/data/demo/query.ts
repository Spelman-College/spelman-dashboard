import type { CategoryType, DcidFilter } from "../queries/dcid"
import { Dcid } from "../queries/dcid"
import type { QueryResult, Queryable } from "../queries/query"
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
// 1. a subset of gender dimensions, and
// 2. all major dimensions
// we need to query each major dimension separately and the sum the values; that is,
// we can't use the `gender:` dimension key to search for dcids that have a summarized
// major metric that includes all genders.
const categoryDependencies: [string, string][] = [['gender', 'major'], ['age', 'major']]
// const categoryDependencies: [string, string][] = []

class Base {
    protected categoryDependencies: [string, string][] = categoryDependencies
    protected dcids: Array<Dcid> = dcids
    protected annotatedDimensions: Set<string> = annotatedDimensions
    categories(): CategoryType {
	return Categories
    }
}

export class Query_demo extends Base implements Queryable {
    constructor() {
	super()
    }
    query(...queries: Array<Query>): QueryResult {
	return query2dcids(this.dcids,
			   this.categories(),
			   this.categoryDependencies,
			   this.annotatedDimensions,
			   ...queries)
    }
}
