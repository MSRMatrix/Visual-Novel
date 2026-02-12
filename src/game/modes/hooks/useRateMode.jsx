import { useEffect } from "react";

export function useRateMode({
  active,
  setDisplayExample,
  writeSpeed,
  example,
  setActive,
}) {
  useEffect(() => {
    if (!active) return;

    setDisplayExample("");

    const intervalDelay = writeSpeed;
    let i = -1;

    const interval = setInterval(() => {
      if (i < example.text.length) {
        setDisplayExample((prev) => prev + example.text.charAt(i));
        i++;
      } else {
        clearInterval(interval);
        setActive(false);
      }
    }, intervalDelay);

    return () => clearInterval(interval);
  }, [active, writeSpeed]);
}
