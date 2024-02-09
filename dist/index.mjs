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
export {
  useClickOutside_default as useClickOutside,
  useFetch_default as useFetch
};
