export const Dimension2Text = {}

// Gender
export const Female = 'Female'
export const Male = 'Male'
export const GENDERS = [Female, Male]
Dimension2Text[Male] = 'Men'
Dimension2Text[Female] = 'Women'

// Age group
export const age_25To39Years = '25To39Years'
export const age_29orLessyears = '29OrLessYears'
export const age_30to39Years = '30To39Years'
export const age_40to49Years = '40To49Years'
export const age_50To75Years = '50To75Years'
export const age_40To64Years = '40To64Years'
export const age_65OrMoreYears = '65OrMoreYears'
Dimension2Text[age_25To39Years] = '25 to 39'
Dimension2Text[age_29orLessyears] = '29 and younger'
Dimension2Text[age_30to39Years] = '30 to 39'
Dimension2Text[age_40to49Years] = '40 to 49'
Dimension2Text[age_50To75Years] = '50 to 75'
Dimension2Text[age_40To64Years] = '40 to 64'
Dimension2Text[age_65OrMoreYears] = '65 and older'

// Education
export const BachelorOfEducationMajor = 'BachelorOfEducationMajor'
export const BachelorOfScienceAndEngineeringMajor = 'BachelorOfScienceAndEngineeringMajor'
export const BachelorOfScienceAndEngineeringRelatedMajor =
  'BachelorOfScienceAndEngineeringRelatedMajor'
export const BachelorOfArtsHumanitiesAndOtherMajor = 'BachelorOfArtsHumanitiesAndOtherMajor'
export const BachelorOfBusinessMajor = 'BachelorOfBusinessMajor'
Dimension2Text[BachelorOfEducationMajor] = 'Education'
Dimension2Text[BachelorOfScienceAndEngineeringMajor] = 'Science and Engineering'
Dimension2Text[BachelorOfScienceAndEngineeringRelatedMajor] = 'Science and Engineering related'
Dimension2Text[BachelorOfArtsHumanitiesAndOtherMajor] = 'Arts, Humanities and Other'
Dimension2Text[BachelorOfBusinessMajor] = 'Business'

export const EducationalAttainment9ThTo12ThGradeNoDiploma =
  'EducationalAttainment9ThTo12ThGradeNoDiploma'
export const EducationalAttainmentAssociatesDegree = 'EducationalAttainmentAssociatesDegree'
export const EducationalAttainmentBachelorsDegree = 'EducationalAttainmentBachelorsDegree'
// export const EducationalAttainmentCollegeGraduate = 'EducationalAttainmentCollegeGraduate'
export const EducationalAttainmentDoctorateDegree = 'EducationalAttainmentDoctorateDegree'
export const EducationalAttainmentMastersDegree = 'EducationalAttainmentMastersDegree'
Dimension2Text[EducationalAttainment9ThTo12ThGradeNoDiploma] = '9th to 12th Grade No Diploma'
Dimension2Text[EducationalAttainmentAssociatesDegree] = "Associate's Degree"
Dimension2Text[EducationalAttainmentBachelorsDegree] = "Bachelor's Degree"
// Dimension2Text[EducationalAttainmentCollegeGraduate] = 'College Graduate'
Dimension2Text[EducationalAttainmentDoctorateDegree] = 'Docorate Degree'
Dimension2Text[EducationalAttainmentMastersDegree] = 'Master Degree'
// Used in
// - ipeds_318_45
export const EDUCATIONAL_ATTAINMENT = [
  EducationalAttainment9ThTo12ThGradeNoDiploma,
  EducationalAttainmentAssociatesDegree,
  EducationalAttainmentBachelorsDegree,
  //    EducationalAttainmentCollegeGraduate,
  EducationalAttainmentDoctorateDegree,
  EducationalAttainmentMastersDegree
]

// Ethnicity/Race
export const HispanicOrLatino = 'HispanicOrLatino'
export const AmericanIndianOrAlaskaNativeAlone = 'AmericanIndianOrAlaskaNativeAlone'
export const Black = 'Black'
export const BlackOrAfricanAmericanAlone = 'BlackOrAfricanAmericanAlone'
export const TwoOrMoreRaces = 'TwoOrMoreRaces'
export const WhiteAlone = 'WhiteAlone'
export const Asian = 'Asian'
export const HawaiianNativeOrPacificIslander = 'HawaiianNativeOrPacificIslander'
export const NativeHawaiianOrOtherPacificIslanderAlone = 'NativeHawaiianOrOtherPacificIslanderAlone'
export const NonUSResident = 'NonUSResident'
export const UnknownRace = 'UnknownRace'
export const UnknownEthnicity = 'UnknownEthnicity'
Dimension2Text[HispanicOrLatino] = 'Hispanic or Latino'
Dimension2Text[AmericanIndianOrAlaskaNativeAlone] = 'Native American or Alaskan Native alone'
Dimension2Text[Black] = 'Black'
Dimension2Text[BlackOrAfricanAmericanAlone] = 'Black or African American alone'
Dimension2Text[TwoOrMoreRaces] = 'Two or more races'
Dimension2Text[WhiteAlone] = 'White alone'
Dimension2Text[Asian] = 'Asian'
Dimension2Text[HawaiianNativeOrPacificIslander] = 'Hawaiian Native or Pacific Islander'
Dimension2Text[NativeHawaiianOrOtherPacificIslanderAlone] = 'Native Hawaiian or other Pacific Islander Alone'
Dimension2Text[NonUSResident] = 'Non-US Resident'
Dimension2Text[UnknownRace] = 'Unknown Race'
Dimension2Text[UnknownEthnicity] = 'Unknown Ethnicity'

// Occupation
export const SOCBiologicalScientistsAllOtherOccupation = 'SOCBiologicalScientistsAllOtherOccupation'
export const SOCComputerMathematicalOccupation = 'SOCComputerMathematicalOccupation'
export const SOCEngineersOccupation = 'SOCEngineersOccupation'
export const SOCPhysicalScientistsOccupation = 'SOCPhysicalScientistsOccupation'
export const SOCSocialScientistsRelatedWorkersOccupation = 'SOCSocialScientistsRelatedWorkersOccupation'
export const ScienceAndEngineeringOccupation = 'ScienceAndEngineeringOccupation'
export const ScienceAndEngineeringRelatedOccupation = 'ScienceAndEngineeringRelatedOccupation'
export const NonScienceAndEngineeringOccupation = 'NonScienceAndEngineeringOccupation'
Dimension2Text[SOCBiologicalScientistsAllOtherOccupation] = 'Biological Scientists'
Dimension2Text[SOCComputerMathematicalOccupation] = 'Computer and Mathematical Scientists'
Dimension2Text[SOCEngineersOccupation] = 'Engineers'
Dimension2Text[SOCPhysicalScientistsOccupation] = 'Physical Scientists'
Dimension2Text[SOCSocialScientistsRelatedWorkersOccupation] = 'Social Scientists and related workers'
Dimension2Text[ScienceAndEngineeringOccupation] = 'Science and Engineering'
Dimension2Text[ScienceAndEngineeringRelatedOccupation] = 'Science and Engineering related'
Dimension2Text[NonScienceAndEngineeringOccupation] = 'Non-Science and Engineering'

// Citizenship
export const Citizen = 'Citizen'
export const NotAUSCitizen = 'NotAUSCitizen'
export const CitizenshipUnknown = 'CitizenshipUnknown'
export const VisaHolder = 'VisaHolder'
Dimension2Text[NotAUSCitizen] = 'Not a US Citizen'
Dimension2Text[Citizen] = 'Citizen'
Dimension2Text[CitizenshipUnknown] = 'Citizenship Unknown'
Dimension2Text[VisaHolder] = 'Visa Holder'

// Disability Status
export const NoDisability = 'NoDisability'
export const WithDisability = 'WithDisability'
Dimension2Text[NoDisability] = 'No Disability'
Dimension2Text[WithDisability] = 'With Disability'
