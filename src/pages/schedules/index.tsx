/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import * as XLSX from 'xlsx';

interface Sinhvien {
  subject: string;
  value: number;
}

const CoursesSchedules = () => {
  const [data, setData] = useState<
    {
      smt: number;
      smt2: number;
      maSV: string;
      lastRowArrays: Sinhvien[];
      smt44: string;
      smt5: string;
      smt6: string;
      smt7: string;
    }[]
  >([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
        }) as (string | number)[][];
        const extractedData = parseData(jsonData);
        setData(extractedData);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const parseData = (jsonData: (string | number)[][]) => {
    const [header1, subheader, ...rows] = jsonData;
    const data: any = [];

    rows.forEach((row) => {
      // Create an object to hold main data fields
      const rowData: any = {};

      // Loop through header1 to assign values for main keys
      header1.forEach((key, index) => {
        if (index < header1.length - 1) {
          // For all columns except the last "lastRowArrays" column
          rowData[key] = row[index];
        }
      });

      // For the "lastRowArrays" column (last column in header1)
      const lastRowArrays = [];
      const lastRowArraysStartIndex = header1.length - 1; // Start of lastRowArrays data in row

      for (let i = lastRowArraysStartIndex; i < row.length; i++) {
        if (subheader[i] && row[i] !== undefined) {
          // Only process if subheader exists and value is defined
          lastRowArrays.push({
            subject: subheader[i] as string,
            value: row[i] as number,
          });
        }
      }

      // Add lastRowArrays data as an array of objects under the "lastRowArrays" key
      rowData[header1[header1.length - 1]] = lastRowArrays;
      // Append the structured data to the main data array
      data.push(rowData);
    });
    return data;
  };

  return (
    <div>
      <input type='file' accept='.xlsx, .csv' onChange={handleFileUpload} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default CoursesSchedules;
