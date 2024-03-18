import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import queryString from "query-string";
import UseAxiosProps from "../types/UseAxiosProps.types";

const useAxios = ({
  url,
  method = "GET",
  headers,
  body,
  searchParams,
}: UseAxiosProps) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState(false);

  const memoizedSearchParams = useMemo(() => {
    return queryString.parse(searchParams || "");
  }, [searchParams]);

  const runAxios = useCallback(async () => {
    try {
      setLoading(true);
      setIsExecuting(true);

      const response = await axios({
        method,
        url,
        data: body,
        params: memoizedSearchParams,
        headers,
      });

      setData(response.data);
    } catch (error) {
      setError(!!error);
    } finally {
      setLoading(false);
      setIsExecuting(false);
    }
  }, [method, url, headers, body, memoizedSearchParams]);

  return { runAxios, data, loading, isExecuting, error };
};

export default useAxios;
