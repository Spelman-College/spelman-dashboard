import * as dims from '../queries/dimensions'

export const Categories = {
  gender: new Set<string>([dims.Male, dims.Female]),
  age: new Set<string>([dims.age_40To64Years, dims.age_25To39Years, dims.age_65OrMoreYears]),
  major: new Set<string>([
    dims.BachelorOfEducationMajor,
    dims.BachelorOfScienceAndEngineeringMajor,
    dims.BachelorOfScienceAndEngineeringRelatedMajor,
    dims.BachelorOfArtsHumanitiesAndOtherMajor,
    dims.BachelorOfBusinessMajor
  ])
}
