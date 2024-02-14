import { useEffect, useRef, DependencyList } from "react";

type EffectFunction = () => void;

const useEffectExceptFirstRender = (
  func: EffectFunction,
  deps: DependencyList
) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, [...deps]);
};

export default useEffectExceptFirstRender;
