import { describe, expect, test } from '@jest/globals';
import { Query_nsf23313_2_1_pct } from './pct'
import { Query } from '../../queries/query'

const data: Query_nsf23313_2_1_pct = new Query_nsf23313_2_1_pct()

const male = new Query('gender', 'Male')


const masters_degree = new Query('education', 'MastersDegree')
const doc_degree = new Query('education', 'DoctorateDegree')
const black = new Query('race', 'Black')
const notknown = new Query('race', 'UnknownRace')

const citizen = new Query('citizenship', 'Citizen')
const visa = new Query('citizenship', 'VisaHolder')

describe('nsf23313_2_1 query single dimenions that are not reported alone', () => {
    test('query single category gender', () => {
        const out = data.query(male)
        expect(out.results).toEqual([
            "Percent_Male_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree"
        ])
    })

    test('query single category race', () => {
        const out = data.query(black)
        expect(out.results).toEqual([
            "Percent_Citizen_NotHispanicOrLatino_Black_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree"
        ])
    })
})
describe('nsf23313_2_1 query single dimension that is expected to return a value', () => {
    test('query single category masters degree', () => {
        const out = data.query(masters_degree)
        expect(out.results).toEqual([
        ])
    })

    test('query citizens', () => {
        const out = data.query(citizen)
        expect(out.results).toEqual([
            'Percent_Citizen_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree',
        ])
    })

    test('query visa holders', () => {
        const out = data.query(visa)
        expect(out.results).toEqual([
            'Percent_UnknownEthnicity_VisaHolder_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree',
        ])
    })

    test('query unknown race', () => {
        const out = data.query(notknown)
        expect(out.results).toEqual([
            'Percent_Citizen_UnknownEthnicity_UnknownRace_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree',
        ])
    })
})

describe('nsf23313_2_1 query 2 categories', () => {

    test('query black  citizens', () => {
        const out = data.query(citizen,black)
        expect(out.results).toEqual(["Percent_Citizen_NotHispanicOrLatino_Black_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree"])
    })

    test('query citizens with masters ', () => {
        const out = data.query(citizen, masters_degree)
        expect(out.results).toEqual(["Percent_Citizen_In_Count_Student_ScienceOrEngineeringOrHealth_MastersDegree"])
    })

    test('query visa holding doctorate degrees', () => {
        const out = data.query(visa, doc_degree)
        expect(out.results).toEqual(["Percent_UnknownEthnicity_VisaHolder_In_Count_Student_ScienceOrEngineeringOrHealth_DoctorateDegree"])
    })
})