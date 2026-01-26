import "./intro.css"

import { useContext, useEffect, useRef, useState } from "react";

import { LoadingOverlay } from "../../context/AppProviders";

const Intro = ({intro, setIntro, exampleText}) => {
      const buttonRef = useRef(null);
const { loadingOverlay, setLoadingOverlay } = useContext(LoadingOverlay);

        const [index, setIndex] = useState(0);
        const [isFinished, setIsFinished] = useState(false);
        const [displayed, setDisplayed] = useState("");
      
        useEffect(() => {
          if (!intro || loadingOverlay.loader) return;
      
          const fullText = exampleText[index];
          let charIndex = 0;
      
          setDisplayed("");
      
          const interval = setInterval(() => {
            charIndex++;
            setDisplayed(fullText.substring(0, charIndex));
      
            if (charIndex >= fullText.length) {
              clearInterval(interval);
            }
          }, 50); // Schreibgeschwindigkeit
      
          return () => clearInterval(interval);
        }, [index, intro, loadingOverlay.loader]);

         useEffect(() => {
    if (!intro || loadingOverlay.loader) return;

    const fullText = exampleText[index];
    let charIndex = 0;

    setDisplayed("");

    const interval = setInterval(() => {
      charIndex++;
      setDisplayed(fullText.substring(0, charIndex));

      if (charIndex >= fullText.length) {
        clearInterval(interval);
      }
    }, 50); // Schreibgeschwindigkeit

    return () => clearInterval(interval);
  }, [index, intro, loadingOverlay.loader]);

  useEffect(() => {
    if (!intro || loadingOverlay.loader) return;

    if (index === exampleText.length - 1) {
      setIsFinished(true);
      return;
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [index, intro, loadingOverlay.loader]);



 useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  const handleBlur = () => {
    if (intro) {
      setTimeout(() => {
        buttonRef.current?.focus();
      }, 0);
    }
  };


    return(
        <div className="intro">
         {intro && <p>{displayed}</p>}
        {intro && isFinished && (
          <button
            ref={buttonRef}
            onClick={() => setIntro(false)}
             onBlur={handleBlur}
          >
            Weiter
          </button>
        )}
        </div>
    )
}

export default Intro;