import {describe, expect, test} from '@jest/globals';
import { Query_nsf23300_1_10 } from './query'
import { Query } from '../queries/query'

const demo = new Query_nsf23300_1_10()

const asian = new Query('ethnicity', 'Asian')

const black = new Query('ethnicity', 'Black')

const asian_black = new Query('ethnicity', 'Black', 'Asian')

const citizen = new Query('citizenship', 'Citizen')
const citizen_and_visa = new Query('citizenship', 'Citizen', 'VisaHolder')


describe('demo query', () => {
    test('test 1 citizen', () => {
        let out = demo.query(citizen)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
	    'Count_Person_Citizen_EducationalAttainmentDoctorateDegree_Female',
	])
    })

    test('test 1 ethnicity', () => {
        let out = demo.query(asian)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
	    'Count_Person_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Asian',
	])
    })

    test('test 2 citizen', () => {
        let out = demo.query(citizen_and_visa)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
	    "Count_Person_Citizen_EducationalAttainmentDoctorateDegree_Female",
	    "Count_Person_VisaHolder_EducationalAttainmentDoctorateDegree_Female",
	])
    })

    test('test 2 ethnicity', () => {
        let out = demo.query(asian_black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
	    "Count_Person_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Black",
	    "Count_Person_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Asian"
	])
    })

    test('test 2 ethnicity 2 citizenship', () => {
        let out = demo.query(asian_black, citizen_and_visa)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
	    "Count_Person_Citizen_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Black",
	    "Count_Person_VisaHolder_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Black",
	    "Count_Person_Citizen_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Asian",
	    "Count_Person_VisaHolder_EducationalAttainmentDoctorateDegree_NotHispanicOrLatino_Female_Asian"
	])
    })
})
