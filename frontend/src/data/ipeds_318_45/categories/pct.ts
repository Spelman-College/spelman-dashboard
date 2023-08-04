
export const Categories = {
    'gender': new Set<string>([
        'Male',
        'Female',
    ]),
    'ethnicity': new Set<string>([
        'AmericanIndianOrAlaskaNativeAlone',
        'TwoOrMoreRaces',
        'WhiteAlone',
        'Black',
        'HispanicOrLatino',

        // AsianOrPacificIslander is the sum of both Asian AND OtherPacificIslander
        // 'AsianOrPacificIslander',
        'Asian',
        'OtherPacificIslander',
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
