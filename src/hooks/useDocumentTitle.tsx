import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(() => {
    if (!title) return;
    const oldTitle = document.title;

    document.title = title;

    return () => {
      document.title = oldTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
