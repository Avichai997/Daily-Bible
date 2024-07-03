import { getChapterSefaria, useDailyLessonSource } from '@ApiService/Requests/useDailySource';
import DOMPurify from 'dompurify';
import style from './Bible.module.scss';
import SpotifyEmbed from '@Components/Spotfy/Spotify';
import { useEffect, useState } from 'react';
import { getBookAndChapters, getGematria } from '@Components/Spotfy/utils/searchDay';
import { BibleBooks } from './Constants';
import { chaptersType, studyDailyType } from './Bible.types';
import { r } from 'msw/lib/glossary-de6278a9';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

const SafeHebrewText = ({ htmlContent }: { htmlContent: string | Node }) => {
  const safeHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};

const Bible = () => {
  const [data, setData] = useState<string[][]>([]);
  const [chapter, setChapter] = useState('');
  const [book, setBook] = useState('');
  const [chapters, setchapters] = useState<chaptersType>();
  const [studyDaily, setStudyDaily] = useState<studyDailyType>();

  useEffect(() => {
    const result = getBookAndChapters();
    if (result) {
      setchapters(result.chapters);
      setBook(result.book);
      setChapter(result.chapters.chapter1);
      setStudyDaily(result);
      getChapterDaily(result, result.chapters.chapter1);
    }
  }, []);

  const getChapterDaily = async (result: studyDailyType, numChapter: string) => {
    if (BibleBooks[result.book as keyof typeof BibleBooks]) {
      let chapter = await getChapterSefaria(
        BibleBooks[result.book as keyof typeof BibleBooks],
        getGematria(numChapter).toString()
      );
      setData(chapter);
    } else {
      console.error(`Invalid book name: ${result.book}`);
    }
  };

  const handleChapterClick = (chapter: string) => {
    console.log(studyDaily);
    if (studyDaily) {
      getChapterDaily(studyDaily, chapter);
      setChapter(chapter);
    }
  };
  return (
    <>
      <div>
        <h2 className={style['daily-lesson-header']}>הלימוד היומי פרק {chapter}</h2>
        {chapters &&
          Object.values(chapters).map(
            (chap: any, index: any) =>
              chap &&
              chapter != chap && (
                <button key={index} onClick={() => handleChapterClick(chap)}>
                  פרק {chap}
                </button>
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
