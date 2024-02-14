import { RefObject, DependencyList } from 'react';

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

export { useClickOutside, useEffectExceptFirstRender, useFetch };
