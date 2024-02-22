"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
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
  useAxios: () => useAxios_default,
  useClickOutside: () => useClickOutside_default,
  useEffectExceptFirstRender: () => useEffectExceptFirstRender_default,
  useFetch: () => useFetch_default,
  useScrollBlock: () => useScrollBlock_default
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

// src/hooks/useEffectExceptFirstRender.tsx
var import_react3 = require("react");
var useEffectExceptFirstRender = (func, deps) => {
  const didMount = (0, import_react3.useRef)(false);
  (0, import_react3.useEffect)(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, [...deps]);
};
var useEffectExceptFirstRender_default = useEffectExceptFirstRender;

// src/hooks/useAxios.tsx
var import_react4 = require("react");
var import_axios = __toESM(require("axios"));
var import_query_string = __toESM(require("query-string"));
var useAxios = ({
  url,
  method = "GET",
  headers,
  body,
  searchParams
}) => {
  const [data, setData] = (0, import_react4.useState)(null);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  const [error, setError] = (0, import_react4.useState)(false);
  const memoizedSearchParams = (0, import_react4.useMemo)(() => {
    return import_query_string.default.parse(searchParams || "");
  }, [searchParams]);
  const runAxios = (0, import_react4.useCallback)(() => __async(void 0, null, function* () {
    try {
      setLoading(true);
      const response = yield (0, import_axios.default)({
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

// src/hooks/useScrollBlock.tsx
var import_react5 = require("react");
var useScrollBlock = () => {
  const scrollBlocked = (0, import_react5.useRef)(false);
  const blockScroll = () => {
    if (typeof document === "undefined")
      return;
    const html = document.documentElement;
    const { body } = document;
    if (!(body == null ? void 0 : body.style) || scrollBlocked.current)
      return;
    const scrollBarWidth = window.innerWidth - html.clientWidth;
    const bodyPaddingRight = parseInt(
      window.getComputedStyle(body).getPropertyValue("padding-right")
    ) || 0;
    html.style.position = "relative";
    html.style.overflow = "hidden";
    body.style.position = "relative";
    body.style.overflow = "hidden";
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`;
    scrollBlocked.current = true;
  };
  const allowScroll = () => {
    if (typeof document === "undefined")
      return;
    const html = document.documentElement;
    const { body } = document;
    if (!(body == null ? void 0 : body.style) || !scrollBlocked.current)
      return;
    html.style.position = "";
    html.style.overflow = "";
    body.style.position = "";
    body.style.overflow = "";
    body.style.paddingRight = "";
    scrollBlocked.current = false;
  };
  return [blockScroll, allowScroll];
};
var useScrollBlock_default = useScrollBlock;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useAxios,
  useClickOutside,
  useEffectExceptFirstRender,
  useFetch,
  useScrollBlock
});
