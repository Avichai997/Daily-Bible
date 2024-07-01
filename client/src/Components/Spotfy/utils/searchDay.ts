import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./output.json', 'utf-8'));

/**
 * Gets the name of the book and the chapters according to a certain date
 * @param {string} year - year (למשל 'תשע"ט')
 * @param {string} month - month (למשל 'סיון')
 * @param {string} day - day (למשל 'ו')
 * @returns {Object} - The name of the book and the chapters for that day
 */
export function getBookAndChapters(year: string, month: string, day: string) {
    const entry = data.find((item: { year: any; month: any; day: any; }) => item.year === year && item.month === month && item.day === day);
    if (entry) {
        return {
            book: entry.book,
            chapters: entry.chapters
        };
    } else {
        return null;
    }
}

const result = getBookAndChapters("תשע\"ח", 'סיון', 'ו');
console.log(result);
