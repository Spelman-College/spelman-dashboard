import { describe, expect, test } from '@jest/globals';
import { Query_nces322_50 } from './query'
import { Query } from '../queries/query'
import { Categories } from './categories';

const demo = new Query_nces322_50()

const black = new Query('race', 'Black')
const nonresident = new Query('residentStatus', 'NonUSResident')

const eng_tech = new Query('bachelorsDegreeMajor', 'BachelorOfEngineeringTechnologiesMajor')
const eng_eng_tech = new Query('bachelorsDegreeMajor', 'BachelorOfEngineeringTechnologiesMajor', 'BachelorOfEngineeringMajor')
const female = new Query('gender', 'Female')



describe('test omitted summary statistic', () => {

    test('test race dependency', () => {
        let out = demo.query(black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegree_Female_Black",
            "Count_Person_EducationalAttainmentBachelorsDegree_Male_Black",
            
        ])
    })

    test('test race gender', () => {
        let out = demo.query(black, female)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegree_Female_Black"
        ])
    })

    test('test gender alone', () => {
        let out = demo.query(female)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegree_Female"
        ])
    })

    test('test non us resident dependency', () => {
        let out = demo.query(nonresident)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_EducationalAttainmentBachelorsDegree_Female_NonUSResident",
            "Count_Person_EducationalAttainmentBachelorsDegree_Male_NonUSResident"
        ])
    })

    test('test bachelorsDegreeMajor dependency', () => {
        let out = demo.query(eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([  
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female",
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Male",
        ])
    })

    test('test 2 majors bachelorsDegreeMajor dependency', () => {
        let out = demo.query(eng_eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([  
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female",
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Male",
            "Count_Person_BachelorOfEngineeringMajor_EducationalAttainmentBachelorsDegree_Female",
            "Count_Person_BachelorOfEngineeringMajor_EducationalAttainmentBachelorsDegree_Male"
        ])
    })
})

describe('test 2 category queries', () => {

    test('test race major', () => {
        let out = demo.query(black, eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_Black",
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Male_Black"
        ])
    })

    test('test gender major', () => {
        let out = demo.query(female, eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female"
        ])
    })

    test('test race nonresident combo, expect empty', () => {
        let out = demo.query(nonresident, black)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
        ])
    })

    test('test nonresident major', () => {
        let out = demo.query(nonresident, eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_NonUSResident",
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Male_NonUSResident"
        ])
    })

    test('test nonresident 2 majors', () => {
        let out = demo.query(nonresident, eng_eng_tech)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_NonUSResident",
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Male_NonUSResident",
            "Count_Person_BachelorOfEngineeringMajor_EducationalAttainmentBachelorsDegree_Female_NonUSResident",
            "Count_Person_BachelorOfEngineeringMajor_EducationalAttainmentBachelorsDegree_Male_NonUSResident"
        ])
    })


})

describe('test 3 category queries', () => {

    test('test race major gender', () => {
        let out = demo.query(black, eng_tech, female)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_Black",
        ])
    })

    test('test gender major nonresident', () => {
        let out = demo.query(female, eng_tech, nonresident)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_NonUSResident"
        ])
    })

    test('test gender 2 majors nonresident', () => {
        let out = demo.query(female, eng_tech, nonresident)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
            "Count_Person_BachelorOfEngineeringTechnologiesMajor_EducationalAttainmentBachelorsDegree_Female_NonUSResident"
        ])
    })

    test('test race nonresident combo, expect empty', () => {
        let out = demo.query(nonresident, black, female)
        expect(out.error).toEqual(undefined)
        expect(out.results).toEqual([
        ])
    })

})