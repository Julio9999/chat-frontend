import { useState, useEffect } from "react";

type Props<T> = {
    fetcher: () => Promise<T>;
    onSuccess?: (data: T) => void;
    onError?: (error: unknown) => void;
    key?: string;
}


const useFetch = <T>({fetcher, onSuccess, onError, key}: Props<T>) => {

    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetcher();
          setData(response);
          onSuccess?.(response);
        } catch (err: unknown) {
          setError(err);
          onError?.(err);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
    }, [key]);
  
    return { data, isLoading, error };
}

export default useFetch;