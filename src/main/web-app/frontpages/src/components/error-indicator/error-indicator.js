import React from 'react';
import './error-indicator.css';
import error_icon from './error-icon.png';

const ErrorIndicator = () => {

    return(
        <div className='error-indicator mt-5'>
            <img src={error_icon} alt='books'/><br/>
            <span>OH NOOOO</span><br/>
            <span>Something has gone terribly wrong</span><br/>
            <span>(but we are already solving the problem)</span>
        </div>
    );

};

export default ErrorIndicator;

