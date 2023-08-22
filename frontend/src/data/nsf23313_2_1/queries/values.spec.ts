import { describe, expect, test } from '@jest/globals';
import { Query_nsf23313_2_1_values } from './values'
import { Query } from '../../queries/query'

const data: Query_nsf23313_2_1_values = new Query_nsf23313_2_1_values()

const male = new Query('gender', 'Male')
const all_genders = new Query('gender', 'Male', 'Female')
const all_ethnicities = new Query(
    'ethnicity',
    'HispanicOrLatino',
    'NotHispanicOrLatino',
    'UnknownEthnicity'
)

const hispanic = new Query('ethnicity', 'HispanicOrLatino')
const masters_degree = new Query('education', 'EducationalAttainmentMastersDegree')
const race = new Query('race', 'Black')

const citizen = new Query('citizenship', 'Citizen')

describe('nsf23313_2_1 query single dimenions that are not reported alone', () => {
    test('query single category gender', () => {
        const out = data.query(male)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentGraduateSchoolOrPostGraduate_Male"
        ])
    })

    test('query single category ethnicity', () => {
        const out = data.query(hispanic)
        expect(out.results).toEqual([
            "Count_Person_Citizen_EducationalAttainmentGraduateSchoolOrPostGraduate_HispanicOrLatino"
        ])
    })

    test('query single category race', () => {
        const out = data.query(race)
        expect(out.results).toEqual([
            "Count_Person_Citizen_EducationalAttainmentGraduateSchoolOrPostGraduate_NotHispanicOrLatino_Black"
        ])
    })
})
describe('nsf23313_2_1 query single dimension that is expected to return a value', () => {
    test('query single category masters degree', () => {
        const out = data.query(masters_degree)
        expect(out.results).toEqual([
            'Count_Person_EducationalAttainmentMastersDegree',
        ])
    })

    test('query citizens', () => {
        const out = data.query(citizen)
        expect(out.results).toEqual([
            'Count_Person_Citizen_EducationalAttainmentGraduateSchoolOrPostGraduate',
        ])
    })
})
