import { Parser } from '@json2csv/plainjs'

// Used to test UI loading elements
const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function downloadCSV(data: Array<Map>, filename: string) {
  //// Used to test UI loading elements while download is occurring.
  // await delay(1000)
  try {
    const parser_opts = {}
    const parser = new Parser(parser_opts)
    const csv = parser.parse(data)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.setAttribute('href', url)
    a.setAttribute('download', `${filename}.csv`)
    a.click()
  } catch (err) {
    console.log(err)
  }
}
