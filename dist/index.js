"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
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

// src/index.ts
var src_exports = {};
__export(src_exports, {
  useClickOutside: () => useClickOutside_default,
  useFetch: () => useFetch_default
});
module.exports = __toCommonJS(src_exports);

// src/hooks/useFetch.tsx
var import_react = require("react");
var useFetch = () => {
  const [isLoading, setIsLoading] = (0, import_react.useState)(false);
  const [error, setError] = (0, import_react.useState)(null);
  const sendRequest = (0, import_react.useCallback)(
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
var import_react2 = require("react");
var useClickOutside = (callbackFun) => {
  const elementRef = (0, import_react2.useRef)(null);
  const callBackFunRef = (0, import_react2.useRef)(null);
  callBackFunRef.current = callbackFun;
  (0, import_react2.useEffect)(() => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useClickOutside,
  useFetch
});
