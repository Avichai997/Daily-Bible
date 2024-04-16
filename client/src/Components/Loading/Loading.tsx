import { createPortal } from 'react-dom';
import { Backdrop } from '@mui/material';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import classes from './Loading.module.scss';

const Loading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return createPortal(
    <Backdrop className={classes.backdrop} open={!!(isFetching || isMutating)}>
      <div className={classes.spinnerContainer}>
        טוען מידע
        <div className={`${classes.spinner} ${classes['spinner-red']}`} />
        <div className={`${classes.spinner} ${classes['spinner-blue']}`} />
        <div className={`${classes.spinner} ${classes['spinner-green']}`} />
      </div>
    </Backdrop>,
    document.getElementById('loadingPortal') as HTMLElement
  );
};

export default Loading;
