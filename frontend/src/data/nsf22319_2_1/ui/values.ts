import * as dims from '../../queries/dimensions'
import { dcids_set } from '../query/values'
import type { DcClientBulk } from '../../dc/client'
import { downloadDataset } from '../../queries/ui'
import { Categories } from '../categories/values'

export const datasetDownloadFilename =
  'Demographic_characteristics_of_graduate_students_postdoctoral_appointees_and_doctorate-holding_nonfaculty_researchers_in_science_engineering_and_health'

const name =
  'Demographic characteristics of graduate students, postdoctoral appointees, and doctorate-holding nonfaculty researchers in science, engineering, and health'
export const datasetMeta = {
  fullName: name,
  name: name,
  fullSource:
    'Survey of Graduate Students and Postdoctorates in Science and Engineering (GSS) 2021',
  source: 'GSS',
  variables: ['Gender', 'Race/Ethnicity', 'Education', 'Citizenship'],
  year: 'Fall 2020',
  path: 'nsf22319-2-1'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = [...Categories['gender']]
export const raceDomain = [...Categories['race']]
export const eduDomain = [...Categories['education']]
export const citizenDomain = [...Categories['citizenship']]

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
    alias: dims.Dimension2Text,
    options: [...raceDomain]
  },
  {
    name: 'Education',
    id: 'education',
    alias: dims.Dimension2Text,
    options: [...eduDomain]
  },
  {
    name: 'Citizenship',
    id: 'citizenship',
    alias: dims.Dimension2Text,
    options: [...citizenDomain]
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, dcids_set, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'education', name: 'Education' },
  { id: 'citizenship', name: 'Citizenship' }
]
