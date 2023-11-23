import React from 'react';
import './ErrorPopup.css';

const ErrorPopup = ({ message, handleClose }) => {
return (
    <div className="error-popup">
    <div className="popup-content">
        <p>{message}</p>
        <button onClick={handleClose}>Close</button>
    </div>
    </div>
);
};

export default ErrorPopup;