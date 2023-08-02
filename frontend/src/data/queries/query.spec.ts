import {describe, expect, test} from '@jest/globals';
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
}




describe('Query constructor', () => {
    test('constructor creates state correctly', () => {
        const A = new Query('pets', 'cat', 'dog')
        expect(A.category).toEqual('pets')
        expect(A.dimensions).toEqual(new Set(['pets:cat', 'pets:dog']))
    })

})

describe('Query compile method', () => {

    const testDimensions = new Set(['pets:cat', 'pets:dog', 'pets:bird'])

    test('returns list of sets', () => {
        const A = new Query('pets', 'cat', 'dog')
        const got = A.compile(testDimensions)
        expect(got).toEqual([new Set(['pets:cat']), new Set(['pets:dog'])])
    })

    test('returns empty list, meaning query all categories, when all dimensions are included', () => {
        const A = new Query('pets', 'cat', 'dog', 'bird')
        const got = A.compile(testDimensions)
        expect(got).toEqual([new Set(['pets:cat']), new Set(['pets:dog']), new Set(['pets:bird'])])
    })

    test('returns empty list when given 0 dimensions', () => {
        const A = new Query('pets')
        const got = A.compile(testDimensions)
        expect(got).toEqual([])
    })

    test('when given empty string, returns single dimensions key, meaning query all categories', () => {
        const A = new Query('pets', '')
        const got = A.compile(testDimensions)
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

    test('2 categories 1 dimension each', () => {
        const A = new Query('pets', 'cat')
        const B = new Query('tools', 'hammer')
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
        expect(out.length).toEqual(1)
        expect(out[0].size).toEqual(2)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('tools:hammer')).toEqual(true)
    })

    test('2 categories 2 dimensions each, we use the generic key with an empty dimension to refer to all dimensions', () => {
        const A = new Query('pets', 'cat', 'dog')
        const B = new Query('tools', 'hammer', 'ruler')
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
        expect(out.length).toEqual(1)

        expect(out[0].size).toEqual(2)
        expect(out[0].has('pets:')).toEqual(true)
        expect(out[0].has('tools:')).toEqual(true)
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
