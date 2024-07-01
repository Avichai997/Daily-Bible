import fs from 'fs';
const xlsx = require('xlsx');

// Load the Excel file
const workbook = xlsx.readFile('./studyBoard.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// Convert the sheet to JSON
const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

// Process the data into the desired format
const formattedData: { year: string; month: string; day: any; book: string; chapters: any; }[] = [];
let currentYear = '';
let currentMonth = '';
let currentBook = '';

jsonData.forEach((row: any[]) => {
    if (row[0]) currentYear = row[0];
    if (row[1]) currentMonth = row[1];
    if (row[3]) currentBook = row[3];
    
    formattedData.push({
        year: currentYear,
        month: currentMonth,
        day: row[2],
        book: currentBook,
        chapters: row[4]
    });
});

// Save the data to a JSON file
fs.writeFileSync('output.json', JSON.stringify(formattedData, null, 2));
