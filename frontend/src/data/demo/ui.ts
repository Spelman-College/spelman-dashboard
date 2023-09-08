import * as dims from '../../data/queries/dimensions'
import { DCIDS } from './dcids'
import type { DcClientBulk } from '../dc/client'
import { blobs2Csv } from '../dc/client'
import { downloadCSV } from '../dc/download'

export const datasetDownloadFilename =
  'Field_of_bachelors_degree_for_first_major_American_Community_Survey_2019'

export const datasetMeta = {
  name: "Field of bachelor's degree for first major American Community Survey; 2019: ACS 5-Year Estimates Bachelor's Degree by gender.",
  source: 'Fix Me!',
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
  const res = await client.getTimeseries(DCIDS)
  if (res === undefined) {
    return 'error querying data commons'
  }
  const rows = blobs2Csv(res)
  if (rows.error != undefined) {
    return `error formatting data: ${rows.error}`
  }
  await downloadCSV(rows.rows, filename)
  return ''
}
