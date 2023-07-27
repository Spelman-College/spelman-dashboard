import { Dcid, DcidFilter, CategoryType } from "../queries/dcid"
import { Query, QueryResult, query2dcids } from "../queries/query"
import { DCIDS } from './dcids'
import { Categories } from './categories'


const filter: DcidFilter = {
    ignorePrefix: 'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree',
    omitDimensions: new Set<string>([
        'UniversityOrCollegeTeacher'
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

// If we're querying both
// 1. a subset of enthicity dimensions, and
// 2. all gender dimensions
// we need to query each gender dimension separately and the sum the values; that is,
// we can't use the `gender:` dimension key to search for dcids that have a summarized
// ethnicity metric that includes all genders.
const categoryDependencies: [string, string][] = [['ethnicity', 'gender']]


class Base {
    protected categoryDependencies: [string, string][] = categoryDependencies
    protected dcids: Array<Dcid> = dcids
    protected annotatedDimensions: Set<string> = annotatedDimensions
}

export class Query_nsf19304 extends Base {
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
