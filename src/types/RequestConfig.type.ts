type RequestConfig = {
  url: string;
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, any>;
};

export default RequestConfig;
