import { AxiosRequestConfig } from "axios";

type UseAxiosProps = {
  url: string;
  method?: string;
  headers?: AxiosRequestConfig["headers"];
  body?: any;
  searchParams?: string | null;
};

export default UseAxiosProps;
