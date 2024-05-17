import { useEffect, useState } from "react";
import { axiosHandler } from "../App";

const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axiosHandler.get<T>(url);
      setData(data);
    };
    fetchData();
  }, [url]);
  return data;
};
export default useFetch;
