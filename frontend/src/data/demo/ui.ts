import * as dims from '../../data/queries/dimensions'
import { downloadDataset } from '../../data/queries/ui'
import { DCIDS } from './dcids'
import type { DcClientBulk } from '../dc/client'
import { blobs2Csv } from '../dc/client'

export const datasetDownloadFilename =
  'Field_of_bachelors_degree_for_first_major_American_Community_Survey_2019'

export const datasetMeta = {
  fullName: 'Field of bachelor’s degree for first major American Community Survey 2019',
  fullSource: 'U.S. Census Bureau, American Community Survey 5-Year Estimate (2019)',
  name: "Bachelor's degree conferred by field",
  axisLabel: "Bachelor's degree recipients",
  source: 'U.S. Census Bureau, American Community Survey 5-Year Estimate',
  variables: ['Gender', 'Age', 'Major'],
  year: '2015 - 2019',
  path: 'demo'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = [dims.Female, dims.Male]
export const ageDomain = [dims.age_25To39Years, dims.age_40To64Years, dims.age_65OrMoreYears]
export const majorDomain = [
  dims.BachelorOfEducationMajor,
  dims.BachelorOfScienceAndEngineeringMajor,
  dims.BachelorOfScienceAndEngineeringRelatedMajor,
  dims.BachelorOfArtsHumanitiesAndOtherMajor,
  dims.BachelorOfBusinessMajor
]

export const dashboardFilters = [
  {
    name: 'Gender',
    id: 'gender',
    alias: dims.Dimension2Text,
    options: [...genderDomain]
  },
  {
    name: 'Age Group',
    id: 'age',
    alias: dims.Dimension2Text,
    options: [...ageDomain]
  },
  {
    name: 'College Major',
    id: 'major',
    alias: dims.Dimension2Text,
    options: [...majorDomain]
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, DCIDS, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'age', name: 'Age Group' },
  { id: 'major', name: 'College Major' }
]
