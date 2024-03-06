import React, { memo } from 'react';
import './styles.css';

import { IoIosNotifications } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { FaMessage } from "react-icons/fa6";

const HomeFooter = () => {

    return (
        <div className='HomeFooter'>
            <div>
                <div>
                    <IoIosNotifications color='white' size={ 40 } />
                    <div>4</div>
                </div>
                <span>Handle, right's now !</span>
            </div>
            <div>
                <div>
                    <AiFillMessage color='white' size={ 30 } />
                    <div>4</div>
                </div>
                <span>You have new messages</span>
            </div>
            <div>
                <div>
                    <IoAddCircle color='white' size={ 35 } />
                    <div>4</div>
                </div>
                <span>Add new department</span>
            </div>
            <div>
                <div>
                    <FaMessage color='white' size={ 25 } />
                    <div>4</div>
                </div>
                <span>Contact with us</span>
            </div>
        </div>
    )
}

export default memo(HomeFooter);