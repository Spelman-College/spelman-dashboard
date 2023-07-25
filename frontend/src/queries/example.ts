import { query2dcids, Query, CategoryType } from "./query"
import { Dcid, DcidFilter } from "./dcids"

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
    'tenure': new Set<string>([
        'Tenured',
        'NotOnTenureTrack',
        'OnTenureTrack',
        'TenureNotApplicable',
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
    const values = Categories[key]
    values.forEach((value) => {
        Dim2Cat[value] = key
    })
})
// console.log(Dim2Cat)

const filter: DcidFilter = {
    ignorePrefix: 'Count_Person_ScienceAndEngineeringRelatedMajor_EducationalAttainmentDoctorateDegree',
    omitDimensions: new Set<string>([
        'UniversityOrCollegeTeacher'
    ])
}

const dcids = []
DCIDS.forEach((id) => {
    dcids.push(new Dcid(id, filter, Dim2Cat))
})

//// If I have a partial enthicity category(not querying ALL ethnicities), I need
//// to query each gender separately; that is, I can't use the `${category}:` dimension
//// for gender.
const catDeps: [string, string][] = [['ethnicity', 'gender']]

// Since there's a query for a subset of ethnicity, and dimensions for gender,
// we'll need to count all genders.
const a = new Query('ethnicity', 'Asian')

console.log('Asian')
console.log(query2dcids(dcids, Categories, catDeps, a))

// Since there's a query for a subset of ethnicity, and dimensions for gender,
// we'll need to count all genders.

const q2 = new Query('ethnicity', 'Black', 'Asian')
console.log('Black, Asian')
console.log(query2dcids(dcids, Categories, catDeps, q2))

// A subset of ethnicity but also a subset of the gender dimensions;
// here, we'll only pull the targeted gender keys.

const f = new Query('gender', 'Female')
const ten = new Query('tenure', 'Tenured')

console.log('Female, Asian, tenured')
console.log(query2dcids(dcids, Categories, catDeps, f, ten, a))


const lifesc = new Query('occupation', 'SOCLifeScientistsOccupation')

// Only query the single key
console.log('SOCLifeScientistsOccupation')
console.log(query2dcids(dcids, Categories, catDeps, lifesc))


// Only query the single key
console.log('Female')
console.log(query2dcids(dcids, Categories, catDeps, f))

// Only query the single key
console.log('Female, tenured')
console.log(query2dcids(dcids, Categories, catDeps, f, ten))


// Select all keys
const q = new Query('gender', 'Male')
const q3 = new Query('occupation',
                     'SOCLifeScientistsOccupation',
                     'SOCMathematicalScienceOccupation')
console.log('All genders, Black and Asian, SOCLifeScientistsOccupation, SOCMathematicalScienceOccupation')
console.log(query2dcids(dcids, Categories, catDeps, q, q2, q3))
