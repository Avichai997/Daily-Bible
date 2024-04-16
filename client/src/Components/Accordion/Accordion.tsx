import { SyntheticEvent, useId, useState } from 'react';
import {
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import cancelIcon from '@Assets/Images/cancelIcon.svg';
import plusIcon from '@Assets/Images/plusIcon.svg';
import { IAccordion } from '@CommonInterfaces';
import { styleAccordionSummary } from './Accordion.StyleSheet';

const Accordion = ({
  labelClosed,
  labelOpen,
  labelDefault,
  summaryString,
  children,
  summaryStyle,
  accordionSx,
  isOpenDefault = false,
}: IAccordion) => {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState<string | false>(isOpenDefault ? uniqueId : false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isOpenAccordion: boolean) => {
    setIsOpen(isOpenAccordion ? panel : false);
  };
  const label = isOpen ? labelOpen : labelClosed;
  const expandIcon = isOpen ? cancelIcon : plusIcon;

  return (
    <MuiAccordion expanded={isOpen === uniqueId} onChange={handleChange(uniqueId)} sx={accordionSx}>
      <AccordionSummary>
        <div style={styleAccordionSummary}>
          {label || ''}
          {labelDefault || ''}
        </div>
        <img loading='lazy' src={expandIcon} />
      </AccordionSummary>
      <AccordionDetails>
        {children}
        {summaryString && <Typography sx={summaryStyle}>{summaryString}</Typography>}
      </AccordionDetails>
    </MuiAccordion>
  );
};

export default Accordion;
