var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/hooks/useFetch.tsx
import { useCallback, useState } from "react";
var useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(
    (requestConfig, applyData) => __async(void 0, null, function* () {
      setIsLoading(true);
      setError(null);
      try {
        const response = yield fetch(requestConfig.url, {
          method: requestConfig.method || "GET",
          headers: requestConfig.headers || {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null
        });
        if (!response.ok) {
          throw new Error("Request failed!");
        }
        const data = yield response.json();
        applyData(data);
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    }),
    []
  );
  return {
    isLoading,
    error,
    sendRequest
  };
};
var useFetch_default = useFetch;

// src/hooks/useClickOutside.tsx
import { useEffect, useRef } from "react";
var useClickOutside = (callbackFun) => {
  const elementRef = useRef(null);
  const callBackFunRef = useRef(null);
  callBackFunRef.current = callbackFun;
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (elementRef.current && !elementRef.current.contains(e.target) && callBackFunRef.current) {
        callBackFunRef.current();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);
  return elementRef;
};
var useClickOutside_default = useClickOutside;

// src/hooks/useEffectExceptFirstRender.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";
var useEffectExceptFirstRender = (func, deps) => {
  const didMount = useRef2(false);
  useEffect2(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, [...deps]);
};
var useEffectExceptFirstRender_default = useEffectExceptFirstRender;

// src/hooks/useAxios.tsx
import { useState as useState2, useCallback as useCallback2, useMemo } from "react";
import axios from "axios";
import queryString from "query-string";
var useAxios = ({
  url,
  method = "GET",
  headers,
  body,
  searchParams
}) => {
  const [data, setData] = useState2(null);
  const [loading, setLoading] = useState2(false);
  const [error, setError] = useState2(false);
  const memoizedSearchParams = useMemo(() => {
    return queryString.parse(searchParams || "");
  }, [searchParams]);
  const runAxios = useCallback2(() => __async(void 0, null, function* () {
    try {
      setLoading(true);
      const response = yield axios({
        method,
        url,
        data: body,
        params: memoizedSearchParams,
        headers
      });
      setData(response.data);
    } catch (error2) {
      setError(!!error2);
    } finally {
      setLoading(false);
    }
  }), [method, url, headers, body, memoizedSearchParams]);
  return { runAxios, data, loading, error };
};
var useAxios_default = useAxios;
export {
  useAxios_default as useAxios,
  useClickOutside_default as useClickOutside,
  useEffectExceptFirstRender_default as useEffectExceptFirstRender,
  useFetch_default as useFetch
};
