import React from 'react';

const Settings = ({ breakLength, sessionLength, onLengthChange }) => (
    <div className="settings">
        <div className="break">
            <div id="break-label">Break</div>
            <div className="controller">
                <i id="break-decrement" className="fa fa-arrow-down fa-2x arrow" onClick={onLengthChange} />
                <span id="break-length">{breakLength}</span>
                <i id="break-increment" className="fa fa-arrow-up fa-2x arrow" onClick={onLengthChange} />
            </div>
        </div>
        <div className="session">
            <div id="session-label">Pomodoro</div>
            <div className="controller">
                <i id="session-decrement" className="fa fa-arrow-down fa-2x arrow" onClick={onLengthChange} />
                <span id="session-length">{sessionLength}</span>
                <i id="session-increment" className="fa fa-arrow-up fa-2x arrow" onClick={onLengthChange} />
            </div>
        </div>
    </div>
);

export {
    Settings
}