import React, { useState, useContext } from "react";
import "./styles.css";

import axios from 'axios';

import { ThemeContextApp } from "utilize/ContextApp";

import { useLazyGetChestGroupQuery } from "reduxStore/RTKQuery/chestRTKQuery";

import { SERVER_ADDRESS_PATCH_CHESTGROUP } from "config/server";

const ChestGroupCustom = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const [infor, setInfor] = useState({
        name: '',
        title: '',
        address: '',
        note: '',
        status: 'normal',  // not use in this
        createdBy: ''  // not use in this
    });

    const [message, setMessage] = useState();
    const [messageColor, setMessageColor] = useState();
    const [uuid_chestGroup, setUuid_chestGroup] = useState('');

    const [getChestGroup] = useLazyGetChestGroupQuery();

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

    const handleCustom = () => {
        if (checkInput()) {
            axios({
                method: 'PATCH',
                url: SERVER_ADDRESS_PATCH_CHESTGROUP,
                withCredentials: true,
                data: {
                    uuid_chestGroup: uuid_chestGroup.trim(),
                    chestGroupOptions: infor,
                    uuid_member: loginInfor.uuid_member
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

    const handleSearch = (e) => {
        const value = e.target.value;
        setUuid_chestGroup(value)
    }

    const handleEnter = (e) => {
        if (e.keyCode===13) {
            getChestGroup({
                uuid_chestGroup: uuid_chestGroup.trim()
            }).then(res => {
                const resData = res.data;
                const chestGroup = resData.chestGroup;
                console.log(resData)
                if (resData?.success) {
                    setInfor({
                        name: chestGroup.name,
                        title: chestGroup.title,
                        address: chestGroup.address,
                        note: chestGroup.note,
                        status: 'normal',  // not use in this
                        createdBy: ''  // not use in this
                    })
                } else {
                    setInfor({
                        name: '',
                        title: '',
                        address: '',
                        note: '',
                        status: 'normal',  // not use in this
                        createdBy: ''  // not use in this
                    })
                }
            }).catch(err => console.error(err))
        }
    }

    return (
        <div className="ChestGroupCustom">
            <div className="ChestGroupCustom-center">
                <h4>Custom a chest group</h4>
                <div>
                    <div>Search uuid</div>
                    <input value={uuid_chestGroup} onChange={(e) => handleSearch(e)} onKeyDown={(e) => handleEnter(e)} placeholder="Search" />
                </div>
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
                    <button onClick={() => handleCustom()}>Custom</button>
                </div>
                <div>
                    <span style={{color: messageColor}}>{ message }</span>
                </div>
            </div>
        </div>
    )
}

export default ChestGroupCustom;