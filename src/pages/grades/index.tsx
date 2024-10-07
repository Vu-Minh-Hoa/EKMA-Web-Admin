import * as xlsx from 'xlsx';

/* eslint-disable @typescript-eslint/no-explicit-any */
const CoursesGrades = () => {
  const handleFileUpload = (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt: any) => {
      try {
        const data = evt.target.result;
        const workbook = xlsx.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
        const processedData = processData(rawData);
        console.log(processedData);
      } catch (err) {
        console.error(err);
      }
    };

    reader.readAsBinaryString(file);
  };

  const processData = (data: any) => {
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

  return (
    <>
      <h1>CoursesGrades</h1>
      <p>Here is the CoursesGrades</p>
      <div>
        <input
          type='file'
          accept='.xlsx, .xls, .csv'
          onChange={handleFileUpload}
        />
      </div>
    </>
  );
};

export default CoursesGrades;
