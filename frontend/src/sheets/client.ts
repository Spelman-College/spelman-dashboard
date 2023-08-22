import Papa from 'papaparse';
import { ref } from 'vue'

var rows:string[] = [];

export async function getData(sheet:string) {
    await Papa.parse(sheet, {
      header: true,
      download: true,
      worker: true,
      complete: function (results, file) {
        rows = results.data;
        // Expected array logged
        console.log(rows);

      },
    });
    // Empty array logged
    console.log(rows);
    return rows;
}