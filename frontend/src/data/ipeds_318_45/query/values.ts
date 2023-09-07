import type { CategoryType, DcidFilter } from  "../../queries/dcid"
import { Dcid } from "../../queries/dcid"
import type { QueryResult } from "../../queries/query"
import { Query, query2dcids } from "../../queries/query"
import { DCIDS_VALUES } from '../dcids/values'
import { Categories } from '../categories/values'

const filter: DcidFilter = {
  ignorePrefix: 'Count_Person',
  omitDimensions: new Set<string>([
    'EducationalAttainment',
    '9ThTo12ThGradeNoDiploma',
    'BachelorOfScienceOrTechnologyOrEngineeringOrMathematics',

    // Explicit summary statistic in the DCID location of EducationalAttainment
    'EducationalAttainmentCollegeGraduate'
  ]),
  additions: {
    // This represents the summary statistic for education.

  },
  fragment_additions: {
    // This fragment represents the summary statistic for education.
    'EducationalAttainmentCollegeGraduate': ['education:']
  }
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
export const dcids_set = new Set()

for (const date in DCIDS_VALUES) {
  const keys = DCIDS_VALUES[date]
  keys.forEach((id) => {
    dcids_set.add(id)
  })
}
dcids_set.forEach((id) => {
  // AsianOrPacificIslander is the sum of both Asian AND HawaiianNativeOrPacificIslander
  if (id.match(/AsianOrPacificIslander/g) !== null) {
    return
  }
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
// const categoryDependencies: [string, string][] = [['ethnicity', 'education']]
const categoryDependencies: [string, string][] = []

class Base {
  protected categoryDependencies: [string, string][] = categoryDependencies
  protected dcids: Array<Dcid> = dcids
  protected annotatedDimensions: Set<string> = annotatedDimensions
  categories(): CategoryType {
    return Categories
  }
}

export class Query_values extends Base {
  constructor() {
    super()
  }
  query(...queries: Array<Query>): QueryResult {
    return query2dcids(
      this.dcids,
      Categories,
      this.categoryDependencies,
      this.annotatedDimensions,
      ...queries
    )
  }
}
