import React, { useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { HiSwitchHorizontal } from 'react-icons/hi';
import { IoMdAddCircle, IoIosCreate } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';

import { $, $$ } from "utilize/Tricks";

const ProviderAboutHeader = ({ index }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const q_option = $$('.ProviderAboutHeader-option');
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
        const q_optionContainer = $('.ProviderAboutHeader-optionContainer');
        q_optionContainer.classList.toggle('show');
    }

    return (
        <div className="ProviderAboutHeader">
            <div className="ProviderAboutHeader-optionContainer show">
                <div className="ProviderAboutHeader-option add" onClick={() => navigate('/provider/setting/about')}>
                    <IoMdAddCircle size={ 25 } color="green" />
                    <div>Add About</div>
                </div>
                <div className="ProviderAboutHeader-option change" onClick={() => navigate('/provider/setting/about/change')}>
                    <IoIosCreate size={ 25 } color="blue" />
                    <div>Change</div>
                </div>
                <div className="ProviderAboutHeader-option delete" onClick={() => navigate('/provider/setting/about/delete')}>
                    <AiFillDelete size={ 25 } color="red" />
                    <div>Delete</div>
                </div>
            </div>            
            <HiSwitchHorizontal className="ProviderAboutHeader-showOptions" size={ 25 } onClick={() => handleShowOptions()} />
        </div>
    )
}

export default ProviderAboutHeader;