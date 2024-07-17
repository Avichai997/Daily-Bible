// export type studyDailyType = {
//   book: string;
//   chapters: chaptersType;
// };

export type Chapter = { book: string; chapter: string };

export type StudyDailyType = Record<'chapter1' | 'chapter2' | 'chapter3', Chapter>;
