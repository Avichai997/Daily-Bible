/* eslint-disable @cspell/spellchecker */
import { IDailyLessons, ILessonSource } from '@ApiService/Interfaces/IDailySource';
import { DAILY_LESSONS_KEY, DAILY_LESSON_SOURCE_KEY } from '@CommonConstants';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const SEFARIA_URL = 'https://www.sefaria.org/api';
const DEFAULT_DATE = new Date();

export const axiosClient = axios.create({
  baseURL: `${SEFARIA_URL}`,
  withCredentials: true,
});

const getDailyLessons = async (date: Date): Promise<IDailyLessons> => {
  const dateFilter = `?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`;

  return fetch(`${SEFARIA_URL}/calendars${dateFilter}`).then((res) => res.json());
};

const getBibleDailyLessonSource = async (tref?: string): Promise<string[][]> => {
  const res = await fetch(`${SEFARIA_URL}/v3/texts/${tref}?version=hebrew`).then(
    (res) => res.json() as Promise<ILessonSource>
  );

  return res?.versions?.[0]?.text;
};

export const useDailyLessons = (date: Date) => {
  return useQuery<unknown, unknown, IDailyLessons>({
    queryKey: [DAILY_LESSONS_KEY, date],
    queryFn: () => getDailyLessons(date),
    initialData: {},
    staleTime: 0,
    cacheTime: 0,
  });
};

export const useBibleDailyLessonSource = (tref?: string) => {
  return useQuery<string[][], unknown, string[][]>({
    queryKey: [DAILY_LESSON_SOURCE_KEY, tref],
    queryFn: () => getBibleDailyLessonSource(tref),
    initialData: [],
    staleTime: 0,
    cacheTime: 0,
    enabled: !!tref,
  });
};

export const useDailyLessonSource = (date = DEFAULT_DATE) => {
  const {
    data: dailyLessons,
    isLoading: isLoadingLessons,
    error: loadLessonsError,
  } = useDailyLessons(date);

  const bibleDailyLessons = dailyLessons?.calendar_items?.find(
    (item) => item.title.en === 'Tanakh Yomi'
  );

  const {
    data: dailyLessonSource,
    isLoading: isLoadingSource,
    error: loadSourceError,
  } = useBibleDailyLessonSource(bibleDailyLessons?.ref);

  return {
    isLoading: isLoadingLessons || isLoadingSource,
    error: loadLessonsError ?? loadSourceError,
    data: dailyLessonSource,
  };
};

export const getChapterSefaria = async (book: string, chapter: string): Promise<string[][]> => {
  const res = await fetch(`${SEFARIA_URL}/v3/texts/${book}_${chapter}?version=hebrew`).then(
    (res) => res.json() as Promise<ILessonSource>
  );
  console.log(res);

  return res?.versions?.[0]?.text;
};

export const useChapterSefaria = (book: string, chapter: string, enabled: boolean) => {
  return useQuery<string[][], Error>({
    queryKey: ['DAILY_LESSON_SOURCE_KEY', book, chapter],
    queryFn: () => getChapterSefaria(book, chapter),
    enabled,
    staleTime: 0,
    cacheTime: 0,
    initialData: [],
  });
};
