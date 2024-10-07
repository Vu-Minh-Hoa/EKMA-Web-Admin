import * as xlsx from 'xlsx';

/* eslint-disable @typescript-eslint/no-explicit-any */
const CoursesGrades = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (evt) => {
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

  const processData = (data) => {
    if (data.length < 2) {
      setError('The Excel file does not contain enough rows.');
      return [];
    }

    // Extract header rows
    const headersRow1 = data[0];
    const headersRow2 = data[1];

    // Identify the index where 'sinhviens' starts
    // const sinhviensStartIndex = headersRow1.findIndex(header => header.toLowerCase() === 'sinhviens');
    console.log(headersRow1);
    console.log(headersRow2);
    // if (sinhviensStartIndex === -1) {
    //   setError("Couldn't find the 'sinhviens' header.");
    //   return [];
    // }

    // Combine headers for 'sinhviens' columns
    const sinhviensHeaders = headersRow2
      .slice(headersRow1.length)
      .map((header) => header.trim());
    const result = [];
    const currentMainEntry: any = null;

    for (let i = 2; i < data.length; i++) {
      const row = data[i];
      // Check if the row represents a main entry by verifying the first few columns
      const isMainEntry =
        row[0] !== undefined &&
        row[1] !== undefined &&
        row[2] !== undefined &&
        row[2].toString().trim() !== '';

      if (isMainEntry) {
        if (currentMainEntry) {
          result.push(currentMainEntry);
        }

        for (let i = 0; i < headersRow1.length - 2; i++) {
          console.log('currentMainEntry: ', row, row[i]);
          currentMainEntry[headersRow1[i]] = row[i];
        }
        currentMainEntry[headersRow1[headersRow1.length - 1]] = [];
      } else if (currentMainEntry) {
        // Process 'sinhviens' data
        const sinhvienData = {};

        sinhviensHeaders.forEach((header, index) => {
          const cellValue = row[headersRow1.length + index];
          sinhvienData[header] = cellValue ? cellValue?.toString().trim() : '';
        });

        // Only add sinhvienData if at least one field is non-empty
        if (Object.values(sinhvienData).some((value) => value !== '')) {
          currentMainEntry.sinhviens.push(sinhvienData);
        }
      }
    }

    // Push the last main entry if it exists
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
