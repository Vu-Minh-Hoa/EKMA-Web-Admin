import * as xlsx from "xlsx";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const parseExcelFile = async (file: any) => {
  return await (new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target?.result;
      const workbook = xlsx.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[][] = xlsx.utils.sheet_to_json(sheet, { header: 1 });

      // Transforming data to the desired format
      const headers = jsonData[0];
      const formattedData = jsonData.slice(1).map((row) =>
        headers.reduce((acc, header, index) => {
          acc[header] = row[index] || ''; // Using an empty string for missing data
          return acc;
        }, {})
      );
      resolve(formattedData);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsBinaryString(file);
  }))
};


const handleFileUpload = (event: any) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const data = new Uint8Array(e.target.result);
    const workbook = xlsx.read(data, { type: 'array' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert sheet data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    // Process data according to format
    const formattedData = formatData(jsonData);
    console.log(formattedData);
  };

  reader.readAsArrayBuffer(file);
};

const formatData = (jsonData: any) => {
  const output = []; // Define the output array

  for (let i = 1; i < jsonData.length;) {
    // Skip rows without a main object identifier (e.g., empty or undefined 'smt' fields)
    if (!jsonData[i][0]) {
      i++;
      continue;
    }

    // Create the main object for this group
    const mainObj = {
      smt333: jsonData[i][0]?.toString() || '',
      smt2: jsonData[i][1]?.toString() || '',
      maSV1111: jsonData[i][2]?.toString() || '',
      smt44: jsonData[i][3]?.toString() || '',
      smt5: jsonData[i][4]?.toString() || '',
      smt6: jsonData[i][5]?.toString() || '',
      smt7: jsonData[i][6]?.toString() || '',
      sinhviens: []
    };

    // Collect all rows for the 'sinhviens' array until the next main object row is encountered
    let j = i + 1;
    while (j < jsonData.length && jsonData[j][0]) { // Continue while there's a valid main object
      const sinhvienObj = {
        Toans: jsonData[j][7]?.toString() || '',
        "subject 2": jsonData[j][8]?.toString() || '',
        subject5: jsonData[j][9]?.toString() || '',
        "subject 1": jsonData[j][10]?.toString() || '',
        subject11: jsonData[j][11]?.toString() || '',
        "subject 9": jsonData[j][12]?.toString() || '',
        "subject 8": jsonData[j][13]?.toString() || '',
        "subject 7": jsonData[j][14]?.toString() || ''
      };
      mainObj.sinhviens.push(sinhvienObj);
      j++;
    }

    // Add the completed main object to the output array
    output.push(mainObj);

    // Move to the next main object row
    i = j;
  }


  return output;
};
