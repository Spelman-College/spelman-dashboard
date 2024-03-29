import { describe, expect, test } from '@jest/globals'
import { Query_nsf313_30 } from './query'
import { Query } from '../queries/query'
import { Categories } from './categories'

const demo = new Query_nsf313_30()

const black = new Query('race', 'Black')
const four_year = new Query('collegeOrUniversityLevel', 'FourYear')

const private_enrollment = new Query(
  'collegeOrGraduateSchoolEnrollment',
  'EnrolledInPrivateCollegeOrGraduateSchool'
)
const female = new Query('gender', 'Female')

const all_genders = Categories['gender']

const all_enrollment_types = Categories['collegeOrGraduateSchoolEnrollment']

const all_university_levels = Categories['collegeOrUniversityLevel']

describe('test omitted summary statistic', () => {
  test('test race catgeory dependency', () => {
    let out = demo.query(black)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInCollegeOrGraduateSchool_Female_HBCU_Black',
      'Count_Person_EnrolledInCollegeOrGraduateSchool_Male_HBCU_Black'
    ])
  })

  test('test race gender', () => {
    let out = demo.query(black, female)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInCollegeOrGraduateSchool_Female_HBCU_Black'
    ])
  })

  test('test gender alone', () => {
    let out = demo.query(female)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual(['Count_Person_EnrolledInCollegeOrGraduateSchool_Female_HBCU'])
  })
})

describe('test each single dimension', () => {
  test('test each enrollement', () => {
    all_enrollment_types.forEach((type) => {
      let query = new Query('collegeOrGraduateSchoolEnrollment', type)
      let out = demo.query(query)
      expect(out.results).toEqual(['Count_Person_'.concat(type).concat('_HBCU')])
    })
  })

  test('test each university level', () => {
    all_genders.forEach((gender) => {
      let query_a = new Query('gender', gender)
      let query_b = new Query(
        'collegeOrGraduateSchoolEnrollment',
        'EnrolledInPrivateCollegeOrGraduateSchool'
      )
      let out = demo.query(query_a, query_b)
      expect(out.results).toEqual([
        'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_'.concat(gender).concat('_HBCU')
      ])
    })
  })

  test('test each gender', () => {
    all_university_levels.forEach((level) => {
      let query_a = new Query('collegeOrUniversityLevel', level)
      let query_b = new Query(
        'collegeOrGraduateSchoolEnrollment',
        'EnrolledInPublicCollegeOrGraduateSchool'
      )
      let query_c = new Query('gender', 'Female')
      let out = demo.query(query_a, query_b, query_c)
      expect(out.results).toEqual([
        'Count_Person_EnrolledInPublicCollegeOrGraduateSchool_'.concat(level).concat('_Female_HBCU')
      ])
    })
  })
})

describe('test combination queries', () => {
  test('test race enrollment', () => {
    let out = demo.query(black, private_enrollment)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_Female_HBCU_Black',
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_Male_HBCU_Black'
    ])
  })

  test('test race gender enrollment', () => {
    let out = demo.query(female, private_enrollment, black)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_Female_HBCU_Black'
    ])
  })

  test('test 1 enrollment types 1 university level', () => {
    let query_a = new Query(
      'collegeOrGraduateSchoolEnrollment',
      'EnrolledInPublicCollegeOrGraduateSchool'
    )
    let query_b = new Query('collegeOrUniversityLevel', 'TwoYear')
    let out = demo.query(query_a, query_b)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInPublicCollegeOrGraduateSchool_TwoYear_HBCU'
    ])
  })

  test('test 1 enrollment types 1 university level 1 race ', () => {
    let query_a = new Query(
      'collegeOrGraduateSchoolEnrollment',
      'EnrolledInPrivateCollegeOrGraduateSchool'
    )
    let query_b = new Query('collegeOrUniversityLevel', 'TwoYear')
    let query_c = new Query('race', 'Black')
    let out = demo.query(query_a, query_b, query_c)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_TwoYear_Female_HBCU_Black',
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_TwoYear_Male_HBCU_Black'
    ])
  })

  test('test 1 enrollment types 1 university level 1 race 1 gender', () => {
    let query_a = new Query(
      'collegeOrGraduateSchoolEnrollment',
      'EnrolledInPrivateCollegeOrGraduateSchool'
    )
    let query_b = new Query('collegeOrUniversityLevel', 'TwoYear')
    let query_c = new Query('race', 'Black')
    let query_d = new Query('gender', 'Female')
    let out = demo.query(query_a, query_b, query_c, query_d)
    expect(out.error).toEqual(undefined)
    expect(out.results).toEqual([
      'Count_Person_EnrolledInPrivateCollegeOrGraduateSchool_TwoYear_Female_HBCU_Black'
    ])
  })
})
