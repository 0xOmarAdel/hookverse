import React from "react";
import { render, fireEvent } from "@testing-library/react";
import useClickOutside from "../hooks/useClickOutside";

describe("useClickOutside", () => {
  test("should call callback function when clicked outside", () => {
    let isCallbackCalled = false;
    const callbackFunction = () => {
      isCallbackCalled = true;
    };
    render(<TestComponent callback={callbackFunction} />);
    fireEvent.click(document.body);
    expect(isCallbackCalled).toBe(true);
  });
});

const TestComponent = ({ callback }) => {
  const elementRef = useClickOutside(callback);
  return <div ref={elementRef}>Test Component</div>;
};
