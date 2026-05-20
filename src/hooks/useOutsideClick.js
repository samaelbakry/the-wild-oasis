import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapture = true) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) handler();
    };

    document.addEventListener("click", handleClickOutside, listenCapture);

    return () => {
      document.removeEventListener("click", handleClickOutside, listenCapture);
    };
  }, [handler, listenCapture]);

  return ref;
}
