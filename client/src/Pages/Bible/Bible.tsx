import { useDailyLessonSource } from '@ApiService/Requests/useDailySource';
import DOMPurify from 'dompurify';
import style from './Bible.module.scss';

const SafeHebrewText = ({ htmlContent }: { htmlContent: string | Node }) => {
  const safeHTML = DOMPurify.sanitize(htmlContent);

  return <div dangerouslySetInnerHTML={{ __html: safeHTML }} />;
};

const Bible = () => {
  const { data } = useDailyLessonSource();

  return (
    <>
      <h2 className={style['daily-lesson-header']}>הלימוד היומי</h2>
      <div className={style['lesson-container']}>
        <div className={style['lesson-source-container']}>
          {data.reverse().map((episode, index) => (
            <div key={index} className={style['episode']}>
              <SafeHebrewText htmlContent={episode.join('  ')} />
            </div>
          ))}
        </div>
        <div className={style['lesson-audio']}>{/** TODO: add spotify player & calender */}</div>
      </div>
    </>
  );
};

export default Bible;
