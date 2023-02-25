import { useEffect, useState } from 'react';

export function useDebaunce<T>(value: T, delay: number) {
  const [debauncedValue, setDebauncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebauncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debauncedValue;
}
