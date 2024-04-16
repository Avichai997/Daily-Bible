import { useLayoutEffect, useState } from 'react';
import { ISize } from '@CommonInterfaces';
import useDebounce from './useDebounce';

// A really common need is to get the current size of the browser window.
// This hook returns an object containing the window's width and height.
// If executed server-side (no window object) the value of width and height will be undefined.
// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
// And here: https://usehooks.com/useWindowSize

// Define general type for useWindowSize hook, which includes width and height

const useWindowSize = (debounce = 100) => {
  // Initialize state with undefined width/height.
  const [windowSize, setWindowSize] = useState<ISize>({
    width: undefined,
    height: undefined,
  });

  // Debounce windowSize for performance
  const debounceSize = useDebounce(windowSize, debounce);

  useLayoutEffect(() => {
    // Handler to call on window resize
    function updateSize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener, on window resize trigger updateSize()
    window.addEventListener('resize', updateSize);
    // Call handler right away so state gets updated with initial window size
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []); // Empty array ensures that effect is only run on mount

  return debounceSize;
};

export default useWindowSize;
