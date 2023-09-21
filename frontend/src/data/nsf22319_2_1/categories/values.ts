import * as dims from '../../queries/dimensions'

export const Categories = {
  gender: new Set<string>([dims.Male, dims.Female]),
  race: new Set<string>([
    dims.NativeHawaiianOrOtherPacificIslanderAlone,
    dims.Black,
    dims.TwoOrMoreRaces,
    dims.WhiteAlone,
    dims.Asian,
    dims.AmericanIndianOrAlaskaNativeAlone,
    dims.HispanicOrLatino,
    dims.UnknownRace
  ]),
  education: new Set<string>([dims.DoctorateDegree, dims.MastersDegree]),
  citizenship: new Set<string>([dims.Citizen, dims.VisaHolder])
}
