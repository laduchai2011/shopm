import React, { useState, useContext, useRef } from "react";
import "./styles.css";

import axios from 'axios';

import { ThemeContextApp } from "utilize/ContextApp";

import { 
    SERVER_ADDRESS_CREATE_CHESTGROUP,
    SERVER_ADDRESS_CREATE_CHESTGROUP_OF_SHOPM
} from "config/server";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDelete, TiTick  } from "react-icons/ti";
import { MdOutlineError } from "react-icons/md";

import { $ } from "utilize/Tricks";

const ChestGroupCreate = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const [infor, setInfor] = useState({
        name: '',
        title: '',
        address: '',
        note: '',
        status: 'no ready',
        createdBy: loginInfor.uuid_member
    });
    const [note, setNote] = useState();

    const [message, setMessage] = useState();
    const [messageColor, setMessageColor] = useState();

    const [successUpdateShopm, setSuccessUpdateShopm] = useState(false);
    const updateShopmLoading = useRef(false);
    const [messageUpdateShopm, setMessageUpdateShopm] = useState('Waiting for ChestGroup loading success !');

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
                const newNote = {
                    customInfor: {
                        isNewCustom: false,
                        isUpdatedToShopm: false,
                        isCreated: true
                    },
                    note: value
                }
                setNote(value);
                setInfor({
                    ...infor,
                    note: JSON.stringify(newNote)
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

                    // handle update chest group in shopm database
                    setMessageUpdateShopm('Waiting for ChestGroup loading success !');
                    updateShopmLoading.current = true;
                    const q_ChestGroupCreate_overlay = $('.ChestGroupCreate-overlay');
                    q_ChestGroupCreate_overlay.classList.add('show');

                    const chestGroup = resData.chestGroup;
                    const chestGroupOptions = {
                        uuid_chestGroup: chestGroup.uuid_chestGroup,
                        name: chestGroup.name,
                        title: chestGroup.title,
                        address: chestGroup.address,
                        note: chestGroup.note,
                        status: chestGroup.status
                    }
                    setTimeout(() => {
                        handleUpdateShopm(chestGroupOptions);
                    }, 3000)
                } else {
                    setMessageColor('red');
                }
            }).catch(error => console.error(error))
        }
    }

    const handleUpdateShopm = (chestGroupOptions) => {
        axios({
            method: 'POST',
            url: SERVER_ADDRESS_CREATE_CHESTGROUP_OF_SHOPM,
            withCredentials: true,
            data: {
                chestGroupOptions: chestGroupOptions
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                setMessageUpdateShopm('Update successly chest group to shopm !');
                setSuccessUpdateShopm(true);
            } else {
                setMessageUpdateShopm('Update failure chest group to shopm !');
                setSuccessUpdateShopm(false);
            }
            updateShopmLoading.current = false;
        }).catch(error => {
            console.error(error);
            setMessageUpdateShopm('Update failure chest group to shopm');
            setSuccessUpdateShopm(false);
            updateShopmLoading.current = false;
        })
    }

    const handleDel = () => {
        const q_ChestGroupCreate_overlay = $('.ChestGroupCreate-overlay');
        q_ChestGroupCreate_overlay.classList.remove('show');
    }

    return (
        loginInfor!==null && <div className="ChestGroupCreate">
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
                    <textarea value={note} onChange={(e) => handleInfor(e, 'note')} placeholder="Note" />
                </div>
                <div>
                    <button onClick={() => handleCreate()}>Create</button>
                </div>
                <div>
                    <span style={{color: messageColor}}>{ message }</span>
                </div>
            </div>
            <div className="ChestGroupCreate-overlay">
                <div className="ChestGroupCreate-dialog">
                    <div><TiDelete onClick={() => handleDel()} size={25} color="black" /></div>
                    <div>{ messageUpdateShopm }</div>
                    { updateShopmLoading.current && <div><AiOutlineLoading3Quarters className="ChestGroupCreate-loading" size={30} /></div> }
                    { !updateShopmLoading.current && <> {
                        successUpdateShopm ? 
                        <div><TiTick color="greenyellow" size={50} /></div> :
                        <div><MdOutlineError color="red" size={30} /></div>
                    }</> }
                </div>
            </div>
        </div>
    )
}

export default ChestGroupCreate;