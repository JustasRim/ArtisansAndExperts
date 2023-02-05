import { useEffect, useState } from 'react';

function getWindowDimensions() {
  const { innerWidth: width } = window;
  return width;
}
type Props = {
  breakpoint: number;
  callback: () => void;
};

export default function useWindowWidth(breakpoint: Props['breakpoint'], callback: Props['callback']) {
  const [width, setWidth] = useState<number>(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      const w = getWindowDimensions();
      setWidth(w);

      if (w > breakpoint) {
        callback();
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
