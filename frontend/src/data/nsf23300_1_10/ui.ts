import * as dims from '../queries/dimensions'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { dcids_set } from './query'

export const datasetDownloadFilename =
  'female_research_doctorate_recipients_by_ethnicity_race_and_citizenship_status'

export const datasetMeta = {
  fullName:
    'Female research doctorate recipients, by ethnicity, race, and citizenship status: 2011–21',
  name: 'Research doctorate recipients, by gender, ethnicity, race, and citizenship status',
  axisLabel: 'Research doctorate recipients',
  source: 'National Center for Science and Engineering Statistics, Survey of Earned Doctorates.',
  variables: ['Gender', 'Citizenship', 'Race/Ethnicity'],
  year: '2011 - 2021',
  path: 'nsf23300-1-10'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = dims.GENDERS
export const raceDomain = [
  dims.AmericanIndianOrAlaskaNativeAlone,
  dims.Asian,
  dims.BlackOrAfricanAmericanAlone,
  dims.HispanicOrLatino,
  dims.TwoOrMoreRaces,
  dims.UnknownEthnicity,
  dims.UnknownRace,
  dims.WhiteAlone
]
export const citizenDomain = [dims.Citizen, dims.CitizenshipUnknown, dims.VisaHolder]

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
    name: 'Citizenship',
    id: 'citizenship',
    alias: dims.Dimension2Text,
    options: [...citizenDomain]
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, [...dcids_set], filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'citizenship', name: 'Citizenship' }
]
