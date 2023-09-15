import * as dims from '../queries/dimensions'
import { dcids_set } from './query'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { Categories } from './categories'

export const datasetDownloadFilename = 'Employed_college_graduates_by_sex_race_ethnicity_and_major_occupation_2003_thru_2021'

export const datasetMeta = {
    name: 'Employed college graduates, by sex, ace, ethnicity, and major occupation: 2003-2021',
    source: 'National Center for Science and Engineering Statistics, National Survey of College Graduates.',
    variables: ['Gender', 'Race/Ethnicity', 'Major Occupation'],
    year: '2003 - 2021',
    path: 'nsf23306-6-2'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const genderDomain = dims.GENDERS
export const ethnicityDomain = [...Categories['ethnicity']]
export const occupationDomain = [...Categories['occupation']]

export const dashboardFilters = [
    {
        name: 'Gender',
        id: 'gender',
        alias: dims.Dimension2Text,
        options: [...genderDomain]
    },
    {
        name: 'Race/Ethnicity',
        id: 'ethnicity',
        alias: dims.Dimension2Text,
        options: [...ethnicityDomain]
    },
    {
        name: 'Major Occupation',
        id: 'occupation',
        alias: dims.Dimension2Text,
        options: [...occupationDomain]
    }
]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
  return downloadDataset(client, dcids_set, filename)
}

export const compareOptions = [
    { id: 'gender', name: 'Gender' },
    { id: 'ethnicity', name: 'Race/Ethnicity' },
    { id: 'occupation', name: 'Major Occupation' }
]