/* eslint-disable @cspell/spellchecker */
// eslint-disable-next-line import/no-extraneous-dependencies
import { toHebrewJewishDate, toJewishDate } from 'jewish-date';
import { StudyDailyType } from '@Pages/Bible/Bible.types';
import dailyStudy from '../dailyStudy.json';
import { IGematria } from './spotify.consts';
// const data = JSON.parse(fs.readFileSync('./output.json', 'utf-8'));

// /**
//  * Gets the name of the book and the chapters according to a certain date
//  * @param {string} year - year (למשל 'תשע"ט')
//  * @param {string} month - month (למשל 'סיון')
//  * @param {string} day - day (למשל 'ו')
//  * @returns {Object} - The name of the book and the chapters for that day
//  */

const getJewishDate = (date: Date) => {
  const jewishDate = toJewishDate(date);

  return toHebrewJewishDate(jewishDate);
};

export function getBookAndChapters(date = new Date()) {
  const jewishDate = getJewishDate(date);
  const entry = dailyStudy.find(
    (item) =>
      item.month === jewishDate.monthName && item.day === jewishDate.day.replace(/["'״׳]/g, '')
  );

  if (!entry) {
    return null;
  }
  const chaptersArray = entry.chapters.split(' ');
  const bookChapters: StudyDailyType = {
    chapter1: { book: '', chapter: '' },
    chapter2: { book: '', chapter: '' },
    chapter3: { book: '', chapter: '' },
  };

  if (chaptersArray.length >= 2 && chaptersArray[0] > chaptersArray[1]) {
    bookChapters.chapter2 = { book: entry.book, chapter: chaptersArray[1] };

    // Find the previous book for the first chapter
    const currentDate = new Date();
    const previousDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
    const previousJewishDate = getJewishDate(previousDate);
    const previousEntry = dailyStudy.find(
      (item) =>
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
}

export function getGematria(value: string): number {
  let total = 0;
  for (const char of value) {
    if (IGematria[char as keyof typeof IGematria] !== undefined) {
      total += IGematria[char as keyof typeof IGematria];
    }
  }

  return total;
}

export function splitChapters(chapters: string): [string, string] {
  const [chapter1, chapter2] = chapters.split(' ');

  return [chapter1, chapter2];
}

export function convertToEmbedUrl(spotifyUrl: string): string {
  const episodeIdMatch = spotifyUrl?.match(/episode\/([^?]+)/);
  if (episodeIdMatch) {
    const episodeId = episodeIdMatch[1];

    return `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator`;
  }

  return '';
}
