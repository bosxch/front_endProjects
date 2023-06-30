import React from 'react';

const Timer = ({ type, timerColor, calculateTime, onReset, onStartStop, status }) => 
(
    <div className="timer">
        <div id="timer-label" style={timerColor}>{type}</div>
        <div id="time-left" style={timerColor}>{calculateTime()}</div>
        <div className='options_wrap'>
            <button id="start_stop" className='start' onClick={onStartStop}>
                {status === 'stop' ? 'start' : 'stop'}
            </button>
            <button id="reset" onClick={onReset}>
                <i className="fa fa-refresh fa-2x" />
            </button>
        </div>
    </div>
);

export {
    Timer
}