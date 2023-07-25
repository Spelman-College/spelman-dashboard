
export interface DcidFilter {
    ignorePrefix: string
    omitDimensions: Set<string>
}

export class Dcid {
    dcid: string;
    dimensions: Set<string>;
    dim2cat: {[key: string]: string}

    constructor(dcid: string, filter: DcidFilter, dim2cat: {[key: string]: string}) {
        this.dcid = dcid
        this.dimensions = new Set<string>()
        this.dim2cat = dim2cat

        let key = this.dcid
        if (filter.ignorePrefix != '' && key.startsWith(filter.ignorePrefix)) {
            key = key.slice(filter.ignorePrefix.length)
        }
        if (key.startsWith('_')) {
            key = key.slice(1)
        }

        const sdims = key.split('_')
        const unUsedCats = new Set<string>(Object.values(this.dim2cat))

        sdims.forEach((dim) => {
            if (dim == '') {
                return
            }
            if (filter.omitDimensions.has(dim)) {
                return
            }

            const cat = dim2cat[dim]
            if (cat === undefined) {
                throw Error(`missing dimension: ${dim} in the dimension to category map`)
            }
            unUsedCats.delete(cat)
            this.dimensions.add(`${cat}:${dim}`)
        })
        // Unused categories in the DCID imply that all dimensions from that category
        // are summed in this DCID/metric. We add the key that is a shortcut for
        // all dimensions of a category; this prevents us from querying ALL dimensions
        // in the category, when we generate a query for missing categories.
        unUsedCats.forEach((cat) => {
            this.dimensions.add(`${cat}:`)
        })
    }
}
