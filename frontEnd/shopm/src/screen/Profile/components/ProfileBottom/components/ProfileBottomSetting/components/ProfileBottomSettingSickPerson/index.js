import React, { useState } from "react";
import './styles.css';

import { HiMenuAlt4 } from 'react-icons/hi';

import ProfileBottomSettingSickPersonAdd from "./components/ProfileBottomSettingSickPersonAdd";
import ProfileBottomSettingSickPersonChange from "./components/ProfileBottomSettingSickPersonChange";
import ProfileBottomSettingSickPersonDelete from "./components/ProfileBottomSettingSickPersonDelete";

import { $ } from "utilize/Tricks";

const ProfileBottomSettingSickPerson = () => {
    const [stSickPersonOption, setStSickPersonOption] = useState('add');

    const handleSelect = (e, type) => {
        const q_seletes = $('.ProfileBottomSettingSickPerson-left').children;
        for (let i = 0; i < q_seletes.length; i++) {
            q_seletes[i].classList.remove('active');
        }

        e.target.classList.add('active');

        setStSickPersonOption(type);
    }

    const handleHiddenLeft = () => {
        const q_left = $('.ProfileBottomSettingSickPerson-left');
        q_left.classList.toggle('hidden');
    }

    return (
        <div className="ProfileBottomSettingSickPerson">
            <div className="ProfileBottomSettingSickPerson-left">
                <HiMenuAlt4 size={20} onClick={() => handleHiddenLeft()} />
                <div className="active" onClick={(e) => handleSelect(e, 'add')}>Add</div>
                <div onClick={(e) => handleSelect(e, 'change')}>Change</div>
                <div onClick={(e) => handleSelect(e, 'delete')}>Delete</div>
            </div>
            <div className="ProfileBottomSettingSickPerson-right">
                { stSickPersonOption==='add' && <ProfileBottomSettingSickPersonAdd /> }
                { stSickPersonOption==='change' && <ProfileBottomSettingSickPersonChange /> }
                { stSickPersonOption==='delete' && <ProfileBottomSettingSickPersonDelete /> }
            </div>
        </div>
    )
}

export default ProfileBottomSettingSickPerson;