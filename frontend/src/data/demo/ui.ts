import * as dims from '../../data/queries/dimensions'

export const datasetTitle = "FIELD OF BACHELOR'S DEGREE FOR FIRST MAJOR American Community Survey; 2019: ACS 5-Year Estimates Bachelor's Degree"

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

export const majorOptions  = [
    {
	value: dims.BachelorOfEducationMajor,
	label: dims.Dimension2Text[dims.BachelorOfEducationMajor]
    },
    {
	value: dims.BachelorOfScienceAndEngineeringMajor,
	label: dims.Dimension2Text[dims.BachelorOfScienceAndEngineeringMajor]
    },
    {
	value: dims.BachelorOfScienceAndEngineeringRelatedMajor,
	label: dims.Dimension2Text[dims.BachelorOfScienceAndEngineeringRelatedMajor]
    },
    {
	value: dims.BachelorOfArtsHumanitiesAndOtherMajor,
	label: dims.Dimension2Text[dims.BachelorOfArtsHumanitiesAndOtherMajor]
    },
    {
	value: dims.BachelorOfBusinessMajor,
	label: dims.Dimension2Text[dims.BachelorOfBusinessMajor]
    }
]
