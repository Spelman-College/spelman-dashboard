import { describe, expect, test } from '@jest/globals'
import { Query_nsf19304 } from './query'
import { Categories } from './categories'
import { Query } from '../queries/query'

const nsf19304 = new Query_nsf19304()

const asian = new Query('ethnicity', 'Asian')
const black_asian = new Query('ethnicity', 'BlackOrAfricanAmericanAloneOrAfricanAmericanAlone', 'Asian')
const life_science = new Query('occupation', 'SOCLifeScientistsOccupation')
const female = new Query('gender', 'Female')
const tenured = new Query('tenure', 'Tenured')
const male = new Query('gender', 'Male')
const male_female = new Query('gender', 'Male', 'Female')
const occupations_a = new Query(
  'occupation',
  'SOCLifeScientistsOccupation',
  'SOCMathematicalScienceOccupation'
)
const all_ethnicities = new Query('ethnicity', ...Categories['ethnicity'])

describe('nsf19304 query subset of subset dependent category', () => {
  test('1 gender all ethnicities explicit', () => {
    let out = nsf19304.query(female, all_ethnicities)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female'
    ])
  })

  test('1 gender all ethnicities implicit', () => {
    let out = nsf19304.query(female)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female'
    ])
  })

  test('subset of ethnicity returns dcids for both genders', () => {
    let out = nsf19304.query(asian)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_Asian',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_Asian'
    ])

    out = nsf19304.query(black_asian)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_Asian',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_Asian'
    ])

    out = nsf19304.query(occupations_a, black_asian)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_SOCLifeScientistsOccupation_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_SOCLifeScientistsOccupation_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_SOCLifeScientistsOccupation_Asian',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_SOCLifeScientistsOccupation_Asian',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_SOCMathematicalScienceOccupation_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_SOCMathematicalScienceOccupation_BlackOrAfricanAmericanAloneOrAfricanAmericanAlone',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Male_SOCMathematicalScienceOccupation_Asian',
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_SOCMathematicalScienceOccupation_Asian'
    ])
  })
})

describe('nsf19304 query categories with no dependencies', () => {
  const nsf19304 = new Query_nsf19304()
  test('single occupation', () => {
    let out = nsf19304.query(life_science)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_SOCLifeScientistsOccupation'
    ])
  })
  test('single gender, tenured, single ethnicity', () => {
    const out = nsf19304.query(female, tenured, asian)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_Asian_Tenured'
    ])
  })

  test('single gender', () => {
    const out = nsf19304.query(female)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female'
    ])
  })
  test('single gender, tenured', () => {
    const out = nsf19304.query(female, tenured)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Female_Tenured'
    ])
  })

  test('both genders, tenured', () => {
    const out = nsf19304.query(male_female, tenured)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree_UniversityOrCollegeTeacher_Tenured'
    ])
  })
})
