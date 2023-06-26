import React, { useEffect } from "react";

const KeyboardKey = ({ play, deactivateAudio, sound: { id, key, url, keyCode } }) => {

    const handleKeydown = (e) => {
        if(keyCode === e.keyCode) {
          const audio = document.getElementById(key);
          play(key, id);
          deactivateAudio(audio)
        }
      }

    useEffect(() => {
          document.addEventListener('keydown', handleKeydown);
          return () => {
            document.removeEventListener("keydown", handleKeydown);
          };
        }, [handleKeydown]);

        

  return (
    <button value="test" id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
      <audio className="clip" src={url} id={key} />
      {key}
    </button>
  );
};

const Keyboard = ({ sounds, play, power, deactivateAudio }) => (
  <div className="keyboard">
    {power
      ? sounds.map((sound) => <KeyboardKey key={sound.id} sound={sound} play={play} deactivateAudio={deactivateAudio} />)
      : sounds.map((sound) => <KeyboardKey key={sound.id} sound={{ ...sound, url: "#" }} play={play} deactivateAudio={deactivateAudio} />)
    }
  </div>
);


export { KeyboardKey, Keyboard };
