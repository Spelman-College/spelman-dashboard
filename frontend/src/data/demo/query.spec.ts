import { describe, expect, test } from '@jest/globals'
import { Query_demo } from './query'
import { Query } from '../queries/query'

const demo = new Query_demo()

const female = new Query('gender', 'Female')
const male = new Query('gender', 'Male')
const male_female = new Query('gender', 'Male', 'Female')

const twenty_to_39 = new Query('age', '25To39Years')
const all_majors = new Query(
  'major',
  'BachelorOfEducationMajor',
  'BachelorOfScienceAndEngineeringMajor',
  'BachelorOfArtsHumanitiesAndOtherMajor',
  'BachelorOfBusinessMajor'
)
const education = new Query('major', 'BachelorOfEducationMajor')
describe('demo query', () => {
  test('test dependency', () => {
    let out = demo.query(female, twenty_to_39)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_25To39Years_BachelorOfEducationMajor_Female',
      'Count_Person_25To39Years_BachelorOfScienceAndEngineeringMajor_Female',
      'Count_Person_25To39Years_BachelorOfScienceAndEngineeringRelatedMajor_Female',
      'Count_Person_25To39Years_BachelorOfArtsHumanitiesAndOtherMajor_Female',
      'Count_Person_25To39Years_BachelorOfBusinessMajor_Female'
    ])
  })
})

describe('demo query', () => {
  test('test 3 categories', () => {
    let out = demo.query(female, education, twenty_to_39)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual(['Count_Person_25To39Years_BachelorOfEducationMajor_Female'])
  })

  test('test 2 categories', () => {
    let out = demo.query(education, twenty_to_39)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual(['Count_Person_25To39Years_BachelorOfEducationMajor'])
  })

  test('test 1 category', () => {
    let out = demo.query(education)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual(['Count_Person_BachelorOfEducationMajor'])
  })
})
