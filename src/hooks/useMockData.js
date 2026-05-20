import { useState, useEffect } from 'react';

export const useMockData = (initialData, delay = 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setData(initialData);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [initialData, delay]);

  return { data, loading, setData };
};
