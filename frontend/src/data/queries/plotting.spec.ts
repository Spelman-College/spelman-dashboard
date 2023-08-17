import {describe, expect, test} from '@jest/globals';

import { formatPlot, reduceIntersection, keyFromKeys } from './plotting'
const dataSingleKey = [
    {
	value: 1,
	key: 'soap'
    },
    {
	value: 1,
	key: 'soap'
    },
    {
	value: 100,
	key: 'donut'
    },
    {
	value: 100,
	key: 'donut'
    },
    {
	value: 100,
	key: 'donut'
    }
]

const data2Keys = [
    {
	value: 1,
	key: 'soap',
	water: 'clear',
    },
    {
	value: 1,
	key: 'soap',
	water: 'clear',
    },
    {
	value: 100,
	key: 'donut',
	water: 'non-potable',
    },
    {
	value: 100,
	key: 'donut',
	water: 'non-potable',
    },
    {
	value: 100,
	key: 'donut',
	water: 'non-potable',
    },
    {
	value: 100,
	key: 'donut',
	water: 'muddy',
    }
]

describe('formatPlot', () => {
    test('adds key/value correctly', () => {
        const data = [{}, {}]
	const got = formatPlot(data, 'key', 'cats')

        expect(got).toEqual(
	    [
		{'key': 'cats'},
		{'key': 'cats'}
	    ]
	)
    })
})


describe('keyFromKeys', () => {
    const data = {
	'big': 'large',
	'loud': 'sound',
	'red': 'color'
    }

    test('returns key correctly', () => {
	let got = keyFromKeys(data, 'big', 'loud')
        expect(got).toEqual('_large_sound')

	// re-order creates same key
	got = keyFromKeys(data, 'loud', 'big')
        expect(got).toEqual('_large_sound')

	got = keyFromKeys(data, 'loud', 'big', 'red')
        expect(got).toEqual('_large_sound_color')
    })
    test('throws on missing key', () => {
        expect(() => {
	    keyFromKeys(data, 'what-is-this')
	}).toThrow('object is missing key: what-is-this')
    })
})

describe('reduceIntersection', () => {

    test('single key will reduce correctly', () => {
	let got = reduceIntersection(dataSingleKey, 'value', 'key')
	got = got.sort((a, b) => {
	    if (a.key < b.key) {
		return 1
	    }
	    if (a.key > b.key) {
		return -1
	    }
	    return 0
	})
	expect(got).toEqual(
	    [
		{
		    "key": "soap",
		    "value": 2,
		},
		{
		    "key": "donut",
		    "value": 300,
		},
	    ]
	)
    })
    test('2 keys will reduce correctly', () => {
	let got = reduceIntersection(data2Keys, 'value', 'key', 'water')
	got = got.sort((a, b) => {
	    if (a.key < b.key) {
		return 1
	    }
	    if (a.key > b.key) {
		return -1
	    }
	    return 0
	})
	expect(got).toEqual(
	    [
		{
		    "key": "soap",
		    "value": 2,
		    "water": "clear",
		},
		{
		    "key": "donut",
		    "value": 300,
		    "water": "non-potable",
		},
		{
		    "key": "donut",
		    "value": 100,
		    "water": "muddy",
		},
	    ]
	)
    })
})
