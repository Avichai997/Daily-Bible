import fs from 'fs';
import dailyStudy from '../dailyStudy.json';
import { Gematria } from './spotify.consts';
import { toHebrewJewishDate, toJewishDate } from 'jewish-date';
// const data = JSON.parse(fs.readFileSync('./output.json', 'utf-8'));

// /**
//  * Gets the name of the book and the chapters according to a certain date
//  * @param {string} year - year (למשל 'תשע"ט')
//  * @param {string} month - month (למשל 'סיון')
//  * @param {string} day - day (למשל 'ו')
//  * @returns {Object} - The name of the book and the chapters for that day
//  */
export function getBookAndChapters() {
  const jewishDate = getJwishDate();
  console.log(jewishDate)
  const entry = dailyStudy.find(
    (item: { month: any; day: any }) =>
      item.month === jewishDate.monthName && item.day === jewishDate.day.replace(/["'״׳]/g, '')
  );
  if (entry) {
    const [chapter1, chapter2, chapter3] = entry.chapters.split(' ');
    return {
      book: entry.book,
      chapters: { chapter1, chapter2, chapter3},
    };
  } else {
    return null;
  }
}

export function getGematria(value: string): number {
  let total = 0;
  for (let char of value) {
    if (Gematria[char as keyof typeof Gematria] !== undefined) {
      total += Gematria[char as keyof typeof Gematria];
    }
  }
  return total;
}

export function splitChapters(chapters: string): [string, string] {
  const [chapter1, chapter2] = chapters.split(' ');
  return [chapter1, chapter2];
}

export function convertToEmbedUrl(spotifyUrl: string): string {
  const episodeIdMatch = spotifyUrl.match(/episode\/([^?]+)/);
  if (episodeIdMatch) {
    const episodeId = episodeIdMatch[1];
    return `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator`;
  }
  return '';
}

const getJwishDate = () => {
  const jewishDate = toJewishDate(new Date());
  return toHebrewJewishDate(jewishDate);
};
