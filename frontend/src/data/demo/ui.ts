import * as dims from '../../data/queries/dimensions'
export const genderOptions = [
     {
	 value: dims.Male,
	 label: dims.Dimension2Text[dims.Male]
     },
     {
	 value: dims.Female,
	 label: dims.Dimension2Text[dims.Female]
     }
 ]

export const ageOptions = [
     {
	 value: dims.age_25To39Years,
	 label: dims.Dimension2Text[dims.age_25To39Years]
     },
     {
	 value: dims.age_40To64Years,
	 label: dims.Dimension2Text[dims.age_40To64Years]
     },
     {
	 value: dims.age_65OrMoreYears,
	 label: dims.Dimension2Text[dims.age_65OrMoreYears]
     },
 ]
