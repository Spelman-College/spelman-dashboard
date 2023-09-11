import * as dims from '../../queries/dimensions'
import { dcids_set } from '../query/values'
import type { DcClientBulk } from '../../dc/client'
import { downloadDataset } from '../../queries/ui'

export const datasetDownloadFilename =
  'Distribution_STEM_degrees_certificates_postsecondary_institutions_race_ethnicity_degree_certificate_sex_2011-12_thru_2020-21'

export const datasetMeta = {
  name: 'Number and percentage distribution of science, technology, engineering, and mathematics (STEM) degrees/certificates conferred by postsecondary institutions, by race/ ethnicity, level of degree/certificate, and sex of student',
  source: 'Fix Me!',
  variables: ['Gender', 'Educational Attainment', 'Race/Ethnicity'],
  year: '2011-12 - 2020-21',
  path: 'ipeds-318-45'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = dims.GENDERS
export const raceDomain = [
  dims.HispanicOrLatino,
  dims.AmericanIndianOrAlaskaNativeAlone,
  dims.Black,
  dims.TwoOrMoreRaces,
  dims.WhiteAlone,
  dims.Asian,
  dims.HawaiianNativeOrPacificIslander,
  dims.NonUSResident
]
export const eduDomain = dims.EDUCATIONAL_ATTAINMENT

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
    name: 'Educational Attainment',
    id: 'education',
    alias: dims.Dimension2Text,
    options: [...eduDomain]
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, dcids_set, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'education', name: 'Educational Attainment' }
]
