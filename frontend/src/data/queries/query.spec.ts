import { describe, expect, test } from '@jest/globals';
import { CategoryType } from './dcid'
import { Query, QuerySet, validateQueries } from './query'

const categoryDimensions: CategoryType = {
    'pets': new Set<string>([
        'cat',
        'dog'
    ]),
    'tools': new Set<string>([
        'hammer',
        'ruler'
    ]),
    'cars': new Set<string>([
        'fast',
    ]),
}




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
        const B = new Query('tools', 'hammer')
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
        expect(out[0].has('tools:hammer')).toEqual(true)
        expect(out[1].has('pets:cat')).toEqual(true)
        expect(out[1].has('tools:ruler')).toEqual(true)
    })

    test('2 categories, single dimension category has a dependency on unqueried category ', () => {
        const A = new Query('tools', 'ruler')
        const B = new Query('cars', 'fast')
        const qs = new QuerySet(categoryDimensions, [['pets', 'tools:hammer'], ['cars', 'pets'], ['cars', 'tools:hammer']], A, B)
        const out = qs.compile()
        expect(out.length).toEqual(2)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('cars:fast')).toEqual(true)
        expect(out[0].has('tools:ruler')).toEqual(true)
        expect(out[1].has('pets:dog')).toEqual(true)
        expect(out[1].has('cars:fast')).toEqual(true)
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
        const B = new Query('tools', 'hammer')
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
        expect(out.length).toEqual(1)
        expect(out[0].size).toEqual(3)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('tools:hammer')).toEqual(true)
    })

    test('3 categories 1 dimension each', () => {
        const A = new Query('pets', 'cat')
        const B = new Query('tools', 'hammer')
        const C = new Query('cars', 'fast')
        const qs = new QuerySet(categoryDimensions, [], A, B, C)
        const out = qs.compile()
        expect(out.length).toEqual(1)
        expect(out[0].size).toEqual(3)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('tools:hammer')).toEqual(true)
        expect(out[0].has('cars:fast')).toEqual(true)
    })

    test('2 categories 2 dimensions each, we use the generic key with an empty dimension to refer to all dimensions', () => {
        const A = new Query('pets', 'cat', 'dog')
        const B = new Query('tools', 'hammer', 'ruler')
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
        expect(out.length).toEqual(1)

        expect(out[0].size).toEqual(3)
        expect(out[0].has('pets:')).toEqual(true)
        expect(out[0].has('tools:')).toEqual(true)
    })

    test('3 categories, all dimensions each, we use the generic key with an empty dimension to refer to all dimensions unless there is a single dimension', () => {
        const A = new Query('pets', 'cat', 'dog')
        const B = new Query('tools', 'hammer', 'ruler')
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
    const categories: CategoryType = {
        'pets': new Set<string>([
            'cat',
            'dog'
        ]),
        'cars': new Set<string>([
            'fast',
            'red'
        ])
    }

    const annotatedDimensions = new Set(['pets:cat', 'pets:dog', 'cars:fast', 'cars:red'])

    test('duplicate categories returns error', () => {
        const q1 = new Query('pets', 'cat')
        const q2 = new Query('pets', 'dog')
        const err = validateQueries(categories, annotatedDimensions, q1, q2)
        expect(err).toEqual("query has duplicate category: pets")
    })

    test('missing category returns error', () => {
        const q1 = new Query('pets', 'cat')
        const q2 = new Query('missing', 'unknown')
        const err = validateQueries(categories, annotatedDimensions, q1, q2)
        expect(err).toEqual("unknown category: missing")
    })

    test('unknown category dimensions return error', () => {
        const q1 = new Query('pets', 'cat', 'TRUCK')
        const err = validateQueries(categories, annotatedDimensions, q1)
        expect(err).toEqual("query category has unknown dimensions: pets:TRUCK")
    })

    test('query without dimensions return error', () => {
        const q1 = new Query('pets')
        const err = validateQueries(categories, annotatedDimensions, q1)
        expect(err).toEqual("missing dimensions for category query: pets")
    })

    test('valid queries return empty string', () => {
        const q1 = new Query('pets', 'cat', 'dog')
        const q2 = new Query('cars', 'fast', 'red')
        let err = validateQueries(categories, annotatedDimensions, q1, q2)
        expect(err).toEqual('')
        err = validateQueries(categories, annotatedDimensions, q1)
        expect(err).toEqual('')
    })

})
