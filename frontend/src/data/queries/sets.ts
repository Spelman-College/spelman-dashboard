
// setsProduct returns the cartesian product of the values where each
// output value is the set union.
export const setsProduct = (...sets: Array<Set<string>>) => {
    const reduced = sets.reduce((acc, val) => {
        const placeholder = []
        acc.forEach((a) => {
            val.forEach((b) => {
                placeholder.push(new Set<string>([...a].concat([...b])))
            })
        })
        return placeholder
    }, [new Set<string>()])
    return reduced
}

export const setEqual = (a: Set<string>, b: Set<string>): boolean => {
    if (a.size != b.size) {
        return false
    }
    return [...a].every((elem) => {
        return b.has(elem)
    })
}

export const setIntersection = (a: Set<string>, b: Set<string>): Set<string> => {
    return new Set<string>(
        [...a].filter((elem) => {
            return b.has(elem)
        })
    )
}

export const setDifference = (a: Set<string>, b: Set<string>): Set<string> => {
    return new Set<string>(
        [...a].filter((elem) => {
            return !b.has(elem)
        })
    )
}
