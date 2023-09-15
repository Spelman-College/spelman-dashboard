export const Categories = {
  ethnicity: new Set<string>([
    'AmericanIndianOrAlaskaNative',
    'Asian',
    'BlackOrAfricanAmericanAlone',
    'HispanicOrLatino',
    'OtherPacificIslander',
    'TwoOrMoreRaces',
    'WhiteAlone'
  ]),
  gender: new Set<string>(['Male', 'Female']),
  occupation: new Set<string>([
    'SOCComputerMathematicalOccupation',
    'SOCEngineersOccupation',
    'SOCLifeScientistsOccupation',
    'SOCPhysicalScientistsOccupation',
    'SOCSocialScientistsRelatedWorkersOccupation',
    'ScienceAndEngineeringOccupation',
    'ScienceAndEngineeringRelatedOccupation',
    'NonScienceAndEngineeringOccupation'
  ])
}
