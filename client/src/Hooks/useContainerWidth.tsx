import { useState } from 'react';
import useDebounce from './useDebounce';

const useContainerWidth = (debounce = 100) => {
  const [size, setSize] = useState(0);

  const ref = (element: HTMLElement) => {
    if (element) setSize(element.getBoundingClientRect().width);
  };
  const debounceResize = useDebounce(size, debounce);

  return { width: debounceResize, ref };
};

export default useContainerWidth;
