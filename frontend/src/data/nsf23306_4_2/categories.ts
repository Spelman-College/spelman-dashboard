import * as dims from '../queries/dimensions'

export const Categories = {
  age: new Set<string>([
    dims.age_29orLessyears,
    dims.age_30to39Years,
    dims.age_40to49Years,
    dims.age_50To75Years
  ]),
  ethnicity: new Set<string>([
    dims.AmericanIndianOrAlaskaNativeAlone,
    dims.Asian,
    dims.BlackOrAfricanAmericanAlone,
    dims.HispanicOrLatino,
    dims.NativeHawaiianOrOtherPacificIslanderAlone,
    dims.TwoOrMoreRaces,
    dims.WhiteAlone
  ]),
  occupation: new Set<string>([
    dims.SOCBiologicalScientistsAllOtherOccupation,
    dims.SOCComputerMathematicalOccupation,
    dims.SOCEngineersOccupation,
    dims.SOCPhysicalScientistsOccupation,
    dims.SOCSocialScientistsRelatedWorkersOccupation,
    dims.ScienceAndEngineeringOccupation,
    dims.ScienceAndEngineeringRelatedOccupation,
    dims.NonScienceAndEngineeringOccupation
  ]),
  disability: new Set<string>([dims.NoDisability, dims.WithDisability]),
  citizenship: new Set<string>([dims.Citizen, dims.NotAUSCitizen]),
  gender: new Set<string>([dims.Male, dims.Female])
}
