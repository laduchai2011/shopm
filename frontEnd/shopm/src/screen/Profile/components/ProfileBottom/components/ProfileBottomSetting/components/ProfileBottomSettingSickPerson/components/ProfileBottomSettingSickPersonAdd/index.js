import React, { useState } from "react";
import './styles.css';

import axios from "axios";

import { SERVER_ADDRESS_SICKPERSON_CREATE } from 'config/server';
import { $ } from "utilize/Tricks";

/**
*@typedef {
*name: string, 
*birthday: date,
*sex: boolean,
*address: string,
*phone: string,
*uuid_user: uuid
*} sickpersonOptions
*/ 

const ProfileBottomSettingSickPersonAdd = () => {
    const [name, setName] = useState('');
    const [nameNoti, setNameNoti] = useState('');
    const [birthday, setBirthday] = useState('');
    const [sex, setSex] = useState(true);
    const [address, setAddress] = useState('');
    const [addressNoti, setAddressNoti] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneNoti, setPhoneNoti] = useState('');

    const handlePhone = (e) => {
        const value = e.target.value;

        if (isNaN(value) || value.length===0) {
            setPhoneNoti('Phone must is number !');
        } else {
            setPhoneNoti('');
        }

        setPhone(value);
    }

    const handleSubmit = () => {
        const q_submitNoti = $('.ProfileBottomSettingSickPersonAdd-submitNoti');
        q_submitNoti.classList.remove('loading');
        q_submitNoti.classList.remove('success');
        q_submitNoti.classList.remove('failure');
        q_submitNoti.classList.remove('failure1');

        q_submitNoti.classList.add('loading');

        const sickpersonOptions = {
            name: name.trim(), 
            birthday: birthday,
            sex: sex,
            address: address.trim(),
            phone: phone.trim(),
            uuid_user: null
        }

        if ((name.length > 0) && (birthday.length > 0) && (address.length > 0) && (phone.length > 0) && (phoneNoti.length === 0)) {
            setTimeout(() => {
                axios({
                    method: 'post',
                    url: SERVER_ADDRESS_SICKPERSON_CREATE,
                    withCredentials: true,
                    data: sickpersonOptions,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    const resData = res.data;
                    q_submitNoti.classList.remove('loading');
                    if (resData.success) {
                        q_submitNoti.classList.add('success');
                    } else {
                        q_submitNoti.classList.add('failure');
                    }
                }).catch(error => {
                    console.error(error);
                    q_submitNoti.classList.remove('loading');
                    q_submitNoti.classList.add('failure');
                })
            }, 2000) 
        } else {
            q_submitNoti.classList.remove('loading');
            q_submitNoti.classList.add('failure1');
        }
    }

    // new Date().toISOString().slice(0, 19).replace('T', ' ')

    return (
        <div className="ProfileBottomSettingSickPersonAdd">
            <h3>Create sick person</h3>
            <div>
                <div>
                    <span>Name</span>
                    <div>
                        <input type="text" value={name} onChange={(e) => { setName(e.target.value); e.target.value.length===0 ? setNameNoti('Name must is a string !') : setNameNoti('') }} />
                        <div>{ nameNoti }</div>
                    </div>
                </div>
                <div>
                    <span>Birthday</span>
                    <div>
                        <input type="date" onChange={(e) => setBirthday(new Date(e.target.value).toISOString().slice(0, 19).replace('T', ' '))} />
                        {/* <div>{ birthday }</div> */}
                    </div>
                </div>
                <div>
                    <span>Sex</span>
                    <div>
                        <span>Male</span>
                        <div>
                            <input type="checkbox" checked={sex===true} onChange={() => setSex(true)} />
                        </div>
                    </div>
                    <div>
                        <span>Fe-Male</span>
                        <div>
                            <input type="checkbox" checked={sex===false} onChange={() => setSex(false)} />
                        </div>
                    </div>
                </div>
                <div>
                    <span>Address</span>
                    <div>
                        <input type="text" value={address} onChange={(e) => { setAddress(e.target.value); e.target.value.length===0 ? setAddressNoti('Address must is a string !') : setAddressNoti('') }} />
                        <div>{ addressNoti }</div>
                    </div>
                </div>
                <div>
                    <span>Phone</span>
                    <div>
                        <input type="tel" name="phone" placeholder="123-45-678" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required maxLength={15} value={phone} onChange={(e) => handlePhone(e)} />
                        <div>{ phoneNoti }</div>
                    </div>
                </div>
            </div>
            <button onClick={() => handleSubmit()}>Submit</button>
            <span className="ProfileBottomSettingSickPersonAdd-submitNoti"></span>
        </div>
    )
}

export default ProfileBottomSettingSickPersonAdd;