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
      const extractedData = await parseExcelData(jsonData);
      resolve(extractedData);
    };
    reader.readAsArrayBuffer(file);
    reader.onerror = (error) => reject(error);
  }))
};

export const parseExcelData = async (data: (string | number)[][]) => {
  const headersRow1 = data[0];  // First row of headers (tenLop, khoa, ..., dynamic sinhVien key)
  const headersRow2 = data[1];  // Second row of headers (details like hoTen, gioiTinh, etc.)

  const sinhviensHeaders = headersRow2
    .slice(headersRow1.length)
    .map((header: any) => (header ? header.toString().trim() : ''))
    .filter((header: any) => header !== '');

  const mainHeaders = headersRow1
    .slice(0, headersRow1.length - 1)  // All main headers except the last one (e.g., tenLop, khoa)
    .map((header: any) => header.trim());

  const sinhVienKey = headersRow1[headersRow1.length - 1].trim();  // The last key (dynamic "sinhVien")

  const result: any[] = [];
  let currentMainEntry: any = null;

  for (let i = 2; i < data.length; i++) {
    const row = data[i];
    const sinhvienData: any = {};

    // Check if the row represents a new main entry (new class, department, etc.)
    const isMainEntry = mainHeaders.every((header: string, index: number) => {
      const colValue = row[index];
      return colValue !== undefined && colValue.toString().trim() !== '';
    });

    if (isMainEntry) {
      // If we already have an entry, push it to the result array
      if (currentMainEntry) {
        result.push(currentMainEntry);
      }

      // Create a new entry for the current row
      currentMainEntry = {};
      mainHeaders.forEach((header: any, index: number) => {
        const cellValue = row[index];
        currentMainEntry[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      // Initialize the dynamic sinhVien array
      currentMainEntry[sinhVienKey] = [];

      // Gather sinhVien data for this entry based on the second row (sinhVien headers)
      sinhviensHeaders.forEach((header: any, index: number) => {
        const cellIndex = headersRow1.length + index;
        const cellValue = row[cellIndex];
        sinhvienData[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      // Add sinhVien data if valid
      if (Object.values(sinhvienData).some((value) => value !== '')) {
        currentMainEntry[sinhVienKey].push(sinhvienData);
      }
    } else if (currentMainEntry) {
      // Append sinhVien data to the current entry
      sinhviensHeaders.forEach((header: any, index: number) => {
        const cellIndex = headersRow1.length + index;
        const cellValue = row[cellIndex];
        sinhvienData[header] =
          cellValue !== undefined ? cellValue.toString().trim() : '';
      });

      // Add sinhVien data if valid
      if (Object.values(sinhvienData).some((value) => value !== '')) {
        currentMainEntry[sinhVienKey].push(sinhvienData);
      }
    }
  }

  // Push the last entry after the loop ends
  if (currentMainEntry) {
    result.push(currentMainEntry);
  }

  return result;
};