import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useRef, useState } from 'react';

dayjs.extend(duration);
dayjs.extend(relativeTime);

interface ITimeTracker {
  createdAt: number;
}

const TimeTracker = ({ createdAt }: ITimeTracker) => {
  const [, setTimeCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  // refresh value 'createdAt' every ~ 1 minute
  useEffect(() => {
    intervalRef.current = setInterval(() => setTimeCounter((time) => time + 1), 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  const timeCreate = dayjs(createdAt).fromNow();
  const numTimeCreated = timeCreate.match(/(\d+)/);
  const isNow = timeCreate === 'a few seconds ago';
  const isMinute = timeCreate === 'a minute ago';
  const isHour = !!timeCreate.match('hour');

  const message = isNow
    ? 'נוצר כעת'
    : isMinute
      ? 'נוצר לפני דקה'
      : !isHour && numTimeCreated
        ? `נוצר לפני  ${numTimeCreated![0]}  דקות `
        : isHour && !numTimeCreated
          ? `נוצר לפני  ${numTimeCreated![0]}  שעות `
          : '';

  return <span style={{ color: '#666' }}>{message}</span>;
};
export default TimeTracker;
