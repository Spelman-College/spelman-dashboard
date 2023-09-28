import * as dims from '../queries/dimensions'
import { DCIDS } from './dcids'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { Categories } from './categories'

export const datasetDownloadFilename =
  'Science_engineering_and_health_doctorate_holders_employed_in_universities_and_4-year_colleges_by_broad_occupation_sex_race_ethnicity_and_tenure_status_2017'

export const datasetMeta = {
  fullName:
    'Science, engineering, and health doctorate holders employed in universities and 4-year colleges, by broad occupation, sex, race, ethnicity, and tenure status: 2017',
  fullSource:
    'National Science Foundation, National Center for Science and Engineering Statistics, Survey of Doctorate Recipients, 2017',
  name: 'Science, Engineering, and Health Doctorate Employed in Universities and 4-year Colleges',
  axisLabel: 'Employed',
  source: 'NSF, NCSES',
  variables: ['Gender', 'Race/Ethnicity', 'Occupation', 'Tenure'],
  year: '2017',
  path: 'nsf19304-9-26'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = Categories['gender']
export const raceDomain = Categories['ethnicity']
export const jobDomain = Categories['occupation']
export const tenureDomain = Categories['tenure']

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
    name: 'Occupation',
    id: 'occupation',
    alias: dims.Dimension2Text,
    options: [...jobDomain]
  },
  {
    name: 'Tenure',
    id: 'tenure',
    alias: dims.Dimension2Text,
    options: [...tenureDomain]
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, DCIDS, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'occupation', name: 'Occupation' },
  { id: 'tenure', name: 'Tenure' }
]
