import * as dims from '../queries/dimensions'

export const Categories = {
  ethnicity: new Set<string>([
    dims.AmericanIndianOrAlaskaNative,
    dims.Asian,
    dims.BlackOrAfricanAmericanAlone,
    dims.HispanicOrLatino,
    dims.OtherPacificIslander,
    dims.TwoOrMoreRaces,
    dims.WhiteAlone,
    dims.AmericanIndianOrAlaskaNativeAlone,
    dims.Black,
    dims.HawaiianNativeOrPacificIslander,
    dims.NonUSResident,
  ]),
  gender: new Set<string>([dims.Male, dims.Female]),
  occupation: new Set<string>([
    dims.SOCComputerMathematicalOccupation,
    dims.SOCEngineersOccupation,
    dims.SOCLifeScientistsOccupation,
    dims.SOCPhysicalScientistsOccupation,
    dims.SOCSocialScientistsRelatedWorkersOccupation,
    dims.ScienceAndEngineeringOccupation,
    dims.ScienceAndEngineeringRelatedOccupation,
    dims.NonScienceAndEngineeringOccupation,
  ])
}
