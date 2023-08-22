
export const Categories = {
    'gender': new Set<string>([
        'Male',
        'Female',
    ]),
    'ethnicity': new Set<string>([
        'HispanicOrLatino',
        'AmericanIndianOrAlaskaNativeAlone',
        'Black',
        'TwoOrMoreRaces',
        'WhiteAlone',

        // AsianOrPacificIslander is the sum of both Asian AND OtherPacificIslander
        // 'AsianOrPacificIslander',
        'Asian',
        'OtherPacificIslander',

        // Total for this category is reported, including this data.
        'NonUSResident',
    ]),
    'education': new Set<string>([
        'EducationalAttainment9ThTo12ThGradeNoDiploma',
        'EducationalAttainmentAssociatesDegree',
        'EducationalAttainmentBachelorsDegree',
        'EducationalAttainmentCollegeGraduate',
        'EducationalAttainmentDoctorateDegree',
        'EducationalAttainmentMastersDegree',
    ]),
}
