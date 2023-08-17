import * as setsUtil from "./sets"
import type { CategoryType } from "./dcid"


export interface Queryable {
    query(...queries: Array<Query>): QueryResult
    categories(): CategoryType
}

export type QueryResult = {
    error: string
    results: Array<string>
}

// A Query represents a single category and one or more dimensions.
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

// A QuerySet takes one or more Query objects and some category metadata. The `compile` method
// returns an array of Sets that are meant to match a `Dcid.dimensions` Set.
export class QuerySet {
    queries: Query[]

    // TODO: replace with CategoryType
    partialQueries: Array<Query>
    partialCategories: Set<string>;

    fullQueries: Array<Query>
    fullCategories: Set<string>;

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
            if (q.dimensions.size == 0 || (containsAllDimensions && this.allCategories[q.category].size != 1)) {
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
            this.fullCategories.add(cat)
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
            var [target_cat, dependency_cat] = deps
            var dependency_dim = ""

            const colon_loc = dependency_cat.search(':')
            if (colon_loc != -1) {
                dependency_dim = dependency_cat.substring(colon_loc + 1)
                dependency_cat = dependency_cat.substring(0, colon_loc)
            }
            const isDependencyQuery = (q) => q.category == dependency_cat;

            // Does the target category include a query for all dimensions?
            if (this.partialCategories.has(target_cat)) {

                // Is the dependency being queried via a subset of all it's dimensions?
                if (this.partialCategories.has(dependency_cat)) {
                    // We can skip.
                    return
                };
                // If the dependcy has a specified dimension add it to partial queries
                if (dependency_dim != "") {
                    // Check that the dimension is valid
                    if (!this.allCategories[dependency_cat].has(dependency_dim)) {
                        throw new Error(`query dependency category: ${dependency_cat} has unknown dimension: ${dependency_dim}`)
                    }

                    //delete from all dimensions if included
                    includeAllDimensions.delete(dependency_cat)
                    this.partialCategories.add(dependency_cat)
                    this.partialQueries.push(new Query(dependency_cat, dependency_dim))
                    if (this.fullCategories.delete(dependency_cat)) {
                        this.fullQueries.splice(this.fullQueries.findIndex(isDependencyQuery), 1)
                    }
                    return
                }

                // No specified dependency dimension, check if dependency already present in all dimensions
                if (includeAllDimensions.has(dependency_cat)) {
                    return
                }

                // The dependency is either missing or being assumed to query all dimensions.
                // We need to EXPLICITLY query all of the keys for the dependency.
                includeAllDimensions.add(dependency_cat)
            }
        })

        // Once we've marked all category dependencies, we can iterate over all queries,
        // adding the full set of dimensions to category queries that require it.
        const querySets = []
        this.partialQueries.concat(this.fullQueries).forEach((q) => {
            if (includeAllDimensions.has(q.category)) {
                const replacement = new Query(q.category, ...this.allCategories[q.category])
                querySets.push(replacement.compile())
                return
            }
            // There are no subset dependents for this query category. Now let's
            // check if this query includes all dimensions for this category.
            if (this.fullCategories.has(q.category) && this.allCategories[q.category].size != 1) {

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
    const includesAllDimensions = new Set<string>()
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
	    // console.log('intersected', intersected, 'catDimensions', catDimensions)
	    if (intersected.size == catDimensions.size) {
		includesAllDimensions.add(query.category)
	    }
        })
	// console.log(includesAllDimensions, catNames)
	if (setsUtil.setEqual(includesAllDimensions, catNames)) {
	    throw new Error(`All query categories given include all respective dimensions`)
	}
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
        return { 'error': err } as QueryResult
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

// A QueryCompare accepts a category to compare, a Queryable class, and
// a Map<string(a category dimension), Array<Query>> for plotting/comparing.
// The `compile` method returns an Array<Array<string>> of `Dcid.dcid` strings;
// each sub-Array refers the respective
// Array<Query> index from the constructor method argument `queries`.
export class QueryCompare {
    queries: Map<string, Array<Query>>
    queryable: Queryable
    category: string

    constructor(category:string, queryable: Queryable, queries: Map<string, Array<Query>>) {
	if (Object.keys(queries).length < 2) {
	    throw new Error('QueryCompare requires a Map with at least 2 items')
	}

	this.queries = queries
	this.category = category
	this.queryable = queryable

	if (this.queryable.categories()[category] === undefined) {
	    throw new Error(`category missing from queries: ${category}`)
	}
    }

    validate(): string {
	// We can only compare subsets of the category argument. If we find
	// the same dimensions from the target category in any other QuerySet, we throw an error.
	// This prevents comparing the same dimensions in the target category.
	const existingDimensions = new Set<string>()
	try {
	    for (const dim in this.queries) {
		const qs = this.queries[dim]
		// qs is an Array<Query>
		qs.forEach((q) => {
		    q.dimensions.forEach((d) => {
			if (q.category == this.category && existingDimensions.has(d)) {
			    throw new Error(`duplicate dimensions in the ${this.category} category: ${d}`)
			}
			existingDimensions.add(d)
		    })
		})
	    }
	} catch (e) {
	    return e.message
	}
	return ''
    }

    compile(): Map<string, Array<string>> {
	const out: Map<string, Array<string>> = {}
	for (const dim in this.queries) {
	    const qs = this.queries[dim]
	    const res = this.queryable.query(...qs)
	    if (res.error !== undefined) {
		throw new Error(`Error querying Queryable: ${res.error}`)
	    }
	    out[dim] = res.results
	}
	return out
    }
}

// expandCompares accepts a category to compare and a
// Map<string(category), Array<string(dimension for the respective category)>>
// It will return a Map<`dimension of compare category`, Array<Query>>, where Array<Query> includes
// all queries to be compared against the other category dimension(s).
export const expandCompares = (compareCategory: string, queries: Map<string, Array<string>>): Map<string, Array<Query>> => {

    const out: Map<string, Array<Query>> = {}
    const compareDimensions = queries[compareCategory]
    if (compareDimensions === undefined) {
	throw new Error(`Cannot compare category that does not exist in queries. category: ${compareCategory} queries: ${queries}`)
    }
    compareDimensions.forEach((dim) => {
	const placeholder = [new Query(compareCategory, dim)]
	for (const cat in queries) {
	    if (cat == compareCategory) {
		continue
	    }
	    const dimensions = queries[cat]
	    if (dimensions.length == 0) {
		continue
	    }
	    placeholder.push(new Query(cat, ...dimensions))
	}
	out[dim] = placeholder
    })
    return out
}
