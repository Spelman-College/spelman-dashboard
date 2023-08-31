import { Dcid, DcidFilter, CategoryType } from "../queries/dcid"
import { Query, QueryResult, query2dcids } from "../queries/query"
import { DCIDS } from './dcids'
import { Categories } from './categories'


const filter: DcidFilter = {
    ignorePrefix: 'Median_Earnings_Person',
    omitDimensions: new Set<string>([
	'EducationalAttainmentCollegeGraduate',
    'Employed',
    'NotHispanicOrLatino'
    ])
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

const categoryDependencies: [string, string][] = []

class Base {
    protected categoryDependencies: [string, string][] = categoryDependencies
    protected dcids: Array<Dcid> = dcids
    protected annotatedDimensions: Set<string> = annotatedDimensions
}

export class Query_nsf23306 extends Base {
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
