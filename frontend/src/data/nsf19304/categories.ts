export const Categories = {
  gender: new Set<string>(['Male', 'Female']),
  ethnicity: new Set<string>([
    'HispanicOrLatino',
    'OtherPacificIslander',
    'AmericanIndianOrAlaskaNative',
    'Asian',
    'Black',
    'TwoOrMoreRaces',
    'WhiteAlone'
  ]),
  tenure: new Set<string>(['Tenured', 'NotOnTenureTrack', 'OnTenureTrack', 'TenureNotApplicable']),
  occupation: new Set<string>([
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
    'NonScienceAndEngineeringOccupation'
  ])
}
