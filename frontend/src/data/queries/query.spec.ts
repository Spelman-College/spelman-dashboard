import { describe, expect, test } from '@jest/globals'
import { Dcid, CategoryType } from './dcid'
import type { DcidFilter } from './dcid'
import {
  Query,
  QuerySet,
  validateQueries,
  Queryable,
  query2dcids,
  QueryCompare,
  expandCompares
} from './query'

const categoryDimensions: CategoryType = {
  pets: new Set<string>(['cat', 'dog']),
  tools: new Set<string>(['tape-measure', 'ruler']),
  cars: new Set<string>(['fast'])
}

const annotatedDimensions = new Set<string>()
const dimension2Category = {}

Object.keys(categoryDimensions).forEach((cat) => {
  const values = categoryDimensions[cat]
  values.forEach((dim) => {
    dimension2Category[dim] = cat
    annotatedDimensions.add(`${cat}:${dim}`)
  })
})
const dcidKeys = [
  'cat_tape-measure',
  'cat_ruler',
  'dog_ruler',
  'dog_tape-measure',
  'cat',
  'dog',
  'ruler',
  'tape-measure'
]

const cat = new Query('pets', 'cat')
const dog = new Query('pets', 'dog')
const ruler = new Query('tools', 'ruler')

const DCIDS = []
const testFilter = {
  ignorePrefix: '',
  omitDimensions: new Set<string>(),
  additions: {}
}
dcidKeys.forEach((key) => {
  DCIDS.push(new Dcid(key, testFilter, dimension2Category))
})

class Base {
  protected categoryDependencies: [string, string][] = []
  protected dcids: Array<Dcid> = DCIDS
  protected annotatedDimensions: Set<string> = annotatedDimensions
  categories(): CategoryType {
    return categoryDimensions
  }
}

class Query_test extends Base implements Queryable {
  constructor() {
    super()
  }
  query(...queries: Array<Query>): QueryResult {
    return query2dcids(
      this.dcids,
      this.categories(),
      this.categoryDependencies,
      this.annotatedDimensions,
      ...queries
    )
  }
}

const queryable = new Query_test()

describe('Query constructor', () => {
  test('constructor creates state correctly', () => {
    const A = new Query('pets', 'cat', 'dog')
    expect(A.category).toEqual('pets')
    expect(A.dimensions).toEqual(new Set(['pets:cat', 'pets:dog']))
  })
})

describe('Query compile method', () => {
  test('returns list of sets 2 dimensions', () => {
    const A = new Query('pets', 'cat', 'dog')
    const got = A.compile()
    expect(got).toEqual([new Set(['pets:cat']), new Set(['pets:dog'])])
  })

  test('returns list of sets 3 dimensions', () => {
    const A = new Query('pets', 'cat', 'dog', 'bird')
    const got = A.compile()
    expect(got).toEqual([new Set(['pets:cat']), new Set(['pets:dog']), new Set(['pets:bird'])])
  })

  test('returns empty list when given 0 dimensions', () => {
    const A = new Query('pets')
    const got = A.compile()
    expect(got).toEqual([])
  })

  test('when given empty string, returns single dimensions key, meaning query all categories', () => {
    const A = new Query('pets', '')
    const got = A.compile()
    expect(got).toEqual([new Set(['pets:'])])
  })
})

describe('QuerySet constructor', () => {
  test('check constructor arguments', () => {
    const A = new Query('pets', 'cat')
    const B = new Query('tools', 'tape-measure')
    const qs = new QuerySet(categoryDimensions, [], A, B)
    expect(qs.queries[0].category).toEqual('pets')
    expect(qs.queries[1].category).toEqual('tools')
    expect(qs.queries.length).toEqual(2)
  })
})

describe('QuerySet compile method', () => {
  test('1 category 1 dimension', () => {
    const A = new Query('pets', 'cat')
    const qs = new QuerySet(categoryDimensions, [], A)
    const out = qs.compile()
    expect(out.length).toEqual(1)
    expect(out[0].has('pets:cat')).toEqual(true)
  })

  test('1 category 1 dimension with category dependency ', () => {
    const A = new Query('pets', 'cat')
    const qs = new QuerySet(categoryDimensions, [['pets', 'tools']], A)
    const out = qs.compile()
    expect(out.length).toEqual(2)
    expect(out[0].has('pets:cat')).toEqual(true)
    expect(out[0].has('tools:tape-measure')).toEqual(true)
    expect(out[1].has('pets:cat')).toEqual(true)
    expect(out[1].has('tools:ruler')).toEqual(true)
  })

  test('1 multiple dimension category, all dimensions', () => {
    const A = new Query('pets', 'cat', 'dog')
    const qs = new QuerySet(categoryDimensions, [], A)
    const out = qs.compile()
    expect(out.length).toEqual(1)
    expect(out[0].has('pets:')).toEqual(true)
  })

  test('1 single dimension category, all dimensions', () => {
    const A = new Query('cars', 'fast')
    const qs = new QuerySet(categoryDimensions, [], A)
    const out = qs.compile()
    expect(out.length).toEqual(1)
    expect(out[0].has('cars:fast')).toEqual(true)
  })

  test('2 categories 1 dimension each', () => {
    const A = new Query('pets', 'cat')
    const B = new Query('tools', 'tape-measure')
    const qs = new QuerySet(categoryDimensions, [], A, B)
    const out = qs.compile()
    expect(out.length).toEqual(1)
    expect(out[0].size).toEqual(3)
    expect(out[0].has('pets:cat')).toEqual(true)
    expect(out[0].has('tools:tape-measure')).toEqual(true)
  })

  test('3 categories 1 dimension each', () => {
    const A = new Query('pets', 'cat')
    const B = new Query('tools', 'tape-measure')
    const C = new Query('cars', 'fast')
    const qs = new QuerySet(categoryDimensions, [], A, B, C)
    const out = qs.compile()
    expect(out.length).toEqual(1)
    expect(out[0].size).toEqual(3)
    expect(out[0].has('pets:cat')).toEqual(true)
    expect(out[0].has('tools:tape-measure')).toEqual(true)
    expect(out[0].has('cars:fast')).toEqual(true)
  })

  test('2 categories 2 dimensions each, we use the generic key with an empty dimension to refer to all dimensions', () => {
    const A = new Query('pets', 'cat', 'dog')
    const B = new Query('tools', 'tape-measure', 'ruler')
    const qs = new QuerySet(categoryDimensions, [], A, B)
    const out = qs.compile()
    expect(out.length).toEqual(1)

    expect(out[0].size).toEqual(3)
    expect(out[0].has('pets:')).toEqual(true)
    expect(out[0].has('tools:')).toEqual(true)
  })

  test('3 categories, all dimensions each, we use the generic key with an empty dimension to refer to all dimensions unless there is a single dimension', () => {
    const A = new Query('pets', 'cat', 'dog')
    const B = new Query('tools', 'tape-measure', 'ruler')
    const C = new Query('cars', 'fast')
    const qs = new QuerySet(categoryDimensions, [], A, B, C)
    const out = qs.compile()
    expect(out.length).toEqual(1)

    expect(out[0].size).toEqual(3)
    expect(out[0].has('pets:')).toEqual(true)
    expect(out[0].has('tools:')).toEqual(true)
    expect(out[0].has('cars:fast')).toEqual(true)
  })
})

describe('validateQueries', () => {
  const categories = {
    pets: new Set<string>(['cat', 'dog']),

    cars: new Set<string>(['fast', 'red']),

    tools: new Set<string>(['hammer'])
  }

  const annotatedDimensions = new Set([
    'pets:cat',
    'pets:dog',
    'cars:fast',
    'cars:red',
    'tools:hammer'
  ])

  test('duplicate categories returns error', () => {
    const q1 = new Query('pets', 'cat')
    const q2 = new Query('pets', 'dog')
    const err = validateQueries(categories, annotatedDimensions, q1, q2)
    expect(err).toEqual('query has duplicate category: pets')
  })

  test('missing category returns error', () => {
    const q1 = new Query('pets', 'cat')
    const q2 = new Query('missing', 'unknown')
    const err = validateQueries(categories, annotatedDimensions, q1, q2)
    expect(err).toEqual('unknown category: missing')
  })

  test('unknown category dimensions return error', () => {
    const q1 = new Query('pets', 'cat', 'TRUCK')
    const err = validateQueries(categories, annotatedDimensions, q1)
    expect(err).toEqual('query category has unknown dimensions: pets:TRUCK')
  })

  test('query without dimensions return error', () => {
    const q1 = new Query('pets')
    const err = validateQueries(categories, annotatedDimensions, q1)
    expect(err).toEqual('missing dimensions for category query: pets')
  })

  test('all query categories in a query include all dimensions: return error', () => {
    const q1 = new Query('pets', 'cat', 'dog')
    const q2 = new Query('cars', 'fast', 'red')
    let err = validateQueries(categories, annotatedDimensions, q1, q2)
    expect(err).toEqual('All query categories given include all respective dimensions')
    const q3 = new Query('cars', 'fast')
    err = validateQueries(categories, annotatedDimensions, q1, q3)
    expect(err).toEqual('')
  })

  test('query with single dimension category does not return error', () => {
    const q1 = new Query('tools', 'hammer')
    const err = validateQueries(categories, annotatedDimensions, q1)
    expect(err).toEqual('')
  })
})

describe('QueryCompare constructor', () => {
  test('QueryCompare single query', () => {
    const catMap = {
      cat: [cat],
      dog: [dog]
    }
    const qc = new QueryCompare('pets', queryable, catMap)
    expect(Object.keys(qc.queries).length).toEqual(2)
    const validated = qc.validate()
    expect(validated).toEqual('')
    const compiled = qc.compile()
    const expected = {
      cat: ['cat'],
      dog: ['dog']
    }
    expect(compiled).toEqual(expected)
  })
  test('QueryCompare twin query pets', () => {
    const catMap = {
      cat: [cat, ruler],
      dog: [dog, ruler]
    }
    const qc = new QueryCompare('pets', queryable, catMap)
    expect(Object.keys(qc.queries).length).toEqual(2)

    const validated = qc.validate()
    expect(validated).toEqual('')
    const expected = {
      cat: ['cat_ruler'],
      dog: ['dog_ruler']
    }
    const compiled = qc.compile()
    expect(compiled).toEqual(expected)
  })

  test('QueryCompare duplicate category(cats) will not validate', () => {
    const catMap = {
      cat: [cat, ruler],
      dog: [cat, ruler] // <<<< using the cat Query here <<<<<
    }

    const qc = new QueryCompare('pets', queryable, catMap)
    const err = qc.validate()
    expect(err).toEqual('duplicate dimensions in the pets category: pets:cat')
  })

  test('QueryCompare invalid options < 2 Array<Query> throws', () => {
    const catMap = {
      cat: [cat]
    }

    expect(() => {
      const qc = new QueryCompare('pets', queryable, catMap)
    }).toThrow('QueryCompare requires a Map with at least 2 items')
  })

  test('QueryCompare missing category throws', () => {
    const catMap = {
      cat: [cat],
      dog: [dog]
    }

    expect(() => {
      const qc = new QueryCompare('what-is-this', queryable, catMap)
    }).toThrow('category missing from queries: what-is-this')
  })
})

describe('expandCompares', () => {
  test('expand simple queries', () => {
    const got = expandCompares('pets', { pets: ['cat', 'dog'], tools: ['tape-measure'] })
    expect(Object.keys(got).length).toEqual(2)

    expect(got['cat'][0].category).toEqual('pets')
    expect(got['cat'][0].dimensions).toEqual(new Set(['pets:cat']))
    expect(got['cat'][1].category).toEqual('tools')
    expect(got['cat'][1].dimensions).toEqual(new Set(['tools:tape-measure']))

    expect(got['dog'][0].category).toEqual('pets')
    expect(got['dog'][0].dimensions).toEqual(new Set(['pets:dog']))
    expect(got['dog'][1].category).toEqual('tools')
    expect(got['dog'][1].dimensions).toEqual(new Set(['tools:tape-measure']))
  })
})
