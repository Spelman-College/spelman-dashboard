import { describe, expect, test } from '@jest/globals'
import { Query_nsf23306 } from './query'
import { Query } from '../queries/query'
import * as dims from '../queries/dimensions'

const nsf23306 = new Query_nsf23306()

const asian = new Query('ethnicity', dims.Asian)
const black_asian = new Query('ethnicity', dims.BlackOrAfricanAmericanAlone, dims.Asian)

const female = new Query('gender', dims.Female)
const male = new Query('gender', dims.Male)
const male_female = new Query('gender', dims.Male, dims.Female)

const disability = new Query('disability', dims.WithDisability)
const no_disability = new Query('disability', dims.NoDisability)

const eng_phsysci = new Query(
  'occupation',
  dims.SOCEngineersOccupation,
  dims.SOCPhysicalScientistsOccupation
)
const eng = new Query('occupation', dims.SOCEngineersOccupation)

const citizen = new Query('citizenship', dims.Citizen)

const twenty_nine_under = new Query('age', dims.age_29orLessyears)
const thirty_nine_under = new Query('age', dims.age_29orLessyears, dims.age_30to39Years)
describe('nsf23306 query keys', () => {
  test('query incompatible dimensions: disability AND ethnicity return no results', () => {
    let out = nsf23306.query(disability, asian)
    expect(out.results).toEqual([])
  })

  test('query incompatible dimensions: citizen status AND ethnicity return no results', () => {
    let out = nsf23306.query(citizen, asian)
    expect(out.results).toEqual([])
  })

  test('query incompatible dimensions: citizen status AND disability status return no results', () => {
    let out = nsf23306.query(citizen, disability)
    expect(out.results).toEqual([])

    out = nsf23306.query(citizen, disability, black_asian, female)
    expect(out.results).toEqual([])
  })

  test('query incompatible dimensions: disability status and ethnicity return no results', () => {
    let out = nsf23306.query(disability, black_asian)
    expect(out.results).toEqual([])
  })

  test('query summary dimensions gender disability', () => {
    let out = nsf23306.query(female, no_disability)
    expect(out.results).toEqual([
      'Median_Earnings_Person_NoDisability_EducationalAttainmentCollegeGraduate_Employed_Female'
    ])
  })

  test('query summary dimensions gender ', () => {
    let out = nsf23306.query(female)
    expect(out.results).toEqual([
      'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Employed_Female'
    ])
  })

  test('query summary dimensions occupation gender ', () => {
    let out = nsf23306.query(eng_phsysci, female)
    expect(out.results).toEqual([
      'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Employed_Female_SOCEngineersOccupation',
      'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Employed_Female_SOCPhysicalScientistsOccupation'
    ])
  })

  test('query with gender, occupation, disability categories', () => {
    let out = nsf23306.query(eng_phsysci, female, disability)
    expect(out.results).toEqual([
      'Median_Earnings_Person_WithDisability_EducationalAttainmentCollegeGraduate_Employed_Female_SOCEngineersOccupation',
      'Median_Earnings_Person_WithDisability_EducationalAttainmentCollegeGraduate_Employed_Female_SOCPhysicalScientistsOccupation'
    ])
  })

  test('query with gender, occupation, citizenship', () => {
    let out = nsf23306.query(eng_phsysci, female, citizen)
    expect(out.results).toEqual([
      'Median_Earnings_Person_Citizen_EducationalAttainmentCollegeGraduate_Employed_Female_SOCEngineersOccupation',
      'Median_Earnings_Person_Citizen_EducationalAttainmentCollegeGraduate_Employed_Female_SOCPhysicalScientistsOccupation'
    ])
  })

  test('query with gender, occupation, ethnicity, age categories', () => {
    let out = nsf23306.query(male_female, eng_phsysci, black_asian, thirty_nine_under)
    expect(out.results).toEqual([
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_Asian',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_Asian',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_Asian',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_Asian'
    ])
  })

  test('query with occupation, ethnicity, age categories', () => {
    let out = nsf23306.query(eng_phsysci, black_asian, thirty_nine_under)
    expect(out.results).toEqual([
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_Asian',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCEngineersOccupation_Asian',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_BlackOrAfricanAmericanAlone',
      'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_Asian',
      'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_Employed_NotHispanicOrLatino_SOCPhysicalScientistsOccupation_Asian'
    ])
  })
})
