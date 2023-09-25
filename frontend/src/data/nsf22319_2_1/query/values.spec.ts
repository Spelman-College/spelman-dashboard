import { describe, expect, test } from '@jest/globals'
import { Query_nsf22319_2_1_values } from './values'
import { Query } from '../../queries/query'

const data: Query_nsf22319_2_1_values = new Query_nsf22319_2_1_values()

const male = new Query('gender', 'Male')
const masters_degree = new Query('education', 'MastersDegree')
const doc_degree = new Query('education', 'DoctorateDegree')
const black = new Query('race', 'Black')
const notknown = new Query('race', 'UnknownRace')
const citizen = new Query('citizenship', 'Citizen')
const visa = new Query('citizenship', 'VisaHolder')

describe('nsf22319_2_1 query single dimenions that are not reported alone', () => {
  test('query single category gender', () => {
    const out = data.query(male)
    expect(out.results).toEqual([
      'Count_Student_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree_Male'
    ])
  })

  test('query single category race', () => {
    const out = data.query(black)
    expect(out.results).toEqual([
      'Count_Student_Citizen_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree_NotHispanicOrLatino_Black'
    ])
  })
})
describe('nsf22319_2_1 query single dimension that is expected to return a value', () => {
  test('query single category masters degree', () => {
    const out = data.query(masters_degree)
    expect(out.results).toEqual(['Count_Student_ScienceOrEngineeringOrHealth_MastersDegree'])
  })

  test('query citizens', () => {
    const out = data.query(citizen)
    expect(out.results).toEqual([
      'Count_Student_Citizen_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree'
    ])
  })

  test('query visa holders', () => {
    const out = data.query(visa)
    expect(out.results).toEqual([
      'Count_Student_VisaHolder_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree_UnknownEthnicity'
    ])
  })

  test('query unknown race', () => {
    const out = data.query(notknown)
    expect(out.results).toEqual([
      'Count_Student_Citizen_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree_UnknownEthnicity_UnknownRace'
    ])
  })
})

describe('nsf22319_2_1 query 2 categories', () => {
  test('query black citizens', () => {
    const out = data.query(citizen, black)
    expect(out.results).toEqual([
      'Count_Student_Citizen_ScienceOrEngineeringOrHealth_MastersDegreeOrDoctorateDegree_NotHispanicOrLatino_Black'
    ])
  })

  test('query citizens with masters ', () => {
    const out = data.query(citizen, masters_degree)
    expect(out.results).toEqual([
      'Count_Student_Citizen_ScienceOrEngineeringOrHealth_MastersDegree'
    ])
  })

  test('query visa holding doctorate degrees', () => {
    const out = data.query(visa, doc_degree)
    expect(out.results).toEqual([
      'Count_Student_VisaHolder_ScienceOrEngineeringOrHealth_DoctorateDegree_UnknownEthnicity'
    ])
  })
})
