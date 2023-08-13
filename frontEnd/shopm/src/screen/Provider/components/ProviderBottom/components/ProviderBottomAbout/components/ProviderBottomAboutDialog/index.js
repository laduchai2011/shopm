import React, { useState } from "react";
import './styles.css';

import { TiDeleteOutline, TiTick } from 'react-icons/ti';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { $, $$ } from "utilize/Tricks";

const ProviderBottomAboutDialog = () => {

    const [input, setInput] = useState([1]);
    const [loading, setLoading] = useState(true);

    const handleAccept = () => {
        setLoading(true);
        const queryBtn = $$('.ProviderBottomAboutDialog-btn');
        const iconLoading = $('.ProviderBottomAboutDialog-btnAccept-iconLoading');
        const iconSuccess = $('.ProviderBottomAboutDialog-btnAccept-iconSuccess');
        const txtLoading = $('.ProviderBottomAboutDialog-txtLoading');
        const txtSuccess = $('.ProviderBottomAboutDialog-txtSuccess');
        queryBtn[0].classList.add('active');
        queryBtn[1].classList.remove('active');
        iconLoading.classList.add('active');
        txtLoading.classList.add('active');

        setTimeout(() => {
            iconLoading.classList.remove('active');
            iconSuccess.classList.add('active');
            txtLoading.classList.remove('active');
            txtSuccess.classList.add('active');
            setLoading(false);
        }, 3000);
        
    }

    const handleAddInput = () => {
        setInput(pre => [...pre, 1])
    }

    const handleCloseDialog = () => {
        handleRefresh();
        const aboutDialog = $('.ProviderBottomAboutDialog');
        aboutDialog.classList.remove('show');
    }

    const handleRefresh = () => {
        if (!loading) {
            const queryBtn = $$('.ProviderBottomAboutDialog-btn');
            const iconLoading = $('.ProviderBottomAboutDialog-btnAccept-iconLoading');
            const iconSuccess = $('.ProviderBottomAboutDialog-btnAccept-iconSuccess');
            const txtLoading = $('.ProviderBottomAboutDialog-txtLoading');
            const txtSuccess = $('.ProviderBottomAboutDialog-txtSuccess');

            queryBtn[0].classList.remove('active');
            queryBtn[1].classList.add('active');
            iconLoading.classList.remove('active');
            iconSuccess.classList.remove('active');
            txtLoading.classList.remove('active');
            txtSuccess.classList.remove('active');

            setInput([1])
        }
    }

    const list_inputContainer =input.map((data, index) => {
        return (
            <div key={ index } className="ProviderBottomAboutDialog-incenter">
                <div className="ProviderBottomAboutDialog-contentContainer">
                    <input placeholder="Subject" maxLength={20} />
                    <input placeholder="Content" maxLength={50} />
                </div>
            </div>
        )
    })

    return (
        <div className="ProviderBottomAboutDialog">
            <div className="ProviderBottomAboutDialog-top">
                <span>About</span>
                <TiDeleteOutline onClick={() => handleCloseDialog()} size={25} />
            </div>
            <div className="ProviderBottomAboutDialog-center">
                { list_inputContainer }
            </div>
            <div className="ProviderBottomAboutDialog-bottom">
                <div className="ProviderBottomAboutDialog-addBtn">
                    <span onClick={() => handleRefresh()}>Refresh</span>
                    <GrAdd onClick={() => handleAddInput()} size={25} />
                </div>
                <div className="ProviderBottomAboutDialog-acceptBtn">
                    <div className="ProviderBottomAboutDialog-btn loading">
                        <span className="ProviderBottomAboutDialog-txtLoading">Loading ...</span>
                        <span className="ProviderBottomAboutDialog-txtSuccess">Success</span>
                    </div>
                    <div className="ProviderBottomAboutDialog-btn accept active" onClick={() => handleAccept()}>
                        <span className="ProviderBottomAboutDialog-btnAccept">Accept</span>
                        <AiOutlineLoading3Quarters className="ProviderBottomAboutDialog-btnAccept-iconLoading" size={20} color="red" />
                        <TiTick className="ProviderBottomAboutDialog-btnAccept-iconSuccess" size={30} color="green" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderBottomAboutDialog;