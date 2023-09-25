import type Ref from 'vue'
import { Parser } from '@json2csv/plainjs'

import type { SeriesClient, DcClientBulk } from '../dc/client'
import { BulkClient, blobs2Csv } from '../dc/client'

import type Queryable from './query'
import { Query, expandCompares, QueryCompare } from './query'

import { formatPlot, reduceIntersection } from './plotting'
import type DcClient from '../dc/client'

import { datasetMeta as demoMeta } from '../demo/ui'
import { datasetMeta as ipedsMeta } from '../ipeds_318_45/ui/values'
import { datasetMeta as nsf23300_1_10Meta } from '../nsf23300_1_10/ui'
import { datasetMeta as nces332_50Meta } from '../nces322_50/ui'

const demo = demoMeta
const ipeds = ipedsMeta
const nsf23300_1_10 = nsf23300_1_10Meta
const nces332_50 = nces332_50Meta
export const datasets = [ipeds, nsf23300_1_10,nces332_50]

export const presets = [
  { name: 'Demo preset for testing the dashboard', path: 'demo-preset' },
  { name: 'Preset that does not exist yet', path: 'nope-preset' },
  { name: 'Another Preset that does not exist yet', path: 'nope2-preset' }
]

export const views = [
  { name: 'Open explore', path: 'explore', deactivate: false },
  { name: 'Data preset', path: 'preset', deactivate: false }
]

export const plotColors = ['#FF6454', '#FF971E', '#04C899', '#4FDFFF', '#FFDC69']

export const selectDsView = (view: string, dsPath: string): { [key: string]: string } => {
  let selected = { error: 'not found' }
  if (view == 'explore') {
    datasets.forEach((s) => {
      if (s.path == dsPath) {
        selected = s
      }
    })
  } else if (view == 'preset') {
    presets.forEach((s) => {
      if (s.path == dsPath) {
        selected = s
      }
    })
  }
  return selected
}

// Useful only for a single category query.
export const queryDcidIntersection = (
  dataset: Queryable,
  categoryMap: Map<string, Array<string>>
): Array => {
  const queries = []
  for (const cat in categoryMap) {
    const dimensions = categoryMap[cat]
    if (dimensions.length == 0) {
      continue
    }
    queries.push(new Query(cat, ...dimensions))
  }
  const response = dataset.query(...queries)

  if (response.error !== undefined) {
    throw new Error(
      `Error querying dataset with categoryMap "${JSON.stringify(categoryMap)}": ${response.error}`
    )
  }
  return response.results
}

export const applyCompareQuery = (
  dataset: Queryable,
  compareCategory: string,
  categoryMap: Map<string, Array<string>>
): Map<string, Array<string>> => {
  const queryMap = expandCompares(compareCategory, categoryMap)
  const qc = new QueryCompare(compareCategory, dataset, queryMap)
  const err = qc.validate()
  if (err != '') {
    throw new Error(`Error validating QueryCompare: ${err}`)
  }
  return qc.compile()
}

export const getCompareData = async (
  client: DcClient,
  dcidMap: Map<string, Array<string>>
): Array<Object> => {
  const results = []
  for (const dim in dcidMap) {
    const dcidList = dcidMap[dim]
    for (const dcid in dcidList) {
      const values = await client.getData(dcidList[dcid])
      const formatted = formatPlot(values, 'key', dim)
      results.push(...formatted)
    }
  }
  return results
}

export const getSingleDimension = async (
  dataset: Queryable,
  client: DcClient,
  categoryMap: Map<string, Array<string>>,
  key: string
): Array<Object> => {
  const dcids = queryDcidIntersection(dataset, categoryMap)
  const out = []
  for (const idx in dcids) {
    const dcid = dcids[idx]
    const values = await client.getData(dcid)
    const formatted = formatPlot(values, 'key', key)
    out.push(...formatted)
  }
  return out
}

export const renderCategory = (
  dcClient: SeriesClient,
  dataset: Queryable,
  tableRef: Ref<Array>,
  category: string,
  dimensions: string[],
  catMap: Map<string, Array<string>>
) => {
  if (dimensions.length > 1) {
    const dcids = applyCompareQuery(dataset, category, catMap)
    const pout = getCompareData(dcClient, dcids)
    pout.then((tmpOut) => {
      const reduced = reduceIntersection(tmpOut, 'value', 'key', 'date')
      tableRef.value = reduced
    })
    return
  }
  const out = getSingleDimension(dataset, dcClient, catMap, dimensions[0])
  out.then((data) => {
    tableRef.value = data
  })
}

export const getRawCompareData = async (
  client: DcClient,
  dcidMap: Map<string, Array<string>>
): Array<Object> => {
  const results = []
  for (const dim in dcidMap) {
    const dcidList = dcidMap[dim]
    for (const idx in dcidList) {
      const dcid = dcidList[idx]
      const values = await client.getData(dcidList[idx])
      const formatted = formatPlot(values, 'dcid', dcid)
      results.push(...formatted)
    }
  }
  return results
}

export const asDownload = async (
  dataset: Queryable,
  client: DcClient,
  category: string,
  dimensions: string[],
  catMap: Map<string, Array<string>>
) => {
  if (dimensions.length > 1) {
    const dcids = applyCompareQuery(dataset, category, catMap)
    const pout = await getRawCompareData(client, dcids)
    return pout
  }
  const out = await getSingleDimension(dataset, client, catMap, dimensions[0])
  return out
}

// getVarsString will format and truncate an array of variables.
export const getVarsString = (vars: Array<string>, maxChars: number): string => {
  var joinedString = vars.join(', ')

  // If the string is too long, remove variables until it is not and keep track of how many.
  var lastIndex
  var countRemoved = 0
  while ((lastIndex = joinedString.lastIndexOf(',')) > maxChars) {
    joinedString = joinedString.substring(0, lastIndex)
    countRemoved++
  }

  if (countRemoved !== 0) joinedString += `, +${countRemoved} more`

  return joinedString
}

export async function downloadDataset(
  client: DcClientBulk,
  dcids: string[],
  filename: string
): Promise<string> {
  const res = await client.getTimeseries(dcids)
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

// Used to test UI loading elements
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function downloadCSV(data: Array<Map>, filename: string) {
  //// Used to test UI loading elements while download is occurring.
  // await delay(1000)
  try {
    const parser_opts = {}
    const parser = new Parser(parser_opts)
    const csv = parser.parse(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', `${filename}.csv`)
    a.click()
  } catch (err) {
    console.log(err)
  }
}
