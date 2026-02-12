import { useEffect } from "react";

export function useLoad({isReady, loadingOverlay, setLoadingOverlay, title}){
    useEffect(() => {
    if (isReady && !loadingOverlay.ready) {
      setLoadingOverlay((prev) => ({ ...prev, ready: true }));
    }
  }, [isReady && !loadingOverlay.ready]);

  useEffect(() => {
    setLoadingOverlay((prev) => ({ ...prev, title: title }));
  }, [title]);

}
  
  