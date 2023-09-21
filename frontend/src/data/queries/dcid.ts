export type CategoryType = {
  [key: string]: Set<string>
}

export type DcidFilter = {
  // We'll left trim this string when processing the DCID.
  ignorePrefix: string

  // We'll check if any dimension is in this set before adding it to the set index for
  // this Dcid object.
  omitDimensions: Set<string>;

  // This is a mapping of DCID to an array of dimensions in the form of `${category}:${dimension}`.
  // We use this to add additional dimensions to the DCID's set index.
  additions: { [key: string]: Array<string> }
}

// Used as a base class for Dcid.
export class DataCommonsIdentifier {
  dcid: string
  dimensions: Set<string>
    dim2cat: { [key: string]: string }
  filter: DcidFilter

  constructor(dcid: string, filter: DcidFilter, dim2cat: { [key: string]: string }) {
    this.dcid = dcid
    this.dimensions = new Set<string>()
    this.dim2cat = dim2cat
    this.filter = filter
  }
}

export class Dcid extends DataCommonsIdentifier {
  constructor(dcid: string, filter: DcidFilter, dim2cat: { [key: string]: string }) {
    super(dcid, filter, dim2cat)

    let key = this.dcid
    if (
      this.filter.ignorePrefix !== undefined &&
        this.filter.ignorePrefix != '' &&
        key.startsWith(this.filter.ignorePrefix)
    ) {
      key = key.slice(this.filter.ignorePrefix.length)
    }
    if (key.startsWith('_')) {
      key = key.slice(1)
    }
    const sdims = key.split('_')

    // We'll keep track of the unused categories from the set of all available
    // categories.
    const unUsedCats = new Set<string>(Object.values(this.dim2cat))

    sdims.forEach((dim) => {
      if (dim == '') {
        return
      }
      if (this.filter.omitDimensions !== undefined && this.filter.omitDimensions.has(dim)) {
        return
      }

      const cat = dim2cat[dim]
      if (cat === undefined) {
        throw Error(
          `missing dimension: ${dim} in the dimension to category map ${this.dcid} ${sdims}`
        )
      }
      unUsedCats.delete(cat)
      this.dimensions.add(`${cat}:${dim}`)
    })

    // By default, unused categories in the DCID imply that all dimensions from that category
    // are summed in this DCID/metric. We add the key that is a shortcut for
    // all dimensions of a category; this prevents us from querying ALL dimensions
    // in the category, when we generate a query for missing categories.
    unUsedCats.forEach((cat) => {
      this.dimensions.add(`${cat}:`)
    })

    // Check for additional dimensions to add.
    if (filter.additions !== undefined) {
      const additions = filter.additions[this.dcid]
      if (additions !== undefined) {
        additions.forEach((catdim) => {
          this.dimensions.add(catdim)
        })
      }
    }
  }
}
