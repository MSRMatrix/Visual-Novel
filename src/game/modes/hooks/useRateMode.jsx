import { useEffect, useRef } from "react";



// Beim Schreiben hängt es immernoch wenn man Pfeiltaste oben und unten benutzt
export function useRateMode({
  active,
  setDisplayExample,
  writeSpeed,
  setActive,
}) {
  const indexRef = useRef(0);
  const exampleText = "Das ist hier ein Beispieltext";

  useEffect(() => {
    if (!active) return;

    setDisplayExample("");
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < exampleText.length) {
        setDisplayExample((prev) =>
          prev + exampleText.charAt(indexRef.current)
        );
        indexRef.current++;
      } else {
        clearInterval(interval);
        setActive(false);
      }
    }, writeSpeed);

    return () => clearInterval(interval);
  }, [active, writeSpeed]); // 👈 writeSpeed wieder rein!
}