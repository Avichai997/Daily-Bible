import { useChapterSefaria } from '@ApiService/Requests/useDailySource';
import DOMPurify from 'dompurify';
import SpotifyEmbed from '@Components/Spotfy/Spotify';
import { useEffect, useState } from 'react';
import { getBookAndChapters, getGematria } from '@Components/Spotfy/utils/searchDay';
import { Button } from '@mui/material';
import { BibleBooks } from './Constants';
import { StudyDailyType } from './Bible.types';
import style from './Bible.module.scss';

const SafeHebrewText = ({ htmlContent }: { htmlContent: string | Node }) => {
  const safeHTML = DOMPurify.sanitize(htmlContent);

  // eslint-disable-next-line react/no-danger
  return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};

const Bible = () => {
  const [chapter, setChapter] = useState('');
  const [book, setBook] = useState('');
  const [studyDaily, setStudyDaily] = useState<StudyDailyType>();

  useEffect(() => {
    const result = getBookAndChapters();
    if (result) {
      setBook(result.chapter1.book);
      setChapter(result.chapter1.chapter);
      setStudyDaily(result);
    }
  }, []);

  const { data } = useChapterSefaria(
    BibleBooks[book.replace(' ', '_') as keyof typeof BibleBooks],
    getGematria(chapter).toString(),
    !!book && !!chapter
  );

  const handleChapterClick = (book: string, chapter: string) => {
    setChapter(chapter);
    setBook(book);
  };

  return (
    <>
      <div>
        <h2 className={style['daily-lesson-header']}>הלימוד היומי פרק {chapter}</h2>
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
        <SpotifyEmbed book={book} chapter={chapter} />
      </div>
    </>
  );
};

export default Bible;
