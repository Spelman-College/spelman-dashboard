// formatPlot will add a key/value pair to each Object in `data`. This is used to annotate data
// dimensions when plotting.
export const formatPlot = (
  data: Array<Object>,
  keyName: string,
  keyValue: string
): Array<Object> => {
  const out = []
  data.forEach((blob) => {
    const keyed = Object.assign({}, blob)
    keyed[keyName] = keyValue
    out.push(keyed)
  })
  return out
}

export const keyFromKeys = (o: Object, ...keys: string[]): string => {
  const skeys = keys.sort()
  let newKey = ''
  skeys.forEach((key) => {
    const keyVal = o[key]
    if (keyVal === undefined) {
      throw new Error(`object is missing key: ${key}`)
    }
    newKey = `${newKey}_${keyVal}`
  })
  return newKey
}

// reduceIntersection will add all values with the `addName` key IFF each value for key
// in `keyNames` matches any other objects values.
// The order of the data is not considered and may be ordered randomly.
export const reduceIntersection = (
  data: Array,
  addName: string,
  ...keyNames: string[]
): Array<Object> => {
  const o = {}
  data.forEach((d) => {
    const key = keyFromKeys(d, ...keyNames)
    if (o.hasOwnProperty(key)) {
      o[key][addName] += d[addName]
    } else {
      o[key] = d
    }
  })
  const reduced = []
  for (const key in o) {
    reduced.push(o[key])
  }
  return reduced
}
