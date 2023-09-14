import * as dims from '../queries/dimensions'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'
import { dcids } from './query'
import { Categories } from './categories'

export const datasetDownloadFilename =
    'median_salaries_full_time_college_graduates_by_age_sex_ethnicity_race_disability_status_and_citizenship_status'

export const datasetMeta = {
    name: 'Median annual salaries of full-time employed college graduates, by sex, major occupation, age, ethnicity, race, disability status, and citizenship status.',
    source: 'National Center for Science and Engineering Statistics, Survey of College Graduates.',
    variables: ['Age', 'Occupation', 'Disability Status', 'Gender', 'Citizenship', 'Race/Ethnicity'],
    year: '2021',
    path: 'nsf23306_4_2'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const ageDomain = Categories.age
export const raceDomain = Categories.ethnicity
export const occupationDomain = Categories.occupation
export const disabilityDomain = Categories.disability
export const citizenDomain = Categories.citizenship
export const genderDomain = Categories.gender


export const dashboardFilters = [
    {
        name: 'Age',
        id: 'age',
        alias: dims.Dimension2Text,
        options: [...ageDomain]
    },
    {
        name: 'Race/Ethnicity',
        id: 'ethnicity',
        alias: dims.Dimension2Text,
        options: [...raceDomain]
    },
    {
        name: 'Occupation',
        id: 'occupation',
        alias: dims.Dimension2Text,
        options: [...occupationDomain]
    },
    {
        name: 'Disability Status',
        id: 'disability',
        alias: dims.Dimension2Text,
        options: [...disabilityDomain]
    },
    {
        name: 'Citizenship',
        id: 'citizenship',
        alias: dims.Dimension2Text,
        options: [...citizenDomain]
    },
    {
        name: 'Gender',
        id: 'gender',
        alias: dims.Dimension2Text,
        options: [...genderDomain]
    },

]

export async function download(client: DcClientBulk, filename: string): Promise<string> {
    return downloadDataset(client, [...dcids], filename)
}

export const compareOptions = [
    { id: 'age', name: 'Age' },
    { id: 'gender', name: 'Gender' },
    { id: 'ethnicity', name: 'Race/Ethnicity' },
    { id: 'occupation', name: 'Occupation' },
    { id: 'disability', name: 'Disability Status' },
    { id: 'citizenship', name: 'Citizenship' }
]
