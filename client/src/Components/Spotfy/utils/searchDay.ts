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
  const jewishDate = getJwishDate(new Date());
  const entry = dailyStudy.find(
    (item: { month: any; day: any }) =>
      item.month === jewishDate.monthName && item.day === jewishDate.day.replace(/["'״׳]/g, '')
  );
  console.log(entry);

  if (entry) {
    const chaptersArray = entry.chapters.split(' ');
    let bookChapters = {
      chapter1: { book: '', chapter: '' },
      chapter2: { book: '', chapter: '' },
      chapter3: { book: '', chapter: '' },
    };

    if (chaptersArray.length >= 2 && chaptersArray[0] > chaptersArray[1]) {
      bookChapters.chapter2 = { book: entry.book, chapter: chaptersArray[1] };

      // Find the previous book for the first chapter
      const currentDate = new Date();
      const previousDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
      const previousJewishDate = getJwishDate(previousDate);
      const previousEntry = dailyStudy.find(
        (item: { month: any; day: any }) =>
          item.month === previousJewishDate.monthName &&
          item.day === previousJewishDate.day.replace(/["'״׳]/g, '')
      );

      if (previousEntry) {
        bookChapters.chapter1 = { book: previousEntry.book, chapter: chaptersArray[0] };
      }
    } else {
      bookChapters.chapter1 = { book: entry.book, chapter: chaptersArray[0] };
      bookChapters.chapter2 = { book: entry.book, chapter: chaptersArray[1] };
      if (chaptersArray.length > 2) {
        bookChapters.chapter3 = { book: entry.book, chapter: chaptersArray[2] };
      }
    }

    return bookChapters;
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

const getJwishDate = (date: Date) => {
  const jewishDate = toJewishDate(date);
  return toHebrewJewishDate(jewishDate);
};
