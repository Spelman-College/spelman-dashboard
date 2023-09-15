import { describe, expect, test } from '@jest/globals'
import { Query_nsf23306_6_2 } from './query'
import { Query } from '../queries/query'
import { Categories } from './categories'

const demo = new Query_nsf23306_6_2()

const asian_black = new Query('ethnicity', 'Asian', 'BlackOrAfricanAmericanAlone')
const occupations = new Query(
  'occupation',
  'SOCLifeScientistsOccupation',
  'SOCComputerMathematicalOccupation'
)

const asian = new Query('ethnicity', 'Asian')
const female = new Query('gender', 'Female')
const engineer = new Query('occupation', 'SOCEngineersOccupation')

const all_genders = Categories['gender']

const all_occupations = Categories['occupation']

const all_ethnicities = Categories['ethnicity']

describe('demo query', () => {
  test('test 2 ethnicities', () => {
    let out = demo.query(asian_black)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_Asian',
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_BlackOrAfricanAmericanAlone'
    ])
  })

  test('test 2 occupations', () => {
    let out = demo.query(occupations)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCLifeScientistsOccupation',
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCComputerMathematicalOccupation'
    ])
  })

  test('test 2 occupations 2 ethnicities', () => {
    let out = demo.query(occupations, asian_black)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCLifeScientistsOccupation_Asian',
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCLifeScientistsOccupation_BlackOrAfricanAmericanAlone',
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCComputerMathematicalOccupation_Asian',
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_SOCComputerMathematicalOccupation_BlackOrAfricanAmericanAlone'
    ])
  })

  test('test occupation ethnicity gender', () => {
    let out = demo.query(asian, female, engineer)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_Female_SOCEngineersOccupation_Asian'
    ])
  })

  test('test each occupation', () => {
    all_occupations.forEach((occupation) => {
      let query = new Query('occupation', occupation)
      let out = demo.query(query)
      expect(out.results).toEqual([
        'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_'.concat(occupation)
      ])
    })
  })
  test('test each ethnicity', () => {
    all_ethnicities.forEach((ethnicity) => {
      let query = new Query('ethnicity', ethnicity)
      let out = demo.query(query)
      expect(out.results).toEqual([
        'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_'.concat(ethnicity)
      ])
    })
  })
  test('test each gender', () => {
    all_genders.forEach((gender) => {
      let query = new Query('gender', gender)
      let out = demo.query(query)
      expect(out.results).toEqual([
        'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Employed_'.concat(gender)
      ])
    })
  })
})
