import React from 'react';
import './styles.css';

const HomeTop = () => {

    const clickInput = (e) => {
        e.target.classList.add('inputactive');
        document.querySelector('.HomeTop').addEventListener('click', (ev) => {
            if (ev.target === ev.currentTarget) {
                e.target.classList.remove('inputactive');
            }
        })
    }

    const selectObject = (e) => {
        const objects = document.querySelector('.HomeTop-object').children;
        for (let i = 0; i < objects.length; i++) {
            objects[i].classList.remove('HomeTop-object-active');
        }
        e.target.classList.add('HomeTop-object-active');
    }

    return (
        <div className="HomeTop">
            <input placeholder="Search" onClick={(e) => clickInput(e)} />
            <div className='HomeTop-object'>
                <div className='HomeTop-object-active' onClick={(e) => selectObject(e)}>Community</div>
                <div onClick={(e) => selectObject(e)}>Follow</div>
                <div onClick={(e) => selectObject(e)}>Livestream</div>
                <div onClick={(e) => selectObject(e)}>News</div>
            </div>
        </div>
    )
}

export default HomeTop;