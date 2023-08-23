import Papa from 'papaparse';

export const getData = async (sheet:string)  => {
    const out = await Papa.parse(sheet, {
      header: true,
      download: true,
      worker: true,
      complete (results) {
        console.log(results.data);
        Promise.resolve(results.data);
      },
    });
    return out;
}
