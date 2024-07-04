import { getChapterSefaria, useDailyLessonSource } from '@ApiService/Requests/useDailySource';
import DOMPurify from 'dompurify';
import style from './Bible.module.scss';
import SpotifyEmbed from '@Components/Spotfy/Spotify';
import { useEffect, useState } from 'react';
import { getBookAndChapters, getGematria } from '@Components/Spotfy/utils/searchDay';
import { BibleBooks } from './Constants';
import { studyDailyType } from './Bible.types';
import { Button } from '@mui/material';

const SafeHebrewText = ({ htmlContent }: { htmlContent: string | Node }) => {
  const safeHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};

const Bible = () => {
  const [data, setData] = useState<string[][]>([]);
  const [chapter, setChapter] = useState('');
  const [book, setBook] = useState('');
  const [studyDaily, setStudyDaily] = useState<studyDailyType>();

  useEffect(() => {
    const result = getBookAndChapters();
    if (result) {
      setBook(result.chapter1.book);
      setChapter(result.chapter1.chapter);
      setStudyDaily(result);
      getChapterDaily(result.chapter1.book, result.chapter1.chapter);
    }
  }, []);

  const getChapterDaily = async (book: string, numChapter: string) => {
    if (BibleBooks[book.replace(' ', '_') as keyof typeof BibleBooks]) {
      let chapter = await getChapterSefaria(
        BibleBooks[book.replace(' ', '_') as keyof typeof BibleBooks],
        getGematria(numChapter).toString()
      );
      setData(chapter);
    } else {
      console.error(`Invalid book name: ${book}`);
    }
  };

  const handleChapterClick = (book: string, chapter: string) => {
    getChapterDaily(book, chapter);
    setChapter(chapter);
    setBook(book);
  };
  return (
    <>
      <div>
        <h2 className={style['daily-lesson-header']}>הלימוד היומי פרק {chapter}</h2>
        {studyDaily &&
          Object.values(studyDaily).map(
            (chap: any, index: any) =>
              chap.chapter &&
              chapter != chap.chapter && (
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
        {book && chapter && <SpotifyEmbed book={book} chapter={chapter} />}
      </div>
    </>
  );
};

export default Bible;
