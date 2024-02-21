import { RefObject, DependencyList } from 'react';
import { AxiosRequestConfig } from 'axios';

type RequestConfig = {
    url: string;
    method?: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
};

declare const useFetch: () => {
    isLoading: boolean;
    error: string | null;
    sendRequest: (requestConfig: RequestConfig, applyData: (data: any) => void) => Promise<void>;
};

type ClickOutsideCallback = () => void;
declare const useClickOutside: (callbackFun: ClickOutsideCallback) => RefObject<HTMLElement | null>;

type EffectFunction = () => void;
declare const useEffectExceptFirstRender: (func: EffectFunction, deps: DependencyList) => void;

type UseAxiosProps = {
    url: string;
    method?: string;
    headers?: AxiosRequestConfig["headers"];
    body?: any;
    searchParams?: string | null;
};

declare const useAxios: ({ url, method, headers, body, searchParams, }: UseAxiosProps) => {
    runAxios: () => Promise<void>;
    data: any;
    loading: boolean;
    error: boolean;
};

export { useAxios, useClickOutside, useEffectExceptFirstRender, useFetch };
