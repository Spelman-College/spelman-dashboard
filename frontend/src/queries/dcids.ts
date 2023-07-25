<<<<<<< HEAD

export interface DcidFilter {
    ignorePrefix: string
    omitDimensions: Set<string>
}

=======
>>>>>>> 2aa268c (add dcid query logic)
export class Dcid {
    dcid: string;
    dimensions: Set<string>;
    dim2cat: {[key: string]: string}

<<<<<<< HEAD
    constructor(dcid: string, filter: DcidFilter, dim2cat: {[key: string]: string}) {
=======
    constructor(dcid: string, ignorePrefix: string, dim2cat: {[key: string]: string}) {
>>>>>>> 2aa268c (add dcid query logic)
        this.dcid = dcid
        this.dimensions = new Set<string>()
        this.dim2cat = dim2cat

        let key = this.dcid
<<<<<<< HEAD
        if (filter.ignorePrefix != '' && key.startsWith(filter.ignorePrefix)) {
            key = key.slice(filter.ignorePrefix.length)
=======
        if (ignorePrefix != '' && key.startsWith(ignorePrefix)) {
            key = key.slice(ignorePrefix.length)
>>>>>>> 2aa268c (add dcid query logic)
        }
        if (key.startsWith('_')) {
            key = key.slice(1)
        }
<<<<<<< HEAD

=======
>>>>>>> 2aa268c (add dcid query logic)
        const sdims = key.split('_')
        const unUsedCats = new Set<string>(Object.values(this.dim2cat))

        sdims.forEach((dim) => {
            if (dim == '') {
                return
            }
<<<<<<< HEAD
            if (filter.omitDimensions.has(dim)) {
                return
            }
=======
>>>>>>> 2aa268c (add dcid query logic)

            const cat = dim2cat[dim]
            if (cat === undefined) {
                throw Error(`missing dimension: ${dim} in the dimension to category map`)
            }
            unUsedCats.delete(cat)
            this.dimensions.add(`${cat}:${dim}`)
        })
<<<<<<< HEAD
        // Unused categories in the DCID imply that all dimensions from that category
        // are summed in this DCID/metric. We add the key that is a shortcut for
        // all dimensions of a category; this prevents us from querying ALL dimensions
        // in the category, when we generate a query for missing categories.
=======
        // Add the query all for any missing categories in this dcid
>>>>>>> 2aa268c (add dcid query logic)
        unUsedCats.forEach((cat) => {
            this.dimensions.add(`${cat}:`)
        })
    }
}
