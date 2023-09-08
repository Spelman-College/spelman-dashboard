import { describe, expect, test } from '@jest/globals'
import { Query_pct } from './pct'
import { Query } from '../../queries/query'

const ipeds: Query_pct = new Query_pct()

const male = new Query('gender', 'Male')
const all_genders = new Query('gender', 'Male', 'Female')
const all_ethnicities = new Query(
  'ethnicity',
  'AmericanIndianOrAlaskaNativeAlone',
  'Asian',
  'Black',
  'HispanicOrLatino',
  'OtherPacificIslander',
  'TwoOrMoreRaces',
  'WhiteAlone'
)

const hispanic = new Query('ethnicity', 'HispanicOrLatino')
const associates_degree = new Query('education', 'EducationalAttainmentAssociatesDegree')
const grad = new Query(
  'education',
  'EducationalAttainmentDoctorateDegree',
  'EducationalAttainmentMastersDegree'
)

describe('ipeds_318_45 query single dimenions that are not reported alone', () => {
  test('query single category gender', () => {
    const out = ipeds.query(male)
    expect(out.results).toEqual([])
  })

  test('query single category ethnicity', () => {
    const out = ipeds.query(hispanic)
    expect(out.results).toEqual([])
  })
})
describe('ipeds_318_45 query single dimension that is expected to return a value', () => {
  test('query single category associates degree', () => {
    const out = ipeds.query(associates_degree)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })
})

describe('ipeds_318_45 query pairs of dimensions', () => {
  test('query gender and associates degree', () => {
    const out = ipeds.query(associates_degree, male)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_Male_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query ethnicity and associates degree', () => {
    const out = ipeds.query(associates_degree, hispanic)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_HispanicOrLatino_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query ethnicity and gender alone returns no values', () => {
    const out = ipeds.query(hispanic, male)
    expect(out.results).toEqual([])
  })
})

describe('ipeds_318_45 query 3 dimensions', () => {
  test('query gender, ethnicity, and associates degree', () => {
    const out = ipeds.query(associates_degree, male, hispanic)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_HispanicOrLatino_Male_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query all genders, ethnicity, and associates degree', () => {
    const out = ipeds.query(associates_degree, all_genders, hispanic)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_HispanicOrLatino_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query all genders, all ethnicities, and associates degree', () => {
    const out = ipeds.query(associates_degree, all_genders, all_ethnicities)
    if (out.error != undefined) {
      throw Error(out.error)
    }
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentAssociatesDegree_AsAFractionOf_Count_Person_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query grad degress, male and hispanic', () => {
    const out = ipeds.query(hispanic, male, grad)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentDoctorateDegree_HispanicOrLatino_Male_AsAFractionOf_Count_Person_EducationalAttainmentDoctorateDegree',
      'Count_Person_EducationalAttainmentMastersDegree_HispanicOrLatino_Male_AsAFractionOf_Count_Person_EducationalAttainmentMastersDegree'
    ])
  })
})
