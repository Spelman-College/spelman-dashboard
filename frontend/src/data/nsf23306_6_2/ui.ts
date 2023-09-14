import * as dims from '../queries/dimensions'
import { dcids_set } from './query'
import type { DcClientBulk } from '../dc/client'
import { downloadDataset } from '../queries/ui'

export const datasetDownloadFilename = 'Employed_college_graduates_by_sex_race_ethnicity_and_major_occupation_2003_thru_2021'

export const datasetMeta = {
    name: 'Employed college graduates, by sex, ace, ethnicity, and major occupation: 2003-2021',
    source: 'Fix Me!',
    variables: ['Sex', 'Race', 'Ethnicity', 'Major Occupation'],
    year: '2003 - 2021',
    path: 'nsf23306-6-2'
}

// Please don't mutate these or the plot will break. When assigning these, make a copy.
export const sexDomain = dims.GENDERS
export const raceDomain = [
  dims.HispanicOrLatino,
  dims.AmericanIndianOrAlaskaNativeAlone,
  dims.Asian,
  dims.Black,
  dims.HawaiianNativeOrPacificIslander,
  dims.WhiteAlone,
  dims.TwoOrMoreRaces,
  dims.NonUSResident
]
export const occupationDomain = [
    dims.BiologicalAgriculturalOtherLifeScientists,
    dims.ComputerAndMathematicalScientists,
    dims.PhysicalAndRelatedScientists,
    dims.SocialAndRelatedScientists,
    dims.Engineers,
    dims.SAndERelatedOccupations,
    dims.NonSAndEOccupations,
    dims.SAndEOccupations
]

export const dashboardFilters = [
    {
        name: 'Sex',
        id: 'sex',
        alias: dims.Dimension2Text,
        options: [...sexDomain]
    },
    {
        name: 'Race/Ethnicity',
        id: 'race',
        alias: dims.Dimension2Text,
        options: [...raceDomain]
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
    { id: 'sex', name: 'Sex' },
    { id: 'race', name: 'Race/Ethnicity' },
    { id: 'occupation', name: 'Major Occupation' }
]