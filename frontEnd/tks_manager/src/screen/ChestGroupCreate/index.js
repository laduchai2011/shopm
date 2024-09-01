import React, { useState, useContext } from "react";
import "./styles.css";

import axios from 'axios';

import { ThemeContextApp } from "utilize/ContextApp";

import { SERVER_ADDRESS_CREATE_CHESTGROUP } from "config/server";

const ChestGroupCreate = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const [infor, setInfor] = useState({
        name: '',
        title: '',
        address: '',
        note: '',
        status: 'normal',
        createdBy: loginInfor.uuid_member
    });

    const [message, setMessage] = useState();
    const [messageColor, setMessageColor] = useState();

    const handleInfor = (e, type) => {
        setMessage('');
        const value = e.target.value;

        switch(type) {
            case 'name':
                setInfor({
                    ...infor,
                    name: value
                })
                break;
            case 'title':
                setInfor({
                    ...infor,
                    title: value
                })
                break;
            case 'address':
                setInfor({
                    ...infor,
                    address: value
                })
                break;
            case 'note':
                setInfor({
                    ...infor,
                    note: value
                })
                break;
            default:
        }
    }

    const checkInput = () => {
        setMessageColor('red');
        if (infor.name.trim().length < 1) {
            setMessage('Name is NOT empty !');
            return false;
        } else if (infor.title.trim().length < 1) {
            setMessage('Title is NOT empty !');
            return false;
        } else if (infor.address.trim().length < 1) {
            setMessage('Address is NOT empty !');
            return false;
        }
        setMessageColor('blue');
        return true;
    }

    const handleCreate = () => {
        if (checkInput()) {
            axios({
                method: 'POST',
                url: SERVER_ADDRESS_CREATE_CHESTGROUP,
                withCredentials: true,
                data: {
                    chestGroupOptions: infor
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                setMessage(resData?.message);
                if (resData?.success) {
                    setMessageColor('blue');
                } else {
                    setMessageColor('red');
                }
            }).catch(error => console.error(error))
        }
    }

    return (
        <div className="ChestGroupCreate">
            <div className="ChestGroupCreate-center">
                <h4>Create a chest group</h4>
                <div>
                    <div>Name:</div>
                    <input value={infor.name} onChange={(e) => handleInfor(e, 'name')} placeholder="Name" />
                </div>
                <div>
                    <div>Title:</div>
                    <input value={infor.title} onChange={(e) => handleInfor(e, 'title')} placeholder="Title" />
                </div>
                <div>
                    <div>Address:</div>
                    <input value={infor.address} onChange={(e) => handleInfor(e, 'address')} placeholder="Address" />
                </div>
                <div>
                    <div>Note:</div>
                    <textarea value={infor.note} onChange={(e) => handleInfor(e, 'note')} placeholder="Note" />
                </div>
                <div>
                    <button onClick={() => handleCreate()}>Create</button>
                </div>
                <div>
                    <span style={{color: messageColor}}>{ message }</span>
                </div>
            </div>
        </div>
    )
}

export default ChestGroupCreate;