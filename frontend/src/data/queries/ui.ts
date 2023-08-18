import type Queryable from './query'
import {
    Query,
    expandCompares,
    QueryCompare
} from './query'

import { formatPlot } from './plotting'
import type DcClient from '../dc/client'

// Useful only for a single category query.
export const queryDcidIntersection = (
    dataset: Queryable,
    categoryMap: Map<string, Array<string>>): Array => {

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
	throw new Error(`Error querying dataset for "${category}" category: ${response.error}`)
    }
    return response.results
}


export const applyCompareQuery = (
    dataset: Queryable,
    compareCategory: string,
    categoryMap: Map<string, Array<string>>): Array<Array<string>> => {

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
    dcidMap: Map<string, Array<string>>): Array<Object> => {

    const results  = []
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
    key:string): Array<Object> => {

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


export const getRawCompareData = async (
    client: DcClient,
    dcidMap: Map<string, Array<string>>): Array<Object> => {

    const results  = []
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
    catMap: Map<string, Array<string>>) => {
	if (dimensions.length > 1) {
	    const dcids = applyCompareQuery(dataset, category, catMap)
	    const pout = await getRawCompareData(client, dcids)
	    return pout
	}
	const out = await getSingleDimension(dataset, client, catMap, dimensions[0])
	return out
    }
