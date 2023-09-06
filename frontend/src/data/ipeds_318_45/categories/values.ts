import * as dims from '../../queries/dimensions'

export const Categories = {
  'gender': new Set<string>([
    dims.Male,
    dims.Female,
  ]),
  'ethnicity': new Set<string>([
    dims.HispanicOrLatino,
    dims.AmericanIndianOrAlaskaNativeAlone,
    dims.Black,
    dims.TwoOrMoreRaces,
    dims.WhiteAlone,

    // AsianOrPacificIslander is the sum of both Asian AND HawaiianNativeOrPacificIslander
    // 'AsianOrPacificIslander',
    dims.Asian,
    dims.HawaiianNativeOrPacificIslander,

    // Total for this category is reported, including this data.
    dims.NonUSResident
  ]),
  'education': new Set<string>([
    dims.EducationalAttainment9ThTo12ThGradeNoDiploma,
    dims.EducationalAttainmentAssociatesDegree,
    dims.EducationalAttainmentBachelorsDegree,
    dims.EducationalAttainmentCollegeGraduate,
    dims.EducationalAttainmentDoctorateDegree,
    dims.EducationalAttainmentMastersDegree,
  ]),
}
