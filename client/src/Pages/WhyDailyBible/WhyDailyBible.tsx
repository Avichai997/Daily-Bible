/* eslint-disable react/no-unescaped-entities */
import BiblePage from '../../../public/bible-page.jpg';
import { WhyContent } from './WhyContent/Content';
import './WhyDailyBible.scss';

const WhyDailyBiblePage = () => {
  return (
    <div className='why'>
      <h1 className='why-header'>למה תנ"ך יומי</h1>
      <div className='flex-row'>
        <div className='left'>
          <WhyContent />
        </div>
        <div className='right'>
          <img src={BiblePage} alt='למה תנ/"ך יומי' />
        </div>
      </div>
    </div>
  );
};
export default WhyDailyBiblePage;
