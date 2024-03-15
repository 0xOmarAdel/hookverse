import { useEffect, useRef } from "react";

type ClickOutsideCallback = () => void;
type SafeRefObject<T> = { readonly current: T };

const useClickOutside = <T extends HTMLElement>(
  callbackFun: ClickOutsideCallback
): SafeRefObject<T> => {
  const elementRef = useRef<T>(HTMLElement as unknown as T);
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
