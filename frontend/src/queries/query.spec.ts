import {describe, expect, test} from '@jest/globals';
import { Query, QuerySet, CategoryType } from './query'

<<<<<<< HEAD
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




=======
>>>>>>> 2aa268c (add dcid query logic)
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
<<<<<<< HEAD
        expect(got).toEqual([new Set(['pets:cat']), new Set(['pets:dog']), new Set(['pets:bird'])])
    })

    test('returns empty list when given 0 dimensions', () => {
=======
        expect(got).toEqual([])
    })

    test('returns emtpy list, meaning query all categories', () => {
>>>>>>> 2aa268c (add dcid query logic)
        const A = new Query('pets')
        const got = A.compile(testDimensions)
        expect(got).toEqual([])
    })
<<<<<<< HEAD

    test('when given empty string, returns single dimensions key, meaning query all categories', () => {
        const A = new Query('pets', '')
        const got = A.compile(testDimensions)
        expect(got).toEqual([new Set(['pets:'])])
    })

=======
>>>>>>> 2aa268c (add dcid query logic)
})

describe('QuerySet constructor', () => {
    test('check constructor arguments', () => {
        const A = new Query('pets', 'cat')
        const B = new Query('tools', 'hammer')
<<<<<<< HEAD
        const qs = new QuerySet(categoryDimensions, [], A, B)
=======
        const qs = new QuerySet(A, B)
>>>>>>> 2aa268c (add dcid query logic)
        expect(qs.queries[0].category).toEqual('pets')
        expect(qs.queries[1].category).toEqual('tools')
        expect(qs.queries.length).toEqual(2)
    })
})

describe('QuerySet compile method', () => {
<<<<<<< HEAD
    test('1 category 1 dimension', () => {
        const A = new Query('pets', 'cat')
        const qs = new QuerySet(categoryDimensions, [], A)
        const out = qs.compile()
=======
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

    test('1 category 1 dimension', () => {
        const A = new Query('pets', 'cat')
        const qs = new QuerySet(A)
        const out = qs.compile(categoryDimensions)
>>>>>>> 2aa268c (add dcid query logic)
        expect(out.length).toEqual(1)
        expect(out[0].has('pets:cat')).toEqual(true)
    })

    test('2 categories 1 dimension each', () => {
        const A = new Query('pets', 'cat')
        const B = new Query('tools', 'hammer')
<<<<<<< HEAD
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
=======
        const qs = new QuerySet(A, B)
        const out = qs.compile(categoryDimensions)
>>>>>>> 2aa268c (add dcid query logic)
        expect(out.length).toEqual(1)
        expect(out[0].size).toEqual(2)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('tools:hammer')).toEqual(true)
    })

    test('2 categories 2 dimensions each', () => {
        const A = new Query('pets', 'cat', 'dog')
        const B = new Query('tools', 'hammer', 'ruler')
<<<<<<< HEAD
        const qs = new QuerySet(categoryDimensions, [], A, B)
        const out = qs.compile()
=======
        const qs = new QuerySet(A, B)
        const out = qs.compile(categoryDimensions)
>>>>>>> 2aa268c (add dcid query logic)
        expect(out.length).toEqual(4)

        expect(out[0].size).toEqual(2)
        expect(out[0].has('pets:cat')).toEqual(true)
        expect(out[0].has('tools:hammer')).toEqual(true)

        expect(out[1].size).toEqual(2)
        expect(out[1].has('pets:cat')).toEqual(true)
        expect(out[1].has('tools:ruler')).toEqual(true)

        expect(out[2].size).toEqual(2)
        expect(out[2].has('pets:dog')).toEqual(true)
        expect(out[2].has('tools:hammer')).toEqual(true)


        expect(out[3].size).toEqual(2)
        expect(out[3].has('pets:dog')).toEqual(true)
        expect(out[3].has('tools:ruler')).toEqual(true)
    })
})
