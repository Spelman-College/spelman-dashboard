import * as dims from '../../data/queries/dimensions'

export const datasetMeta = {
    name: "Field of bachelor's degree for first major American Community Survey; 2019: ACS 5-Year Estimates Bachelor's Degree by gender.",
    source: "Fix Me!",
    variables: ['Gender', 'Age', 'Major'],
    year: "2015 - 2019",
    path: "demo"
  }

 // Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = [dims.Female, dims.Male]
export const ageDomain = [
     dims.age_25To39Years,
     dims.age_40To64Years,
     dims.age_65OrMoreYears
 ]
export const majorDomain = [
     dims.BachelorOfEducationMajor,
     dims.BachelorOfScienceAndEngineeringMajor,
     dims.BachelorOfScienceAndEngineeringRelatedMajor,
     dims.BachelorOfArtsHumanitiesAndOtherMajor,
     dims.BachelorOfBusinessMajor,
 ]

export const dashboardFilters = [
     {
	 name: 'Gender',
	 id: 'gender',
	 options: [...genderDomain]
     },
     {
	 name: 'Age group',
	 id: 'age',
	 options: [...ageDomain],
     },
    {
	 name: 'Education Major',
	 id: 'major',
	 options: [...majorDomain]
     }
 ]
