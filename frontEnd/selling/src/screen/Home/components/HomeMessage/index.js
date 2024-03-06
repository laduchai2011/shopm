import React, { memo, useState, useEffect } from 'react';
import './styles.css';

import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";

import { $ } from 'utilize/Tricks';

const HomeMessage = () => {
    const [selectMessage, setSelectMessage] = useState(true);
    const [show, setShow] = useState(true);

    useEffect(() => {
        const q_body = $('.HomeMessage-body');
        if (show) {
            q_body.classList.add('show');
        } else {
            q_body.classList.remove('show');
        }
    }, [show])

    const list_user = [1,2,3,4,5,6,7,8,9].map((index, data) => {
        return (
            <div className='HomeMessage-userContainer' key={ index }>
                <img src='https://tse3.mm.bing.net/th?id=OIP.XCjrfn_FZqjIVVQBwiZQvgHaEo&pid=Api&P=0&h=220' alt='' />
                <div className='HomeMessage-userContainer-onlineDot'></div>
                <span className='HomeMessage-userContainer-name'>name name name name</span>
                <span className='HomeMessage-userContainer-amountNotRead'>{index}</span>
            </div>
        )
    })

    return (
        <div className='HomeMessage'>
            <div className='HomeMessage-top'>
                <input type='radio' checked={selectMessage} onChange={() => setSelectMessage(true)} />
                <input type='radio' checked={!selectMessage} onChange={() => setSelectMessage(false)} />
                <span>Normal or Now</span>
                <span className='HomeMessage-top-icons'>
                    { show && <SlArrowDown onClick={() => setShow(!show)} /> }
                    { !show && <SlArrowUp onClick={() => setShow(!show)} /> }
                </span>
            </div>
            <div className='HomeMessage-body'>
                { list_user }
            </div>
        </div>
    )
}

export default memo(HomeMessage);