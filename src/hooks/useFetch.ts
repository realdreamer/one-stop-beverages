import { useState, useEffect } from 'react';
import axios from 'axios';

interface State<T> {
  data?: T;
  error?: any | null;
  loading?: Boolean;
}

export default function useFetch<T = unknown>(
  url: string,
  options?: RequestInit,
): State<T> {
  const [data, setData] = useState();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // abort controller
  const abortContoller = new AbortController();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: responseData } = await axios.get(url);
        setData(responseData);
        setLoading(false);
      } catch (exception) {
        setError(exception);
        setLoading(false);
      }
    };
    fetchData();

    return () => {
      abortContoller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    data,
    error,
    loading,
  };
}
