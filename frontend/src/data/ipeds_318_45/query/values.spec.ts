import { describe, expect, test } from '@jest/globals'
import { Query_values } from './values'
import { Query } from '../../queries/query'
import * as d from '../../queries/dimensions'

const ipeds: Query_values = new Query_values()

const male = new Query('gender', d.Male)
const all_genders = new Query('gender', d.Male, d.Female)
const all_ethnicities = new Query(
  'ethnicity',
  d.AmericanIndianOrAlaskaNativeAlone,
  d.Asian,
  d.Black,
  d.HispanicOrLatino,
  d.HawaiianNativeOrPacificIslander,
  d.TwoOrMoreRaces,
  d.WhiteAlone,
  d.NonUSResident
)
const all_edu = new Query(
  'education',
  d.EducationalAttainment9ThTo12ThGradeNoDiploma,
  d.EducationalAttainmentAssociatesDegree,
  d.EducationalAttainmentBachelorsDegree,
  d.EducationalAttainmentDoctorateDegree,
  d.EducationalAttainmentMastersDegree
)
const hispanic = new Query('ethnicity', d.HispanicOrLatino)
const associates_degree = new Query('education', d.EducationalAttainmentAssociatesDegree)
const grad = new Query(
  'education',
  d.EducationalAttainmentDoctorateDegree,
  d.EducationalAttainmentMastersDegree
)

const highschool = new Query('education', d.EducationalAttainment9ThTo12ThGradeNoDiploma)
describe('ipeds_318_45 query single dimenions that are not reported alone', () => {
  test('query gender and explicit everything', () => {
    const out = ipeds.query(male, all_ethnicities, all_edu)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_Male'
    ])
  })

  test('query gender and all ethnicities. notice that we return the explicit summary statistic which is in place of/appears to be a dimension', () => {
    const out = ipeds.query(male, all_ethnicities)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_Male'
    ])
  })
})
describe('ipeds_318_45 query single dimenions that are not reported alone', () => {
  test('query single category gender', () => {
    const out = ipeds.query(male)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_Male'
    ])
  })

  test('query single category ethnicity', () => {
    const out = ipeds.query(hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_HispanicOrLatino'
    ])
  })
})
describe('ipeds_318_45 query single dimension that is expected to return a value', () => {
  test('query single category associates degree', () => {
    const out = ipeds.query(associates_degree)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query highschool no diploma', () => {
    const out = ipeds.query(highschool)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainment9ThTo12ThGradeNoDiploma'
    ])
  })
})

describe('ipeds_318_45 query pairs of dimensions', () => {
  test('query highschool no diploma and hispanic', () => {
    const out = ipeds.query(highschool, hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainment9ThTo12ThGradeNoDiploma_HispanicOrLatino'
    ])
  })
  test('query gender and associates degree', () => {
    const out = ipeds.query(associates_degree, male)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree_Male'
    ])
  })

  test('query ethnicity and associates degree', () => {
    const out = ipeds.query(associates_degree, hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree_HispanicOrLatino'
    ])
  })

  test('query ethnicity and gender alone returns no values', () => {
    const out = ipeds.query(hispanic, male)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_HispanicOrLatino_Male'
    ])
  })

  test('query ethnicity and associates degree', () => {
    const out = ipeds.query(associates_degree, hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree_HispanicOrLatino'
    ])
  })

  test('query ethnicity and gender alone returns summary statistic', () => {
    const out = ipeds.query(hispanic, male)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentCollegeGraduate_HispanicOrLatino_Male'
    ])
  })
})

describe('ipeds_318_45 query 3 dimensions', () => {
  test('query highschool no diploma and hispanic', () => {
    const out = ipeds.query(highschool, hispanic, male)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainment9ThTo12ThGradeNoDiploma_HispanicOrLatino_Male'
    ])
  })

  test('query gender, ethnicity, and associates degree', () => {
    const out = ipeds.query(associates_degree, male, hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree_HispanicOrLatino_Male'
    ])
  })

  test('query all genders, ethnicity, and associates degree', () => {
    const out = ipeds.query(associates_degree, all_genders, hispanic)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree_HispanicOrLatino'
    ])
  })

  test('query all genders, all ethnicities, and associates degree', () => {
    const out = ipeds.query(associates_degree, all_genders, all_ethnicities)
    if (out.error != undefined) {
      throw Error(out.error)
    }
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentAssociatesDegree'
    ])
  })

  test('query grad degress, male and hispanic', () => {
    const out = ipeds.query(hispanic, male, grad)
    expect(out.results).toEqual([
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentDoctorateDegree_HispanicOrLatino_Male',
      'Count_Person_BachelorOfScienceOrTechnologyOrEngineeringOrMathematics_EducationalAttainmentMastersDegree_HispanicOrLatino_Male'
    ])
  })
})
