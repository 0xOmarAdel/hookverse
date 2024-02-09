import { useEffect, useRef } from "react";

const useClickOutside = (callbackFun) => {
  const elementRef = (useRef < HTMLElement) | (null > null);
  const callBackFunRef = useRef(null);
  callBackFunRef.current = callbackFun;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target) &&
        callBackFunRef.current
      ) {
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

export default useClickOutside;
