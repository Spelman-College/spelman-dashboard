import Papa from 'papaparse'

export const getData = async (sheet: string) => {
  return new Promise((resolve, reject) => {
    Papa.parse(sheet, {
      header: true,
      download: true,
      worker: true,
      complete(results) {
        resolve(results.data)
      }
    })
  })
}
