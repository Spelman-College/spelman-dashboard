import { describe, expect, test } from '@jest/globals'
import { setsProduct, setEqual, setIntersection, setDifference } from './sets'

describe('set equal compares 2 sets', () => {
  test('empty sets compare equal', () => {
    expect(setEqual(new Set(), new Set())).toEqual(true)
  })

  test('same sets compare equal', () => {
    expect(setEqual(new Set(['cats', 'dogs']), new Set(['cats', 'dogs']))).toEqual(true)
  })

  test('different sets DO NOT compare equal', () => {
    expect(setEqual(new Set(['cats', 'dogs']), new Set(['cats', 'dogs', 'birds']))).toEqual(false)
  })
})

describe('set intersection returns the correct values', () => {
  test('empty sets intersection returns empty set', () => {
    expect(setIntersection(new Set(), new Set())).toEqual(new Set())
  })

  test('intersection returns only matching items, no matter argument order', () => {
    expect(setIntersection(new Set(['cat']), new Set(['cat', 'dog']))).toEqual(new Set(['cat']))
    // Reverse argument order
    expect(setIntersection(new Set(['cat', 'dog']), new Set(['cat']))).toEqual(new Set(['cat']))

    expect(setIntersection(new Set(['cat', 'dog']), new Set(['cat', 'dog', 'bird']))).toEqual(
      new Set(['cat', 'dog'])
    )
    // Reverse argument order
    expect(setIntersection(new Set(['cat', 'dog', 'bird']), new Set(['cat', 'dog']))).toEqual(
      new Set(['cat', 'dog'])
    )
  })
})

describe('set difference returns values in A and NOT in B', () => {
  test('returns values in A and NOT in B', () => {
    const A = new Set(['cat', 'dog', 'fish'])
    const B = new Set(['cat', 'dog', 'shark'])
    expect(setDifference(A, B)).toEqual(new Set(['fish']))
  })

  test('returns empty set correctly', () => {
    const A = new Set(['cat', 'dog', 'fish'])
    const B = new Set(['cat', 'dog', 'fish'])
    expect(setDifference(A, B)).toEqual(new Set())

    const C = new Set()
    expect(setDifference(C, A)).toEqual(new Set())

    expect(setDifference(A, C)).toEqual(A)
  })
})

describe('set product returns the cartesian product of each set', () => {
  test('2 single-item sets', () => {
    const A = new Set(['cat'])
    const B = new Set(['dog'])

    expect(setsProduct([A], [B])).toEqual([new Set(['cat', 'dog'])])
  })

  test('1 1-set and 1 2-set', () => {
    const A = new Set(['cat'])
    const B = new Set(['dog', 'tree'])

    let out = setsProduct([A], [B])
    expect(out).toEqual([new Set(['cat', 'dog', 'tree'])])
  })

  test('1 1-set and 2 sets(2-set and 1-set)', () => {
    const A = new Set(['cat'])

    const B = new Set(['dog', 'tree'])
    const C = new Set(['pest'])

    let out = setsProduct([A], [B, C])
    expect(out).toEqual([new Set(['cat', 'dog', 'tree']), new Set(['cat', 'pest'])])
  })

  test('2 1-set and 3 sets(3 1-item sets)', () => {
    const A = new Set(['cat'])
    const AA = new Set(['pest'])

    const B = new Set(['dog'])
    const BB = new Set(['tree'])
    const BBB = new Set(['duck'])

    let out = setsProduct([A, AA], [B, BB, BBB])
    expect(out).toEqual([
      new Set(['cat', 'dog']),
      new Set(['cat', 'tree']),
      new Set(['cat', 'duck']),
      new Set(['pest', 'dog']),
      new Set(['pest', 'tree']),
      new Set(['pest', 'duck'])
    ])
  })
})
