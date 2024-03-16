import React from "react";
import { render } from "@testing-library/react";

import useDocumentTitle from "../hooks/useDocumentTitle";

describe("useDocumentTitle", () => {
  test("should set document title", () => {
    render(<TestComponent />);

    expect(document.title).toBe("New Title");
  });
});

const TestComponent = () => {
  useDocumentTitle("New Title");
  return <div>Test Component</div>;
};
