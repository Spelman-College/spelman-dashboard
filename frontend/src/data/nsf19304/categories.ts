import * as dims from '../queries/dimensions'

export const Categories = {
  gender: new Set<string>([dims.Male, dims.Female]),
  ethnicity: new Set<string>([
    dims.HispanicOrLatino,
    dims.NativeHawaiianOrOtherPacificIslanderAlone,
    dims.AmericanIndianOrAlaskaNative,
    dims.Asian,
    dims.BlackOrAfricanAmericanAlone,
    dims.TwoOrMoreRaces,
    dims.WhiteAlone
  ]),
  tenure: new Set<string>([
    dims.Tenured,
    dims.NotOnTenureTrack,
    dims.OnTenureTrack,
    dims.TenureNotApplicable
  ]),
  occupation: new Set<string>([
    dims.SOCComputerMathematicalOccupation,
    dims.SOCEngineersOccupation,
    dims.SOCLifePhysicalSocialScienceOccupation,
    dims.SOCLifeScientistsOccupation,
    dims.SOCMathematicalScienceOccupation,
    dims.SOCPhysicalScientistsOccupation,
    dims.SOCPsychologistsOccupation,
    dims.SOCSocialScientistsRelatedWorkersOccupation,
    dims.ScienceAndEngineeringRelatedOccupation,
    dims.NonScienceAndEngineeringOccupation
  ])
}
