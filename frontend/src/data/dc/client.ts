import { ApiCache } from './cache'

const maxURILength = 2000

export interface DcClient {
  getData(variableDcid: string): Promise<any>
}

export interface DcClientBulk {
  getTimeseries(variableDcid: string): Promise<any>
}

const fmtEntity = (entity: string): string => {
  let out = entity
  if (out.startsWith('/')) {
    out = out.slice(1)
  }

  if (out.endsWith('/')) {
    out = out.slice(0, out.length - 1)
  }
  return out
}

export type CsvRows = {
  error: string | undefined
  rows: any
}

// fmtCsvTimeseries takes a blob and a format string.
export const fmtCsvTimeseries = (blob): CsvRows => {
  const variable = blob['variable']
  if (variable == undefined) {
    return { error: 'missing variable key' } as CsvRows
  }
  const observationsArr = blob['observationsByEntity']
  if (observationsArr == undefined) {
    return { error: 'missing observationsByEntity key' } as CsvRows
  }
  const observations = observationsArr[0]
  if (observations == undefined) {
    return { error: 'missing first item at observations' } as CsvRows
  }
  const entity = observations.entity
  if (entity == undefined) {
    return { error: 'missing entity in observations' } as CsvRows
  }
  const facets = observations.seriesByFacet
  if (facets == undefined) {
    return { error: 'missing seriesByFacet in observations' } as CsvRows
  }
  const facet = facets[0]
  if (facet == undefined) {
    return { error: 'missing first item in facets' } as CsvRows
  }
  const series = facet.series
  if (series == undefined) {
    return { error: 'missing series in facet' } as CsvRows
  }
  const blobs = []
  let error = undefined
  series.forEach((s) => {
    const date = s.date
    if (date == undefined) {
      error = 'missing date key'
      return
    }
    const value = s.value
    if (value == undefined) {
      error = 'missing value key'
      return
    }
    blobs.push({
      dcid: variable,
      entity: entity,
      date: date,
      value: value
    })
  })
  return { error: error, rows: blobs } as CsvRows
}

export const blobs2Csv = (blobs: Array<Object>): CsvRows => {
  const rows = []
  let error = undefined
  blobs.forEach((b) => {
    const blobRows = fmtCsvTimeseries(b)
    if (blobRows.error != undefined) {
      error = blobRows.error
      return
    }
    rows.push(...blobRows.rows)
  })
  return { error: error, rows: rows } as CsvRows
}

// Used for downloading a dataset
export class BulkClient {
  baseURI: string = 'https://api.datacommons.org/v1/bulk/observations/series'
  key: string
  entity: string

  constructor(entity: string, key: string) {
    this.key = key
    this.entity = entity
  }

  mkURIs(dcidsRaw: string[]): string[] {
    // De-duplicate dcids.
    const uniqueDcids = new Set([...dcidsRaw])
    let dcids = [...uniqueDcids]

    let uri = `${this.baseURI}?entities=${this.entity}&key=${this.key}`
    let uriLen = uri.length
    const uris = []
    let fragment = ''
    dcids.forEach((dcid, idx) => {
      if (dcid.length + fragment.length >= maxURILength) {
        // Create URI and start a new URI.
        uris.push(`${uri}${fragment}`)
        fragment = ''
      }
      fragment = `${fragment}&variables=${dcid}`
      if (idx == dcids.length - 1) {
        // Add last element.
        uris.push(`${uri}${fragment}`)
      }
    })
    return uris
  }

  async getTimeseries(dcids: string[]): Promise<any> {
    const uris = this.mkURIs(dcids)
    const observations = []
    for (const idx in uris) {
      const uri = uris[idx]
      const res = await fetch(uri)
      const jres = await res.json()
      observations.push(...jres.observationsByVariable)
    }
    return observations
  }
}

// Used for timeseries data
export class SeriesClient {
  private cache: ApiCache
  baseURI: string = 'https://api.datacommons.org/v1/observations/series'
  key: string
  entity: string

  constructor(entityDcid: string, key: string) {
    this.cache = new ApiCache()
    this.entity = fmtEntity(entityDcid)
    this.key = key
  }

  mkURI(variableDcid: string): string {
    // https://docs.datacommons.org/api/rest/v1/observations/series
    return `${this.baseURI}/${this.entity}/${variableDcid}?key=${this.key}`
  }

  async getData(variableDcid: string): Promise<any> {
    const request = this.mkURI(variableDcid)
    if (!this.cache.recordExists(request)) {
      const res = await fetch(request)
      const jres = await res.json()
      this.cache.setRecord(request, jres)
      return jres.observations
    }
    return this.cache.getRecord(request).observations
  }
}
