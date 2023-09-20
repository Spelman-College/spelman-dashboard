import * as dims from '../queries/dimensions'

export const Categories = {
  gender: new Set<string>([dims.Female, dims.Male]),
  race: new Set<string>([dims.Black, dims.Placeholder]),
  collegeOrUniversityLevel: new Set<string>([
    dims.FourYear,
    dims.TwoYear,
  ]),
  collegeOrGraduateSchoolEnrollment: new Set<string>([
    dims.EnrolledInPublicCollegeOrGraduateSchool,
    dims.EnrolledInPrivateCollegeOrGraduateSchool,
  ]),
}
