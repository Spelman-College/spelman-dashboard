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
import { datasetMeta as nsf23306_6_2Meta } from '../nsf23306_6_2/ui'

// These variables need to be created, due to what appears to be a dependency bug when typescript
// compiles to JS. If we don't create these intermediate vars, we get an error about uninstantiated
// variables.
const demo = demoMeta
const ipeds = ipedsMeta
const nsf23300_1_10 = nsf23300_1_10Meta
const nsf23306_6_2 = nsf23306_6_2Meta
export const datasets = [ipeds, nsf23300_1_10, nsf23306_6_2]

// presets is the object that gets shown in the UI when the 'review charts' option
// is selected in the view selector.
export const presets = [
  { name: 'Demo preset for testing the dashboard', path: 'demo-preset' },
  { name: 'Preset that does not exist yet', path: 'nope-preset' },
  { name: 'Another Preset that does not exist yet', path: 'nope2-preset' }
]

// views is the object that determines the view selector text and path.
export const views = [
  { name: 'Open explore', path: 'explore', deactivate: false },
  { name: 'Data preset', path: 'preset', deactivate: false }
]

export const plotColors = ['#FF6454', '#FF971E', '#04C899', '#4FDFFF', '#FFDC69']

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

// applyCompareQuery is a wrapper function for instantiating and invoking QueryCompare logic.
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

// getCompareData is a wrapper function that calls the Data Commons API and adds
// metadata to the results for comparing/plotting.
export const getCompareData = async (
  client: DcClient,
  dcidMap: Map<string, Array<string>>
): Array<Object> => {
  const results = []
  for (const dim in dcidMap) {
    const dcidList = dcidMap[dim]
    for (const idx in dcidList) {
      const values = await client.getData(dcidList[idx])
      const formatted = formatPlot(values, 'key', dim)
      results.push(...formatted)
    }
  }
  return results
}

// getCompareData is a wrapper function that calls the Data Commons API and adds
// metadata to the results for plotting.
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

// renderCategory multiplies a query(set of dimensions for other categories) across a target
// category's dimension(s) and reduces the results, as needed.
//
// An example is that we have a gender category that we want to compare and a total query
// that includes occupation and salary. Since we're comparing each gender dimension side-by-side,
// for each dimension, in this case Male and Female, we'll
//   1. Add the query for the other categories, in this example occupation and salary, and
//      get the DCID(s).
//   3. Get the data for the DCID(s) from Data Commons.
//   4. Sum common values, if there were multiple DCIDs returned from step 1.
export const renderCategory = (
  dcClient: SeriesClient,
  dataset: Queryable,
  tableRef: Ref<Array>,
  category: string,
  dimensions: string[],
  catMap: Map<string, Array<string>>
) => {
  if (dimensions.length > 1) {
    // We're comparing multiple dimensions, side-by-side in a plot, so we'll want to
    // get the DCIDs that match the query
    const dcids = applyCompareQuery(dataset, category, catMap)
    // Get data from Data Commons.
    const pout = getCompareData(dcClient, dcids)
    pout.then((tmpOut) => {
      // Sum the common values, if there were multiple DCIDs per dimension in our query.
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

// getVarsString will format and truncate an array of variable names to be displayed
// in an HTML element. The goal is to limit the text that is shown in the HTML element.
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

// downloadDataset is a wrapper function that takes an array of DCIDs and
// helps the client download the data as a CSV.
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

// delay is used to test UI loading elements
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// downloadCSV is used to create both the CSV object and HTML component that allows a user to
// download a CSV from an event- like an onclick handler.
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
