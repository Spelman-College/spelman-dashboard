export const Categories = {
  age: new Set<string>(['29OrLessYears', '30To39Years', '40To49Years', '50To75Years']),
  ethnicity: new Set<string>([
    'AmericanIndianOrAlaskaNativeAlone',
    'Asian',
    'BlackOrAfricanAmericanAlone',
    'HispanicOrLatino',
    'NativeHawaiianOrOtherPacificIslanderAlone',
    'TwoOrMoreRaces',
    'WhiteAlone'
  ]),
  occupation: new Set<string>([
    'SOCBiologicalScientistsAllOtherOccupation',
    'SOCComputerMathematicalOccupation',
    'SOCEngineersOccupation',
    'SOCPhysicalScientistsOccupation',
    'SOCSocialScientistsRelatedWorkersOccupation',
    'ScienceAndEngineeringOccupation',
    'ScienceAndEngineeringRelatedOccupation',
    'NonScienceAndEngineeringOccupation'
  ]),
  disability: new Set<string>(['NoDisability', 'WithDisability']),
  citizenship: new Set<string>(['Citizen', 'NotAUSCitizen']),
  gender: new Set<string>(['Female', 'Male'])
}
