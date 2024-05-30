import { useEffect, useState } from "react";
import { axiosHandler } from "../App";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { data } = await axiosHandler.get<T>(url);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    const timeout = setTimeout(fetchData, 1000);
    // fetchData();
    return () => {
      clearTimeout(timeout);
    };
  }, [url]);
  return { data, loading, error };
};
export default useFetch;
