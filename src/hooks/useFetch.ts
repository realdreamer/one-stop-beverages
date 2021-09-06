import { useState, useEffect } from 'react';
import axios from 'axios';

interface State<T> {
  data?: T;
  error?: any | null;
  loading?: Boolean;
  refetch: (url: string, options?: RequestInit) => void;
}

export default function useFetch<T = unknown>(
  url: string,
  options?: RequestInit,
): State<T> {
  const [data, setData] = useState();
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [callRefetch, setCallRefetch] = useState(false);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const fetchData = async (fetchUrl: string) => {
    try {
      const { data: responseData } = await axios.get(fetchUrl, {
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
    fetchData(url);
    return () => {
      source.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function refetch(refetchUrl: string) {
    if (!callRefetch) return;
    setLoading(true);
    fetchData(refetchUrl);
  }

  return {
    data,
    error,
    loading,
    refetch,
  };
}
