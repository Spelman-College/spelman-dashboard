import { query2dcids, Query, CategoryType } from "./query"
import { Dcid } from "./dcids"

import { DCIDS } from "./example_dcids"


const Categories = {
    'gender': new Set<string>([
        'Male',
        'Female',
    ]),
    'ethnicity': new Set<string>([
        'HispanicOrLatino',
        'OtherPacificIslander',
        'AmericanIndianOrAlaskaNative',
        'Asian',
        'Black',
        'TwoOrMoreRaces',
        'WhiteAlone',
    ]),
    'occupation': new Set<string>([
        'SOCComputerMathematicalOccupation',
        'SOCEngineersOccupation',
        'SOCLifePhysicalSocialScienceOccupation',
        'SOCLifeScientistsOccupation',
        'SOCMathematicalScienceOccupation',
        'SOCPhysicalScientistsOccupation',
        'SOCPsychologistsOccupation',
        'SOCSocialScientistsRelatedWorkersOccupation',
        'ScienceAndEngineeringOccupation',
        'ScienceAndEngineeringRelatedOccupation',
        'NonScienceAndEngineeringOccupation',
    ]),
}

// Dimensions to Category mapping.
const Dim2Cat = {}
// console.log(Categories)

Object.keys(Categories).forEach((key) => {
    console.log(key)
    const values = Categories[key]
    values.forEach((value) => {
        Dim2Cat[value] = key
    })
})
// console.log(Dim2Cat)

const Prefix = 'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree'
const dcids = []
DCIDS.forEach((id) => {
    dcids.push(new Dcid(id, Prefix, Dim2Cat))
})


const q = new Query('gender', 'Male', 'Female')
const q2 = new Query('ethnicity', 'Black', 'Asian')
const q3 = new Query('occupation',
                     'SOCLifeScientistsOccupation',
                     'SOCMathematicalScienceOccupation')

console.log(query2dcids(dcids, Categories, q, q2, q3))
