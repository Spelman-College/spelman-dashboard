import * as setsUtil from "./sets"
import { Dcid } from "./dcids"


export type CategoryType = {
    [key: string]: Set<string>
}

export class Query {
    category: string
<<<<<<< HEAD
    dimensions: Set<string>;
=======
    dimensions: Set<string>
>>>>>>> 2aa268c (add dcid query logic)

    constructor(category: string, ...dimensions: string[]) {
        this.category = category
        this.dimensions = new Set<string>()
        dimensions.forEach((dim) => {
            this.dimensions.add(`${category}:${dim}`)
        })
    }

<<<<<<< HEAD
    compile(): Array<Set<string>> {
        const out: Array<Set<string>> = []
        this.dimensions.forEach((dim) => {
=======
    compile(categoryDimensions: Set<string>): Array<Set<string>> {
        // Check if all dimensions are included in this query.
        let dimensions = new Set([...this.dimensions])
        const included = setsUtil.setIntersection(categoryDimensions, dimensions)
        if (setsUtil.setEqual(included, categoryDimensions)) {
            // If all are included, query all dimensions.
            // Zero dimensions means query all dimensions in this category.
            dimensions = new Set<string>([])
        }
        const out = []
        dimensions.forEach((dim) => {
>>>>>>> 2aa268c (add dcid query logic)
            out.push(new Set<string>([dim]))
        })
        return out
    }
}

export class QuerySet {
    queries: Query[]

<<<<<<< HEAD
    // TODO: replace with CategoryType
    partialQueries: Array<Query>
    partialCategories: Set<string>;

    fullQueries: Array<Query>

    allCategories: CategoryType
    categoryDependencies: [string, string][]

    annotatedDimensions: CategoryType

    constructor(allCategories: CategoryType,
                categoryDependencies: [string, string][],
                ...queries: Query[]) {

        this.queries = queries
        this.fullQueries = []
        this.partialQueries = []
        this.partialCategories = new Set<string>()
        this.categoryDependencies = categoryDependencies
        this.allCategories = allCategories
        this.annotatedDimensions = {}

        Object.keys(allCategories).forEach((cat) => {

            const dimensions: Set<string> = this.allCategories[cat] as Set<string>
            dimensions.forEach((dim) => {
                let annotated = this.annotatedDimensions[cat]
                if (annotated === undefined) {
                    annotated = new Set([])
                }
                annotated.add(`${cat}:${dim}`)
                this.annotatedDimensions[cat] = annotated
            })
        })

        // Filter categories that have not been given in a query.
        const remaining = new Set([...Object.keys(this.allCategories)])
        this.queries.forEach((q) => {
            remaining.delete(q.category)
            const containsAllDimensions = setsUtil.setEqual(q.dimensions,
                                                            this.annotatedDimensions[q.category])
            if (q.dimensions.size == 0 || containsAllDimensions) {
                this.fullQueries.push(q)
                return
            }
            this.partialQueries.push(q)
            this.partialCategories.add(q.category)
        })

        // Add the non-existent categories to the fullQueries and fullCategories
        remaining.forEach((cat) => {
            this.fullQueries.push(new Query(cat, ''))
        })

        // TODO: put sanity checks here
    }

    selectQueryDimensions() {
        // Check the dependencies for each category.
        const includeAllDimensions = new Set()
        this.categoryDependencies.forEach((deps) => {
            const [target, dependency] = deps
            console.log('target', target, 'dependency', dependency)

            if (includeAllDimensions.has(dependency)) {
                return
            }
            // Does the target category include a query for all dimensions?
           if (this.partialCategories.has(target)) {

               // Is the dependency being queried via a subset of all it's dimensions?
               if (this.partialCategories.has(dependency)) {
                   // We can skip.
                   return
               };
               // The dependency is either missing or being assumed to query all dimensions.

               // We need to EXPLICITLY query all of the keys for the dependency.
                includeAllDimensions.add(dependency)
            }
        })
        console.log('includeAllDimensions', includeAllDimensions)
        // Once we've marked all category dependencies, we can iterate over all queries,
        // adding the full set of dimensions to category queries that require it.
        const querySets = []
        const remaining = new Set([...Object.keys(this.allCategories)])
        this.partialQueries.concat(this.fullQueries).forEach((q) => {
            if (includeAllDimensions.has(q.category)) {
                const replacement = new Query(q.category, ...this.allCategories[q.category])
                querySets.push(replacement.compile())
                return
            }
            querySets.push(q.compile())
        })
        return querySets
    }

    compile(): Array<Set<string>> {
        const dimensions = this.selectQueryDimensions()
        console.log('dimensions', dimensions)
        return setsUtil.setsProduct(...dimensions)
=======
    constructor(...queries: Query[]) {
        this.queries = queries
    }

    compile(allCategories: CategoryType): Array<Set<string>> {
        const nonZeroQueries = this.queries.filter((query) => {
            return query.dimensions.size > 0
        })
        const valid = []
        const categories = new Set([...Object.keys(allCategories)])
        nonZeroQueries.forEach((q) => {
            valid.push(q.compile(allCategories[q.category]))
            categories.delete(q.category)

        })
        categories.forEach((cat) => {
            valid.push([new Set([`${cat}:`])])
        })

        return setsUtil.setsProduct(...valid)
>>>>>>> 2aa268c (add dcid query logic)
    }
}


<<<<<<< HEAD
export const query2dcids = (dcids: Array<Dcid>,
                            categories: CategoryType,
                            categoryDependencies: [string, string][],
                            ...queries: Array<Query>): Array<string> => {
=======
export const query2dcids = (dcids: Array<Dcid>, categories: CategoryType, ...queries: Array<Query>): Array<string> => {


>>>>>>> 2aa268c (add dcid query logic)
    // Sanity checks
    const catNames = new Set<string>()
    queries.forEach((query) => {
        if (catNames.has(query.category)) {
            throw new Error(`query has duplicate category: ${query.category}`)
        }
        catNames.add(query.category)
        const catDimensions = categories[query.category]
        if (catDimensions === undefined) {
            throw new Error(`missing dimensions for category: ${query.category}`)
        }
        // TODO: cache these values
        const annotatedCatset = new Set<string>()
        catDimensions.forEach((dim) => {
            annotatedCatset.add(`${query.category}:${dim}`)
        })
        const intersected = setsUtil.setIntersection(annotatedCatset, query.dimensions)
        if (!setsUtil.setEqual(intersected, query.dimensions)) {
            const diff = setsUtil.setDifference(query.dimensions, annotatedCatset)
            throw new Error(`query has unknown categories: ${diff}`)
        }
        if (query.dimensions.size == 0) {
            throw new Error(`missing dimensions for category query: ${query.category}`)
        }
    })
<<<<<<< HEAD
    // console.log(queries)
    const qs = new QuerySet(categories, categoryDependencies, ...queries)
    const out = new Array<string>()
    qs.compile().forEach((queryDimensions) => {
        // console.log('queryDimensions', queryDimensions)
        dcids.forEach((dcid) => {
            // console.log('dcid.dimensions', dcid.dimensions)
=======

    const qs = new QuerySet(...queries)
    const out = new Array<string>()
    qs.compile(categories).forEach((queryDimensions) => {
        dcids.forEach((dcid) => {
>>>>>>> 2aa268c (add dcid query logic)
            const intersection = setsUtil.setIntersection(dcid.dimensions, queryDimensions)
            if (setsUtil.setEqual(queryDimensions, intersection)) {
                out.push(dcid.dcid)
            }
        })
    })
    return out
}
