import Papa from 'papaparse';

export async function getData(sheet:string, rows:([])) {
    await Papa.parse(sheet, {
      header: true,
      download: true,
      worker: true,
      complete: function (results, file) {
        rows.value = results.data;
      },
    });
  return rows;
}