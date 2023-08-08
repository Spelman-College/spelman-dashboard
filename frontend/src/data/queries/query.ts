import * as setsUtil from "./sets"
import type { CategoryType } from "./dcid"

export type QueryResult = {
    error: string
    results: Array<string>
}

export class Query {
    category: string
    dimensions: Set<string>;

    constructor(category: string, ...dimensions: string[]) {
        this.category = category
        this.dimensions = new Set<string>()
        dimensions.forEach((dim) => {
            this.dimensions.add(`${category}:${dim}`)
        })
    }

    compile(): Array<Set<string>> {
        const out: Array<Set<string>> = []
        this.dimensions.forEach((dim) => {
            out.push(new Set<string>([dim]))
        })
        return out
    }
}

export class QuerySet {
    queries: Query[]

    // TODO: replace with CategoryType
    partialQueries: Array<Query>
    partialCategories: Set<string>;

    fullQueries: Array<Query>

    allCategories: CategoryType

    // categoryDependencies are subset dependencies. When a target category query
    // contains a subset of dimensions, AND a dependency category query contains
    // all dimensions, we need to query each of the dependencies dimensions individually.
    // These dependencies are defined as [<target>, <dependency>] pairs.
    categoryDependencies: [string, string][]

    annotatedDimensions: CategoryType

    constructor(allCategories: CategoryType,
                categoryDependencies: [string, string][],
                ...queries: Query[]) {

        this.queries = queries
        this.fullQueries = []
        this.fullCategories = new Set<string>()
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
                this.fullCategories.add(q.category)
                return
            }
            this.partialQueries.push(q)
            this.partialCategories.add(q.category)
        })

        // Add the non-existent categories to the fullQueries and fullCategories
        remaining.forEach((cat) => {
            this.fullQueries.push(new Query(cat, ''))
        })
    }

    logQuery(): string {
        const out = []
        this.queries.forEach((q) => {
            out.push(`<${[...q.dimensions].join(' ')}>`)
        })
        return [...out].join(', ')
    }

    selectQueryDimensions() {
        // Check the dependencies for each category.
        const includeAllDimensions = new Set()
        this.categoryDependencies.forEach((deps) => {
            const [target, dependency] = deps
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
            // There are no subset dependents for this query category. Now let's
            // check if this query includes all dimensions for this category.
            if (this.fullCategories.has(q.category)) {

                // Add the generic key for all dimensions, this will prevent returning each
                // dimension in the category.
                const substitute = new Query(q.category, '')
                querySets.push(substitute.compile())
                return
            }
            querySets.push(q.compile())
        })
        return querySets
    }

    compile(): Array<Set<string>> {
        const dimensions = this.selectQueryDimensions()
        return setsUtil.setsProduct(...dimensions)
    }
}

export const validateQueries = (categories: CategoryType,
                                annotatedDimensions: Set<string>,
                                ...queries: Array<Query>): string => {
    const catNames = new Set<string>()
    try {
        queries.forEach((query) => {
            if (catNames.has(query.category)) {
                throw new Error(`query has duplicate category: ${query.category}`)
            }
            catNames.add(query.category)
            const catDimensions = categories[query.category]
            if (catDimensions === undefined) {
                throw new Error(`unknown category: ${query.category}`)
            }
            if (query.dimensions.size == 0) {
                throw new Error(`missing dimensions for category query: ${query.category}`)
            }
            const intersected = setsUtil.setIntersection(annotatedDimensions, query.dimensions)
            if (!setsUtil.setEqual(intersected, query.dimensions)) {
                const diff = setsUtil.setDifference(query.dimensions, annotatedDimensions)
                let difference = []
                diff.forEach((item) => {
                    difference.push(item)
                })
                throw new Error(`query category has unknown dimensions: ${difference}`)
            }
        })
    } catch (e) {
        return e.message
    }
    return ''
}

export const query2dcids = (dcids: Array<Dcid>,
                            categories: CategoryType,
                            categoryDependencies: [string, string][],
                            annotatedDimensions: Set<string>,
                            ...queries: Array<Query>): QueryResult => {
    const err = validateQueries(categories, annotatedDimensions, ...queries)
    if (err != '') {
        return {'error': err} as QueryResult
    }
    const qs = new QuerySet(categories, categoryDependencies, ...queries)

    const out = new Array<string>()
    qs.compile().forEach((queryDimensions) => {
        dcids.forEach((dcid) => {
            const intersection = setsUtil.setIntersection(dcid.dimensions, queryDimensions)
            if (setsUtil.setEqual(queryDimensions, intersection)) {
                out.push(dcid.dcid)
            }
        })
    })
    return {'results': out} as QueryResult
}