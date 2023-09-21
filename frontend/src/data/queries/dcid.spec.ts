import { describe, expect, test } from '@jest/globals'
import { Dcid, DcidFilter } from './dcid.ts'

describe('Dcid', () => {
  test('constructor', () => {
    const dcidOne = 'ignore_this_dimOne_dimTwo_dimThree'
    const dim2CatOne = {
      dimOne: 'fancy',
      dimTwo: 'fancy',
      dimThree: 'regular'
    }
    const filterOne = {
      ignorePrefix: 'ignore_this'
    } as DcidFilter

    const dcid = new Dcid(dcidOne, filterOne, dim2CatOne)
    expect(dcid.dcid).toEqual(dcidOne)
    expect(dcid.dimensions.size).toEqual(Object.keys(dim2CatOne).length)
    for (const dim in dim2CatOne) {
      const cat = dim2CatOne[dim]
      const cdim = `${cat}:${dim}`
      expect(dcid.dimensions.has(cdim)).toEqual(true)
    }
  })

  test('Ignoring explict dimension adds the "all dimensions for this category" dimension to the index.', () => {
    const dcidTwo = 'dimOne_dimTwo_summaryStatFour'
    const dim2CatTwo = {
      dimOne: 'fancy',
      dimTwo: 'fancy',
      summaryStatFour: 'regular'
    }
    const filterTwo = {
      omitDimensions: new Set(['summaryStatFour'])
    } as DcidFilter
    const dcid = new Dcid(dcidTwo, filterTwo, dim2CatTwo)
    expect(dcid.dcid).toEqual(dcidTwo)

    expect(dcid.dimensions.size).toEqual(3)
    expect(dcid.dimensions.has('fancy:dimOne')).toEqual(true)
    expect(dcid.dimensions.has('fancy:dimTwo')).toEqual(true)
    expect(dcid.dimensions.has('regular:')).toEqual(true)
  })
})
