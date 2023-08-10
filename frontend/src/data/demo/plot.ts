
export const formatPlot = (data: Array<Object>, keyName: string, keyValue: string): Array<Object> => {
    const out = []
    data.forEach((blob) => {
	const keyed = Object.assign({},blob)
	keyed[keyName] = keyValue
	out.push(keyed)
    })
    return out
}
