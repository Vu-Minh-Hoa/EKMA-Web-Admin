import * as xlsx from "xlsx";


export const loadExcelData = async (file: any) => {
  const data = await file.arrayBuffer();
  const workbook = xlsx.read(data, { type: 'array' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet, { header: 1, defval: '' });
};

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



export const parceSubheaderFile = async (file: any) => {
  return await (new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = xlsx.read(data, { type: 'array' });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, {
        header: 1,
      }) as (string | number)[][];
      const extractedData = await parseData(jsonData);
      resolve(extractedData);
    };
    reader.readAsArrayBuffer(file);
    reader.onerror = (error) => reject(error);
  }))
};

const parseData = async (data: (string | number)[][]) => {
  const headersRow1 = data[0];
  const headersRow2 = data[1];

  const sinhviensHeaders = headersRow2
    .slice(headersRow1.length)
    .map((header: any) => (header ? header.toString().trim() : ''))
    .filter((header: any) => header !== '');

  const mainHeaders = headersRow1
    .slice(0, headersRow1.length)
    .map((header: any) => header.trim());

  const result = [];
  let currentMainEntry: any = {};

  for (let i = 2; i < data.length; i++) {
    const row = data[i];
    const sinhvienData: any = {};

    const isMainEntry = mainHeaders.every((index: number) => {
      const colIndex = index;
      return (
        row[colIndex] !== undefined && row[colIndex].toString().trim() !== ''
      );
    });

    if (isMainEntry) {
      if (currentMainEntry) {
        result.push(currentMainEntry);
      }

      currentMainEntry = {};
      mainHeaders.forEach((header: any, index: number) => {
        const cellValue = row[index];
        currentMainEntry[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      currentMainEntry[headersRow1[headersRow1.length - 1]] = [];

      sinhviensHeaders.forEach((header: any, index: number) => {
        const cellIndex = headersRow1.length + index;
        const cellValue = row[cellIndex];
        sinhvienData[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      if (Object.values(sinhvienData).some((value) => value !== '')) {
        currentMainEntry[headersRow1[headersRow1.length - 1]].push(
          sinhvienData,
        );
      }
    } else if (currentMainEntry) {
      sinhviensHeaders.forEach((header: any, index: number) => {
        const cellIndex = headersRow1.length + index;
        const cellValue = row[cellIndex];
        sinhvienData[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      if (Object.values(sinhvienData).some((value) => value !== '')) {
        currentMainEntry[headersRow1[headersRow1.length - 1]].push(
          sinhvienData,
        );
      }
    }
  }

  if (currentMainEntry) {
    result.push(currentMainEntry);
  }

  return result;
};