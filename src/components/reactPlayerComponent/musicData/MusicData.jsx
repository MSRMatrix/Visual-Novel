import { useContext, useEffect } from "react";
import { SoundContext } from "../../../context/SoundContext";

const MusicData = ({ focusableRef, startIndex }) => {
  const { sounds, setSounds } = useContext(SoundContext);

  const test_music1 = import.meta.env.VITE_TEST_MUSIC1;
  const test_music2 = import.meta.env.VITE_TEST_MUSIC2;
  const test_music3 = import.meta.env.VITE_TEST_MUSIC3;
  const test_music4 = import.meta.env.VITE_TEST_MUSIC4;

  const musicData = [
    { name: "Musik 1", music: test_music1 },
    { name: "Musik 2", music: test_music2 },
    { name: "Musik 3", music: test_music3 },
    { name: "Musik 4", music: test_music4 },
  ];

  function musicTest(music) {
    setSounds((prev) => ({ ...prev, url: music, playing: true }));
  }

  // Fokus beim ersten Rendern auf den ersten Button
  useEffect(() => {
    if (focusableRef.current[startIndex]) {
      focusableRef.current[startIndex].focus();
    }
  }, [focusableRef, startIndex]);

  return (
    <>
      {musicData.map((item, i) => (
        <button
          key={item.name}
          ref={(el) => (focusableRef.current[startIndex + i] = el)}
          disabled={sounds.url === item.music}
          value={item.music}
          onClick={(e) => musicTest(e.target.value)}
        >
          {item.name}
        </button>
      ))}
    </>
  );
};

export default MusicData;
