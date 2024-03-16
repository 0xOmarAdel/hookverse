import { render } from "@testing-library/react";
import React from "react";
import useEffectExceptFirstRender from "../hooks/useEffectExceptFirstRender";

describe("useEffectExceptFirstRender", () => {
  test("should call effect function after the first render", () => {
    let count = 0;
    const effectFunction = () => {
      count++;
    };
    const { rerender } = render(<TestComponent effect={effectFunction} />);
    rerender(<TestComponent effect={effectFunction} />);
    expect(count).toBe(0);
  });
});

const TestComponent = ({ effect }) => {
  useEffectExceptFirstRender(effect, []);
  return <div>Test Component</div>;
};
