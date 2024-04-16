import { Button } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Accordion from '@Components/Accordion/Accordion';
import {
  SOMETHING_WENT_WRONG_TEXT,
  BACK_TO_PREV_PAGE_TEXT,
  BACK_TO_HOME_TEXT,
  HIDE_ERROR_MSG,
  SHOW_ERROR_MSG,
} from '@CommonConstants';
import { getErrorSummary, logError } from '@CommonFunctions';
import classes from './ErrorFallback.module.scss';
import { accordionSx, summaryStyle } from './ErrorFallback.StyleSheet';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorLocation = useRef(location.pathname);

  if (error) logError(error);

  useEffect(() => {
    if (location.pathname === errorLocation.current) return;

    resetErrorBoundary();
  }, [location.pathname, resetErrorBoundary]);

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h1 className={classes.mainTitle}>{SOMETHING_WENT_WRONG_TEXT}</h1>
      </div>

      <div className={classes.buttonsFooter}>
        <Button className={classes.buttonRight} onClick={() => navigate(-1)} variant='contained'>
          {BACK_TO_PREV_PAGE_TEXT}
        </Button>

        <Button href='/' variant='contained'>
          {BACK_TO_HOME_TEXT}
        </Button>
      </div>

      <Accordion
        labelClosed={SHOW_ERROR_MSG}
        labelOpen={HIDE_ERROR_MSG}
        summaryString={getErrorSummary(error)}
        summaryStyle={summaryStyle}
        accordionSx={accordionSx}
      />
    </div>
  );
};

export default ErrorFallback;
