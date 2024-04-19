import { useEffect } from "react";

const useKey = (key, cb) => {
  useEffect(() => {
    const listener = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        cb();
      }
    };

    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [key, cb]);
  return;
};

export default useKey;
