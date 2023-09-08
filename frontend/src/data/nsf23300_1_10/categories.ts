export const Categories = {
  ethnicity: new Set<string>([
    'AmericanIndianOrAlaskaNativeAlone',
    'Asian',
    'BlackOrAfricanAmericanAlone',
    'HispanicOrLatino',
    'TwoOrMoreRaces',
    'UnknownEthnicity',
    'UnknownRace',
    'WhiteAlone'
  ]),
  citizenship: new Set<string>(['Citizen', 'CitizenshipUnknown', 'VisaHolder']),
  gender: new Set<string>(['Male', 'Female'])
}
