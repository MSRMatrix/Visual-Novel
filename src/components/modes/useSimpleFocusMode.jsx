import { useEffect } from "react";

export function useSimpleFocusMode({
  ifDeps,
  effectDeps,
  arrayItem,
  focusedIndex,
  setFocusedIndex,
  arrayFocus
}) {

  useEffect(() => {
    if (ifDeps) return; 
    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prev) => (prev + 1) % arrayItem.length);
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prev) =>
          prev === 0 ? arrayItem.length - 1 : prev - 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);

  }, effectDeps); 
  
  useEffect(() => {
    arrayFocus.current[focusedIndex]?.focus();
  }, [focusedIndex]);


//   useEffect(() => {
//     arrayFocus.current = [];
//     setFocusedIndex(0);
//   }, effectDeps); 
}
