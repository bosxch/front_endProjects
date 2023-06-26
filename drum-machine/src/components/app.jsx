import React, { useState, useEffect } from "react";
import { Keyboard } from "./pad";
import { soundsName, soundsGroup } from '../data/audioSamples'

const App = () => {

    const [power, setPower] = React.useState(true);
    const [volume, setVolume] = React.useState(1);
    const [soundName, setSoundName] = React.useState("");
    const [soundType, setSoundType] = React.useState("heaterKit");
    const [sounds, setSounds] = React.useState(soundsGroup[soundType]);

    const DumControle = ({ stop, name, power, volume, handleVolumeChange, changeSoundGroup }) => (
        <div className="controle">
          <button class="button-power" onClick={stop}>Power {power ? 'On' : 'Off'}</button>
          <h2>Volume: %{Math.round(volume * 100)}</h2>
          <input
            max="1"
            min="0"
            step='0.01'
            type="range"
            value={volume}
            onChange={handleVolumeChange}
          />
          <h2 id="display" >{name}</h2>
          <button class="button-power" onClick={changeSoundGroup}>Change sounds group</button>
        </div>
      );
    
    const styleActiveKey = (key) => {
      key.parentElement.style.backgroundColor = "#000000"
      key.parentElement.style.color = "#ffffff"
    }
    
   const deactivateAudio = (audio) => {
     setTimeout(() => {
       audio.parentElement.style.backgroundColor = "#ffffff"
       audio.parentElement.style.color = "#000000"
     }, 300)
   }
  
    const play = (key, sound) => {
        if (power) {
            setSoundName(sound)
            const audio = document.getElementById(key);
            styleActiveKey(audio);
            audio.currentTime = 0;
            audio.play();
            deactivateAudio(audio)
        } else {
            return
        }
    }
  
    const stop = () => {
       setPower(!power)
    }
    
    const changeSoundGroup = () => {
      setSoundName("")
      if(soundType === "heaterKit"){
          setSoundType("smoothPianoKit");
          setSounds(soundsGroup.smoothPianoKit);
      } else {
          setSoundType("heaterKit");
          setSounds(soundsGroup.heaterKit);
      }
    }
    
    const handleVolumeChange = e => {
      setVolume(e.target.value)
    }
    
    const setKeyVolume = () => {
      const audioes = sounds.map(sound => document.getElementById(sound.key));
      audioes.forEach(audio => {
        if(audio) {
          audio.volume = volume;
        }
      }) 
    }
    
    return (
      <div id="drum-machine">
        {setKeyVolume()}
        <div className="wrapper">
          <Keyboard sounds={sounds} play={play} power={power} deactivateAudio={deactivateAudio} />
          <DumControle 
            stop={stop}
            power={power}
            volume={volume} 
            name={soundName || soundsName[soundType]} 
            changeSoundGroup={changeSoundGroup}
            handleVolumeChange={handleVolumeChange} 
           />
        </div>
      </div>
    )
  };

  export { App };