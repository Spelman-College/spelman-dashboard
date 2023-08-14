import { describe, expect, test } from '@jest/globals';
import { Query_nsf23306_6_2 } from './query'
import { Query } from '../queries/query'
import { Categories } from './categories';

const demo = new Query_nsf23306_6_2()

const asian_black = new Query('ethnicity', 'Black', 'Asian')
const occupations = new Query('occupation',
    'SOCLifeScientistsOccupation',
    'SOCComputerMathematicalOccupation')

const all_genders = Categories['gender']

const all_occupations = Categories['occupation']

const all_ethnicities = Categories['ethnicity']

describe('demo query', () => {

    test('test 2 ethnicity', () => {
        let out = demo.query(asian_black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Asian")
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_Black")
    })

    test('test 2 occupations', () => {
        let out = demo.query(occupations)
        expect(out.error).toEqual(undefined)
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation")
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation")
    })

    test('test 2 occupations 2 ethnicty', () => {
        let out = demo.query(occupations, asian_black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation_Black")
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation_Black")
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCLifeScientistsOccupation_Asian")
        expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_SOCComputerMathematicalOccupation_Asian")
    })

    test('test all occupations', () => {
        all_occupations.forEach((occupation) => {
            let query = new Query("occupation", occupation)
            let out = demo.query(query)
            expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_".concat(occupation))
        })
    })
    test('test all ethniticies', () => {
        all_ethnicities.forEach((ethnicity) => {
            let query = new Query("ethnicity", ethnicity)
            let out = demo.query(query)
            expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_".concat(ethnicity))
        })
    })
    test('test all genders', () => {
        all_genders.forEach((gender) => {
            let query = new Query("gender", gender)
            let out = demo.query(query)
            expect(out.results).toContain("Count_Person_EducationalAttainmentBachelorsDegreeOrHigher_".concat(gender))
        })
    })
})
