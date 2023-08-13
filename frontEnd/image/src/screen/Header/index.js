import React, { useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { MdManageSearch } from 'react-icons/md';
import { GrFormAdd } from 'react-icons/gr';

import { $, $$ } from "utilize/Tricks";

const Header = ({index}) => {

    const navigate = useNavigate();

    useEffect(() => {
        const selects = $$('.Header-select');
        const line = $('.Header-line');

        if (index !== 3) {
            line.style.width = selects[index].offsetWidth + 'px';
            line.style.left = selects[index].offsetLeft + 'px';

            selects[index].classList.add('active');
        } else {
            line.style.width = 0 + 'px';
            line.style.left = 0 + 'px';

            for(let i = 0; i < selects.length; i++) {
                selects[i].classList.remove('active');
            }
        }
    }, [index])

    const handleMenu = () => {
        const menu = $('.Header-menu');
        if (menu.classList.contains('display')) {
            menu.classList.toggle('show');
            setTimeout(() => {
                menu.classList.toggle('display');
            }, 300)
        } else {
            menu.classList.toggle('display');
            setTimeout(() => {
                menu.classList.toggle('show');
            }, 300)
        }
    }

    return (
        <div className="Header">
            <span className="Header-menuContainer">
                <span className="Header-logo">
                    <span>SHOPM</span>
                    <AiOutlineMenu onClick={() => handleMenu()} />
                </span>
                <div className="Header-menu">
                    <div className="Header-select" onClick={() => navigate('/')}><AiFillHome size={20} color="blue" /><strong>HOME</strong></div>
                    <div className="Header-select" onClick={() => navigate('/manager')}><MdManageSearch size={20} color="blue" /><strong>MANAGER</strong></div>
                    <div className="Header-select" onClick={() => navigate('/add')}><GrFormAdd size={20} color="blue" /><strong>Add</strong></div>
                    <div className="Header-line"></div>
                </div>
            </span>
            <span className="Header-avatar" onClick={() => navigate('/profile')}>
                {/* <span>sdd asdf safd asfdname</span> */}
                <img src="https://tse1.mm.bing.net/th?id=OIP.mzmPJeuwJGTc6FKwRmCA8wHaEo&pid=Api&rs=1&c=1&qlt=95&w=189&h=118" alt=""/>
            </span>
        </div>
    )
}

export default Header;