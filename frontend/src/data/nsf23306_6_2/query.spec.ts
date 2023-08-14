import { describe, expect, test } from '@jest/globals';
import { Query_nsf23306_6_2 } from './query'
import { Query } from '../queries/query'

const demo = new Query_nsf23306_6_2()

const asian = new Query('ethnicity', 'Asian')

const hispanic = new Query('ethnicity', 'HispanicOrLatino')

const asian_black = new Query('ethnicity', 'Black', 'Asian')

const male = new Query('gender', 'Male')
const occupations = new Query('occupation',
    'SOCLifeScientistsOccupation',
    'SOCMathematicalScienceOccupation')


describe('demo query', () => {
    test('test 1 gender', () => {
        let out = demo.query(male)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Male',
        ])
    })

    test('test 1 ethnicity', () => {
        let out = demo.query(asian)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            'Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Asian',
        ])
    })

    test('test 2 ethnicity', () => {
        let out = demo.query(asian_black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Asian",
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Black",
        ])
    })

    test('test 2 occupations', () => {
        let out = demo.query(occupations)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation",
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation",
        ])
    })

    test('test 2 occupations 2 ethnicty', () => {
        let out = demo.query(occupations, asian_black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation_Black",
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation_Black",
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation_Asian",
            "Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation_Asian",
        ])
    })
})
