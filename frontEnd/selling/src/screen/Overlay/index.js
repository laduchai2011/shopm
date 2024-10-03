import React from 'react';
import './styles.css';

const Overlay = ({ children, show }) => {

    const handleShow = (show) => {
        if (show) {
            return 'show';
        } else {
            return '';
        }
    }

    return (
        <div className={`Overlay ${handleShow(show)}`}>
            { children }
        </div>
    )
}

export default Overlay;