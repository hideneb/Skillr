import { useEffect, useRef } from "react";

const useInterval = (cb: () => void, delayMs: number) => {
  const savedCb = useRef<() => void>(cb);

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const tick = () => {
      savedCb.current();
    };
    if (delayMs !== null) {
      const id = setInterval(tick, delayMs);
      return () => clearInterval(id);
    }
  }, [delayMs]);
};

export default useInterval;
