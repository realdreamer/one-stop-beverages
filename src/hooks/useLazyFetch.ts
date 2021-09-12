import { useState, useEffect } from 'react';
import axios from 'axios';

interface State<T> {
  data?: T;
  error?: any | null;
  loading?: Boolean;
  refetch: (url: string, options?: RequestInit) => void;
  fetch: () => Promise<void>;
}

export default function useLazyFetch<T = unknown>(
  url: string,
  options?: RequestInit,
): State<T> {
  const [data, setData] = useState();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [callRefetch, setCallRefetch] = useState(false);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchData = async () => {
    console.log('wtf');
    try {
      const { data: responseData } = await axios.get(url, {
        cancelToken: source.token,
      });
      setData(responseData);
      setLoading(false);
    } catch (exception) {
      setError(exception);
      setLoading(false);
    }
    !callRefetch && setCallRefetch(true);
  };

  useEffect(() => {
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refetch() {
    if (!callRefetch) return;
    setLoading(true);
    fetchData();
  }

  return {
    fetch: fetchData,
    data,
    error,
    loading,
    refetch,
  };
}
