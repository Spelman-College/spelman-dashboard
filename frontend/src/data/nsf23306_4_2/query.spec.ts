import {describe, expect, test} from '@jest/globals';
import { Query_nsf23306 } from './query'
import { Query } from '../queries/query'

const nsf23306 = new Query_nsf23306()

const asian = new Query('ethnicity', 'AsianOrPacificIslander')
const black_asian = new Query('ethnicity', 'Black', 'AsianOrPacificIslander')

const female = new Query('gender', 'Female')
const male = new Query('gender', 'Male')
const male_female = new Query('gender', 'Male', 'Female')

const disability = new Query('disability', 'WithDisability')
const no_disability = new Query('disability', 'NoDisability')

const eng_phsysci = new Query('occupation', 'SOCEngineersOccupation', 'SOCPhysicalScientistsOccupation')
const eng = new Query('occupation', 'SOCEngineersOccupation')

const citizen = new Query('citizenship', 'Citizen')

const twenty_nine_under = new Query('age', '29OrLessYears')
const thirty_nine_under = new Query('age', '29OrLessYears', '30To39Years')
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


    test('query summary dimensions', () => {
        let out = nsf23306.query(female, no_disability)
        expect(out.results).toEqual([
            'Median_Earnings_Person_NoDisability_EducationalAttainmentCollegeGraduate_Female'
        ])

        out = nsf23306.query(female)
        expect(out.results).toEqual([
            'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Female'
        ])

        out = nsf23306.query(eng_phsysci, female)
        expect(out.results).toEqual([
            'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Female_SOCEngineersOccupation',
            'Median_Earnings_Person_EducationalAttainmentCollegeGraduate_Female_SOCPhysicalScientistsOccupation',
        ])
    })

    test('query with gender, occupation, disability categories', () => {
        let out = nsf23306.query(eng_phsysci, female, disability)
        expect(out.results).toEqual([
            'Median_Earnings_Person_WithDisability_EducationalAttainmentCollegeGraduate_Female_SOCEngineersOccupation',
            'Median_Earnings_Person_WithDisability_EducationalAttainmentCollegeGraduate_Female_SOCPhysicalScientistsOccupation',
        ])
    })

    test('query with gender, occupation, citizenship', () => {
        let out = nsf23306.query(eng_phsysci, female, citizen)
        expect(out.results).toEqual([
            'Median_Earnings_Person_Citizen_EducationalAttainmentCollegeGraduate_Female_SOCEngineersOccupation',
            'Median_Earnings_Person_Citizen_EducationalAttainmentCollegeGraduate_Female_SOCPhysicalScientistsOccupation',
        ])
    })

    test('query with gender, occupation, ethnicity, age categories', () => {
        let out = nsf23306.query(male_female, eng_phsysci, black_asian, thirty_nine_under)
        expect(out.results).toEqual([
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_Black',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_Black',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_Black',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_Black',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_AsianOrPacificIslander',
        ])

        out = nsf23306.query(eng_phsysci, black_asian, thirty_nine_under)
        expect(out.results).toEqual([
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_Black',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_Black',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCEngineersOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_Black',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_Black',
            'Median_Earnings_Person_29OrLessYears_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_AsianOrPacificIslander',
            'Median_Earnings_Person_30To39Years_EducationalAttainmentCollegeGraduate_SOCPhysicalScientistsOccupation_AsianOrPacificIslander',
        ])
    })

})
