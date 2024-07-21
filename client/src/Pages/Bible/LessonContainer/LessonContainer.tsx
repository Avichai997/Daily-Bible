import { FC, useMemo, useState } from 'react';
import { getBookAndChapters } from '@Components/Spotify/utils/searchDay';
import Bible from '../Bible';

export const LessonContainer: FC = () => {
  const [basicDay, setBasicDay] = useState(new Date());
  const studyDaily = useMemo(() => getBookAndChapters(basicDay), [basicDay]);

  return studyDaily ? <Bible day={basicDay} setDay={setBasicDay} studyDaily={studyDaily} /> : <></>;
};
