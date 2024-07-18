/* eslint-disable import/no-extraneous-dependencies */
import { useChapterSefaria } from '@ApiService/Requests/useDailySource';
import SpotifyEmbed from '@Components/Spotfy/Spotify';
import { FC, useCallback, useState } from 'react';
import { getGematria } from '@Components/Spotfy/utils/searchDay';
import { Button } from '@mui/material';
import { isDateToday } from '@Utils/Day';
import { ReactJewishDatePicker } from 'react-jewish-datepicker';
import { BibleBooks } from './Constants';
import { StudyDailyType } from './Bible.types';
import { SafeHebrewText } from './SafeText/SafeText';
import style from './Bible.module.scss';
import 'react-jewish-datepicker/dist/index.css';
import './react-jewish-datepicker.scss';

type BibleProps = {
  day: Date;
  setDay: (date: Date) => void;
  studyDaily: StudyDailyType;
};

const Bible: FC<BibleProps> = ({ day, setDay, studyDaily }) => {
  const [chapter, setChapter] = useState(studyDaily.chapter1.chapter);
  const [book, setBook] = useState(studyDaily.chapter1.book);
  const [prevStudyDaily, setPrevStudyDaily] = useState<StudyDailyType>(studyDaily);
  const { data } = useChapterSefaria(
    BibleBooks[book.replace(' ', '_') as keyof typeof BibleBooks],
    getGematria(chapter).toString(),
    !!book && !!chapter
  );

  if (studyDaily !== prevStudyDaily) {
    setPrevStudyDaily(studyDaily);
    setChapter(studyDaily.chapter1.chapter);
    setBook(studyDaily.chapter1.book);
  }

  const handleChapterClick = useCallback(
    (book: string, chapter: string) => {
      setChapter(chapter);
      setBook(book);
    },
    [setBook, setChapter]
  );

  const resetDate = useCallback(() => setDay(new Date()), [setDay]);

  return (
    <>
      <div>
        <h2 className={style['daily-lesson-header']}>
          הלימוד היומי - ספר {book} פרק {chapter}
        </h2>
        {studyDaily &&
          Object.values(studyDaily).map(
            (chap, index) =>
              chap.chapter &&
              chapter !== chap.chapter && (
                <Button key={index} onClick={() => handleChapterClick(chap.book, chap.chapter)}>
                  החלף לפרק {chap.chapter}
                </Button>
              )
          )}
      </div>
      <div className={style['lesson-container']}>
        <div className={style['lesson-source-container']}>
          {data.reverse().map((episode, index) => {
            const episodeArray = Array.isArray(episode) ? episode : [episode];

            return (
              <div key={index} className='episode'>
                <SafeHebrewText htmlContent={episodeArray.join(' ')} />
              </div>
            );
          })}
        </div>
        <div className={style['lesson-left-side']}>
          <div className={style['date-container']}>
            <ReactJewishDatePicker
              value={day}
              isHebrew
              onClick={(day) => setDay(day.date)}
              className={style['date-picker']}
            />

            <Button
              disabled={isDateToday(day)}
              onClick={resetDate}
              className={style['reset-date-button']}
            >
              חזור להיום
            </Button>
          </div>
          <SpotifyEmbed book={book} chapter={chapter} />
        </div>
      </div>
    </>
  );
};

export default Bible;
