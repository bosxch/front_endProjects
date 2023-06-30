import React, { useState, useEffect } from 'react';
import { Settings } from './Settings';
import { Timer } from './Timer';
import BeepShort from '../sounds/Beep-short.mp3';

export const App = () => {
  const [type, setType] = useState('Session');
  const [status, setStatus] = useState('stop');
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [time, setTime] = useState(1500);
  const [intervalId, setIntervalId] = useState(0);
  const [timerColor, setTimerColor] = useState({ color: 'black' });

  useEffect(() => {
    if (time === 0) {
      document.getElementById('beep').play();
    }

    if (time < 61) {
      setTimerColor({ color: '#fff' });
    } else {
      setTimerColor({ color: 'black' });
    }

    if (time < 0) {
      clearInterval(intervalId);

      if (type === 'Session') {
        beginCountDown();
        setTime(breakLength * 60);
        setType('Break');
      } else {
        beginCountDown();
        setTime(sessionLength * 60);
        setType('Session');
      }
    }
  }, [time, intervalId, type, breakLength, sessionLength]);

  const calculateTime = () => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return minutes + ':' + seconds;
  };

  const beginCountDown = () => {
    const newIntervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    setIntervalId(newIntervalId);
  };

  const lengthChangeHandler = (e) => {
    const [type, sign] = e.target.id.split('-');
    const currentLength = type === 'break' ? breakLength : sessionLength;
    const newLength = sign === 'decrement' ? currentLength - 1 : currentLength + 1;

    if (status === 'run') {
      return;
    }

    if (newLength > 0 && newLength < 61) {
      if (type === 'break') {
        setBreakLength(newLength);
      } else {
        setSessionLength(newLength);
        setTime(newLength * 60);
      }
    }
  };

  const startStopHandler = () => {
    if (status === 'run') {
      clearInterval(intervalId);
      setStatus('stop');
      return 'stop'
    } else {
      beginCountDown();
      setStatus('run');
      return 'start'
    }
  };

  const resetHandler = () => {
    clearInterval(intervalId);

    setType('Session');
    setStatus('stop');
    setBreakLength(5);
    setSessionLength(25);
    setTime(1500);
    setIntervalId('');
    setTimerColor({ color: 'black' });

    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };


  return (
    <div id="clock">
      <Settings
        breakLength={breakLength}
        sessionLength={sessionLength}
        onLengthChange={lengthChangeHandler}
      />
      <Timer
        type={type}
        timerColor={timerColor}
        calculateTime={calculateTime}
        onReset={resetHandler}
        onStartStop={startStopHandler}
        status={status}
      />
      <audio id="beep" src={BeepShort} />
    </div>
  );
};