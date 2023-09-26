import * as dims from '../queries/dimensions'
import { dcids_set } from './query'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { Categories } from './categories/pct'

export const datasetDownloadFilename =
'Bachelors_degrees_conferred_by_postsecondary_institutions_by_race/ethnicity_and_field_of_study_2010_thru_2020'

export const datasetMeta = {
  fullName:
  '	Bachelor\'s degrees conferred by postsecondary institutions, by gender, race/ethnicity, and field of study',
  fullSource:
  'U.S. Department of Education, National Center for Education Statistics, Integrated Postsecondary Education Data System (IPEDS)',
  name: 'Bachelor\'s degrees conferred by postsecondary institutitions',
  axisLabel: 'Bachelor\'s degrees conferred',
  source: 'IPEDS',
  variables: ['Gender', 'Race/Ethnicity', 'Major'],
  //2010-2011 through 2019-2020
  year: '2010 - 2020',
  path: 'nces332-50'
}


// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = [...Categories['gender']]
//'AsianOrPacificIslander' not plotted as it's a sum of 'Asian' and 'HawaiianNativeOrPacificIslander'
export const raceDomain = [
  dims.HispanicOrLatino,
  dims.AmericanIndianOrAlaskaNative,
  dims.Black,
  dims.TwoOrMoreRaces,
  dims.WhiteAlone,
  dims.Asian,
  dims.HawaiianNativeOrPacificIslander,
  dims.NonUSResident
]
export const majorDomain = [...Categories['bachelorsDegreeMajor']]
export const yearDomain = ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']

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
    name: 'Bachelor\'s Degree Major',
    id: 'bachelorsDegreeMajor',
    alias: dims.Dimension2Text,
    options: [...majorDomain]
  },
  {
    name: 'Year',
    id: 'year',
    alias: {
      2010: '2010',
      2011: '2011',
      2012: '2012',
      2013: '2013',
      2014: '2014',
      2015: '2015',
      2016: '2016',
      2017: '2017',
      2018: '2018',
      2019: '2019',
      2020: '2020'
    },
    options: ['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020']
  }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, dcids_set, filename)
}

export const compareOptions = [
  { id: 'gender', name: 'Gender' },
  { id: 'race', name: 'Race/Ethnicity' },
  { id: 'bachelorsDegreeMajor', name: 'Major' },
]