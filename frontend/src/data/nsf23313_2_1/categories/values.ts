
export const Categories = {
    'gender': new Set<string>([
        'Male',
        'Female',
    ]),
    'ethnicity': new Set<string>([
        'HispanicOrLatino',
        'NotHispanicOrLatino',
        'UnknownEthnicity'
    ]),
    'race': new Set<string>([
        'NativeHawaiianOrOtherPacificIslanderAlone',
        'Black',
        'TwoOrMoreRaces',
        'WhiteAlone',
        'Asian',
        'AmericanIndianOrAlaskaNativeAlone',
        'UnknownRace',
    ]),
    'education': new Set<string>([
        'EducationalAttainmentDoctorateDegree',
        'EducationalAttainmentMastersDegree',
    ]),
    'citizenship': new Set<string>([
        'Citizen',
        'VisaHolder',
    ]),
    'occupation': new Set<string>([
        'PostDocAppointeeOccupation',
        'NonFacultyResearcherOccupation',
    ]),
}
