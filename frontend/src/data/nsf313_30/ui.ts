import * as dims from '../queries/dimensions'
import { dcids_set } from './query'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { Categories } from './categories'

export const datasetDownloadFilename =
  'Enrollment_statistics_on_degree-granting_historically_Black_colleges_and_universities_by_control_and_level_of_institution_1990_through_2021'

export const datasetMeta = {
  fullName:
  'Enrollment statistics on degree-granting historically Black colleges and universities, by control and level of institution',
  fullSource:
  ' U.S. Department of Education, National Center for Education Statistics, Integrated Postsecondary Education Data System (IPEDS), "Fall Enrollment Survey" (IPEDS-EF:90); IPEDS Spring 2001, Spring 2011, and Spring 2022, Fall Enrollment component; IPEDS Spring 2022, Finance component; and IPEDS Fall 2021, Completions component. (This table was prepared December 2022.)',
  name: 'HBCU Enrollment statistics',
  axisLabel: 'HBCU Enrollment',
  source: 'U.S. Department of Education, National Center for Education Statistics, Integrated Postsecondary Education Data System (IPEDS)',
  variables: ['Gender', 'Race/Ethnicity', 'College Level', 'Public/Private College'],
  year: '1990 - 2021',
  path: 'nsf313-30'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = Categories['gender']
export const raceDomain = [dims.Black, dims.Placeholder]
const raceAlias = {}
raceAlias[`${dims.Black}`] = 'Black'
raceAlias[`${dims.Placeholder}`] = 'Not Black'

export const levelDomain = Categories['collegeOrUniversityLevel']
export const yearDomain = Categories['collegeOrGraduateSchoolEnrollment']

export const dashboardFilters = [
  {
    name: 'Gender',
    id: 'gender',
    alias: dims.Dimension2Text,
    options: [...genderDomain]
  },
  {
    name: 'Race/Ethnicity',
    id: 'race',
    alias: raceAlias,
    options: [...raceDomain]
  },
  {
    name: 'College Level',
    id: 'collegeOrUniversityLevel',
    alias: dims.Dimension2Text,
    options: [...levelDomain]
  },
  {
    name: 'Public/Private College',
    id: 'collegeOrGraduateSchoolEnrollment',
    alias: dims.Dimension2Text,
    options: [...yearDomain]
  }
]
console.log(dashboardFilters)
export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, dcids_set, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'collegeOrUniversityLevel', name: 'College Level' },
  { id: 'collegeOrGraduateSchoolEnrollment', name: 'Public/Private College' }
]
