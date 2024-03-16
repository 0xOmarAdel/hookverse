import { renderHook, act } from "@testing-library/react";
import useScrollBlock from "../hooks/useScrollBlock";

describe("useScrollBlock", () => {
  it("should block and allow scroll", () => {
    const { result } = renderHook(() => useScrollBlock());

    const [blockScroll, allowScroll] = result.current;

    act(() => {
      blockScroll();
    });

    expect(document.documentElement.style.overflow).toBe("hidden");
    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      allowScroll();
    });

    expect(document.documentElement.style.overflow).toBe("");
    expect(document.body.style.overflow).toBe("");
  });
});
