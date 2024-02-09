import { useEffect, useRef, RefObject } from "react";

type ClickOutsideCallback = () => void;

const useClickOutside = (
  callbackFun: ClickOutsideCallback
): RefObject<HTMLElement | null> => {
  const elementRef = useRef<HTMLElement | null>(null);
  const callBackFunRef = useRef<ClickOutsideCallback | null>(null);
  callBackFunRef.current = callbackFun;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (
        elementRef.current &&
        !elementRef.current.contains(e.target as Node) &&
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
