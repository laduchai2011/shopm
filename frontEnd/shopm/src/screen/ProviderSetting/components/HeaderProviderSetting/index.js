import React, { useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { VscChevronDown, VscChevronUp } from 'react-icons/vsc';

import { $$, $ } from "utilize/Tricks";

const HeaderProviderSetting = ({ index }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const qOption = $$('.HeaderProviderSetting-option');
        const qLine = $('.HeaderProviderSetting-line');
        qLine.style.left = qOption[index].offsetLeft + 'px';
        qLine.style.width = qOption[index].offsetWidth + 'px';
        qOption[index].classList.add('active');
        qOption.forEach(eOption => {
            eOption.onclick = function() {
                qLine.style.left = this.offsetLeft + 'px';
                qLine.style.width = this.offsetWidth + 'px';
                for (let i = 0; i < qOption.length; i++) {
                    if (qOption[i] !== eOption) {
                        qOption[i].classList.remove('active');
                    }
                }
                setTimeout(() => {
                    navigate(this.dataset.route);
                }, 200)
            }
        });
        
    }, [navigate, index])

    const handleShowOptions = (type) => {
        const qOption = $$('.HeaderProviderSetting-option');
        const qIcon = $$('.HeaderProviderSetting-icon');
        qOption.forEach(eOption => {
            if (!eOption.classList.contains('active') && (type === 'down')) {
                qIcon[0].classList.remove('active');
                qIcon[1].classList.add('active');
                eOption.classList.add('show');  
            } else if (!eOption.classList.contains('active') && (type === 'up')) {
                qIcon[0].classList.add('active');
                qIcon[1].classList.remove('active');
                eOption.classList.remove('show');
            }
        });
    }

    return (
        <div className="HeaderProviderSetting">
            <span className="HeaderProviderSetting-option" data-route='/provider/setting'>Introduction</span>
            <span className="HeaderProviderSetting-option" data-route='/provider/setting/register'>Register</span>
            <span className="HeaderProviderSetting-option" data-route='/provider/setting/about'>About</span>
            <span className="HeaderProviderSetting-option">Product</span>
            <span className="HeaderProviderSetting-option">News</span>
            <div className="HeaderProviderSetting-line"></div>
            <div className="HeaderProviderSetting-iconContainer">
                <VscChevronDown className="HeaderProviderSetting-icon active" onClick={() => handleShowOptions('down')} size={ 20 } />
                <VscChevronUp className="HeaderProviderSetting-icon" onClick={() => handleShowOptions('up')} size={ 20 } />
            </div>
            
        </div>
    )
}

export default HeaderProviderSetting;