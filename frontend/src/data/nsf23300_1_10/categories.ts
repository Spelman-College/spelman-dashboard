import * as dims from '../queries/dimensions'

export const Categories = {
  ethnicity: new Set<string>([
    dims.AmericanIndianOrAlaskaNativeAlone,
    dims.Asian,
    dims.BlackOrAfricanAmericanAlone,
    dims.HispanicOrLatino,
    dims.TwoOrMoreRaces,
    dims.UnknownEthnicity,
    dims.UnknownRace,
    dims.WhiteAlone
  ]),
  citizenship: new Set<string>([dims.Citizen, dims.CitizenshipUnknown, dims.VisaHolder]),
  gender: new Set<string>([dims.Male, dims.Female])
}
