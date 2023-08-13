import React from "react";
import './styles.css';

import { MdError } from 'react-icons/md';

const SignupMessage = ({message}) => {
    

    return (
        <div className="SignupMessage">
            <MdError size={25} color="red" />
            <span><strong>{ message.attribute }</strong>{ ` ${message.message}` }</span>
        </div>
    )
}

export default SignupMessage;