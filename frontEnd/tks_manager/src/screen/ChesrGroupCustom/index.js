import React, { useState, useContext, useRef } from "react";
import "./styles.css";

import axios from 'axios';

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDelete, TiTick  } from "react-icons/ti";
import { MdOutlineError } from "react-icons/md";

import { ThemeContextApp } from "utilize/ContextApp";

import { useLazyGetChestGroupQuery } from "reduxStore/RTKQuery/chestRTKQuery";

import { 
    SERVER_ADDRESS_PATCH_CHESTGROUP, 
    SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS,
    SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM
} from "config/server";

import { $ } from "utilize/Tricks";

const ChestGroupCustom = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const [infor, setInfor] = useState({
        name: '',
        title: '',
        address: '',
        note: '',
        status: 'no ready',  // not use in this
        createdBy: ''  // not use in this
    });
    const [note, setNote] = useState();

    const [message, setMessage] = useState();
    const [messageColor, setMessageColor] = useState();
    const [uuid_chestGroup, setUuid_chestGroup] = useState('');
    const [statusChestGroup, setStatusChestGroup] = useState();
    const [statusMessage, setStatusMessage] = useState();
    const [statusMessageColor, setStatusMessageColor] = useState();

    const [successUpdateShopm, setSuccessUpdateShopm] = useState(false);
    const updateShopmLoading = useRef(false);
    const [messageUpdateShopm, setMessageUpdateShopm] = useState('Waiting for ChestGroup loading success !');

    const [possibleUpdateMsg, setPossibleUpdateMsg] = useState();
    const [statusShopm, setStatusShopm] = useState();

    const [getChestGroup] = useLazyGetChestGroupQuery();

    const handleInfor = (e, type) => {
        if (statusChestGroup==='ready custom') {
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
                    const cpnote = JSON.parse(infor.note);
                    const newNote = {
                        ...cpnote,
                        note: value
                    }
                    newNote.customInfor.isNewCustom = true;
                    newNote.customInfor.isUpdatedToShopm = false;
                    newNote.customInfor.isCreated = false;
                    setNote(value);
                    setInfor({
                        ...infor,
                        note: JSON.stringify(newNote)
                    })
                    break;
                default:
            }
        } else {
            setStatusMessage('Cant Not change information of things not yet ready !');
            setStatusMessageColor('red');
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
                setPossibleUpdateMsg('');
                setStatusShopm('');
                if (resData?.success) {
                    setMessageColor('blue');

                    // handle update chest group in shopm database
                    setMessageUpdateShopm('Waiting for update notification to database of shopm !');
                    updateShopmLoading.current = true;
                    const q_ChestGroupCustom_overlay = $('.ChestGroupCustom-overlay');
                    q_ChestGroupCustom_overlay.classList.add('show');

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
                        handleUpdateNoteOfChestGroupWhenCustom();
                    }, 3000)
                } else {
                    setMessageColor('red');
                }
            }).catch(error => console.error(error))
        }
    }

    const handleUpdateNoteOfChestGroupWhenCustom = () => {
        axios({
            method: 'patch',
            url: SERVER_ADDRESS_PATCH_NOTI_CHESTGROUP_OF_SHOPM,
            withCredentials: true,
            data: {
                uuid_chestGroup: uuid_chestGroup.trim(),
                note: infor.note
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                const chestGroup = resData.chestGroup;
                const status = chestGroup.status;
                setStatusShopm(status);
                if (status==='ready custom') {
                    setPossibleUpdateMsg('Shopm is ready to update chestGroup !')
                } else {
                    setPossibleUpdateMsg('Shopm is NOT ready to update chestGroup yet !');
                }
                setMessageUpdateShopm('Update notification to database of shopm successly !');
                setSuccessUpdateShopm(true);
            } else {
                setMessageUpdateShopm('Update chest group to shopm failure !');
                setSuccessUpdateShopm(false);
            }
            updateShopmLoading.current = false;
        }).catch(error => {
            console.error(error);
            setMessageUpdateShopm('Update chest group to shopm failure !');
            setSuccessUpdateShopm(false);
            updateShopmLoading.current = false;
        })
    }

    const handleSearch = (e) => {
        const value = e.target.value;
        setUuid_chestGroup(value)
    }

    const handleChangeStatus = ()=> {
        let statusChestGroup_;
        if (statusChestGroup!=='ready custom') {
            statusChestGroup_ = 'ready custom';
        } else if (statusChestGroup==='ready custom') {
            statusChestGroup_ = 'no ready';
        }
        axios({
            method: 'PATCH',
            url: SERVER_ADDRESS_PATCH_CHESTGROUP_STATUS,
            withCredentials: true,
            data: {
                uuid_chestGroup: uuid_chestGroup.trim(),
                status: statusChestGroup_,
                uuid_member: loginInfor.uuid_member
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            const chestGroup = resData.chestGroup;
            if (chestGroup.status==='ready custom') {
                setStatusMessage('Ready to custom !');
                setStatusMessageColor('blue');
            } else {
                setStatusMessage('Not yet ready to custom !');
                setStatusMessageColor('red');
            }
            setStatusChestGroup(chestGroup.status);
        }).catch(error => console.error(error))
    }

    const handleEnter = (e) => {
        if (e.keyCode===13) {
            getChestGroup({
                uuid_chestGroup: uuid_chestGroup.trim()
            }).then(res => {
                const resData = res.data;
                const chestGroup = resData.chestGroup;
                if (resData?.success) {
                    setInfor({
                        name: chestGroup.name,
                        title: chestGroup.title,
                        address: chestGroup.address,
                        note: chestGroup.note,
                        status: chestGroup.status,  // not use in this
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
                setNote(JSON.parse(chestGroup.note).note)

                if (chestGroup.status==='ready custom') {
                    setStatusMessage('Ready to custom !');
                    setStatusMessageColor('blue');
                } else {
                    setStatusMessage('Not yet ready to custom !');
                    setStatusMessageColor('red');
                }
                setStatusChestGroup(chestGroup.status);
            }).catch(err => console.error(err))
        }
    }

    const handleDel = () => {
        const q_ChestGroupCreate_overlay = $('.ChestGroupCustom-overlay');
        q_ChestGroupCreate_overlay.classList.remove('show');
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
                    <div>Click to custom</div>
                    <input type="checkbox" checked={statusChestGroup==='ready custom'} onChange={() => handleChangeStatus()} />
                    <span style={{color: statusMessageColor}}>{ statusMessage }</span>
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
                    <textarea value={note} onChange={(e) => handleInfor(e, 'note')} placeholder="Note" />
                </div>
                <div>
                    <button onClick={() => handleCustom()}>Custom</button>
                </div>
                <div>
                    <span style={{color: messageColor}}>{ message }</span>
                </div>
            </div>
            <div className="ChestGroupCustom-overlay">
                <div className="ChestGroupCustom-dialog">
                    <div><TiDelete onClick={() => handleDel()} size={25} color="black" /></div>
                    <div>{ messageUpdateShopm }</div>
                    { updateShopmLoading.current && <div><AiOutlineLoading3Quarters className="ChestGroupCreate-loading" size={30} /></div> }
                    { !updateShopmLoading.current && <> {
                        successUpdateShopm ? 
                        <div><TiTick color="greenyellow" size={50} /></div> :
                        <div><MdOutlineError color="red" size={30} /></div>
                    }</> }
                    <div>
                        <div>{ possibleUpdateMsg }</div>
                        {statusShopm==='ready custom' && <button>Update</button> }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChestGroupCustom;