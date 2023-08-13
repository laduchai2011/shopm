import React, { useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { HiSwitchHorizontal } from 'react-icons/hi';
import { IoMdAddCircle, IoIosCreate } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';

import { $, $$ } from "utilize/Tricks";

const RegisterProviderHeader = ({ index }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const q_option = $$('.RegisterProviderHeader-option');
        q_option[index].classList.add('active');
        q_option.forEach(eOption => {
            eOption.onclick = function() {
                for (let i = 0; i < q_option.length; i++) {
                    q_option[i].classList.remove('active');
                }
                this.classList.add('active');
            }
        });
    }, [index])

    const handleShowOptions = () => {
        const q_optionContainer = $('.RegisterProviderHeader-optionContainer');
        q_optionContainer.classList.toggle('show');
    }

    return (
        <div className="RegisterProviderHeader">
            <div className="RegisterProviderHeader-optionContainer show">
                <div className="RegisterProviderHeader-option add" onClick={() => navigate('/provider/setting/register')}>
                    <IoMdAddCircle size={ 25 } color="green" />
                    <div>Add Provider</div>
                </div>
                <div className="RegisterProviderHeader-option change" onClick={() => navigate('/provider/setting/register/change')}>
                    <IoIosCreate size={ 25 } color="blue" />
                    <div>Change</div>
                </div>
                <div className="RegisterProviderHeader-option delete" onClick={() => navigate('/provider/setting/register/delete')}>
                    <AiFillDelete size={ 25 } color="red" />
                    <div>Delete</div>
                </div>
            </div>            
            <HiSwitchHorizontal className="RegisterProviderHeader-showOptions" size={ 25 } onClick={() => handleShowOptions()} />
        </div>
    )
}

export default RegisterProviderHeader;