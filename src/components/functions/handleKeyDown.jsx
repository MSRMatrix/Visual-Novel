export function handleKeyDown(e, focusableRef, focusedIndex, setFocusedIndex) {
      if (!focusableRef.current.length) return;

      const activeEl = document.activeElement;
      if (
        activeEl &&
        activeEl.tagName === "INPUT" &&
        activeEl.type === "range"
      ) {
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
        }
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        let nextIndex = (focusedIndex + 1) % focusableRef.current.length;
        while (focusableRef.current[nextIndex]?.disabled) {
          nextIndex = (nextIndex + 1) % focusableRef.current.length;
        }
        setFocusedIndex(nextIndex);
        focusableRef.current[nextIndex]?.focus();
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        let previousIndex = (focusedIndex - 1 + focusableRef.current.length) % focusableRef.current.length;
        while (focusableRef.current[previousIndex]?.disabled) {
           previousIndex =
            (previousIndex - 1 + focusableRef.current.length) %
            focusableRef.current.length;
        }
        setFocusedIndex(previousIndex);
        focusableRef.current[previousIndex]?.focus();
      }
    }