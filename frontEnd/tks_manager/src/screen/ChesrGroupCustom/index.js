import React, { useState, useContext, useRef, useEffect } from "react";
import "./styles.css";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TiDelete, TiTick  } from "react-icons/ti";
import { MdOutlineError } from "react-icons/md";

import { ThemeContextApp } from "utilize/ContextApp";

import { 
    useGetChestGroupFromSvGetChestQuery,
    useLazyGetChestGroupFromSvTKS_GetChestQuery,
    useGetChestGroupFromSvTKS_GetChestQuery,
    usePatchChestGroupToSvTKS_UploadChestMutation,
    usePatchNotiChestGroupToSvUploadChestMutation,
    usePatchChestGroupStatusToSvTKS_UploadChestMutation,
    usePatchChestGroupToSvUploadChestMutation,
    usePatchNotiChestGroupToSvTKS_UploadChestMutation 
} from "reduxStore/RTKQuery/chestGroupRTLQuery";

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

    const [chestGroupTKS, setChestGroupTKS] = useState();
    // const [chestGroupShopm, setChestGroupShopm] = useState();

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

    const [triggerGetChestGroupFromSvTKS_GetChest] = useLazyGetChestGroupFromSvTKS_GetChestQuery();
    const [patchChestGroupToSvTKS_UploadChest] = usePatchChestGroupToSvTKS_UploadChestMutation();
    const [patchNotiChestGroupToSvUploadChest] = usePatchNotiChestGroupToSvUploadChestMutation();
    const [patchChestGroupStatusToSvTKS_UploadChest] = usePatchChestGroupStatusToSvTKS_UploadChestMutation();
    const [patchChestGroupToSvUploadChest] = usePatchChestGroupToSvUploadChestMutation();
    const [patchNotiChestGroupToSvTKS_UploadChest] = usePatchNotiChestGroupToSvTKS_UploadChestMutation();

    const {
        data: data_chestGroupShopm, 
        // isFetching: isFetching_chestGroupShopm, 
        isError: isError_chestGroupShopm,
        error: error_chestGroupShopm
    } = useGetChestGroupFromSvGetChestQuery({uuid_chestGroup: uuid_chestGroup}, {skip: uuid_chestGroup.length === 0});
    useEffect(() => {
        isError_chestGroupShopm && console.log(error_chestGroupShopm);
    }, [isError_chestGroupShopm, error_chestGroupShopm])
    useEffect(() => {
        const resData = data_chestGroupShopm;
        if (resData?.success) {
            // setChestGroupShopm(resData?.chestGroup)
        } else {
            resData?.message && console.log(resData?.message)
        }
    }, [data_chestGroupShopm])

    const {
        data: data_chestGroupTKS, 
        // isFetching: isFetching_chestGroupTKS, 
        isError: isError_chestGroupTKS,
        error: error_chestGroupTKS
    } = useGetChestGroupFromSvTKS_GetChestQuery({uuid_chestGroup: uuid_chestGroup}, {skip: uuid_chestGroup.length === 0});
    useEffect(() => {
        isError_chestGroupTKS && console.log(error_chestGroupTKS);
    }, [isError_chestGroupTKS, error_chestGroupTKS])
    useEffect(() => {
        const resData = data_chestGroupTKS;
        if (resData?.success) {
            setChestGroupTKS(resData?.chestGroup)
        } else {
            resData?.message && console.log(resData?.message)
        }
    }, [data_chestGroupTKS])

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
            patchChestGroupToSvTKS_UploadChest({
                uuid_chestGroup: uuid_chestGroup.trim(),
                chestGroupOptions: infor,
                uuid_member: loginInfor.uuid_member
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

                    // const chestGroup = resData.chestGroup;
                    // const chestGroupOptions = {
                    //     uuid_chestGroup: chestGroup.uuid_chestGroup,
                    //     name: chestGroup.name,
                    //     title: chestGroup.title,
                    //     address: chestGroup.address,
                    //     note: chestGroup.note,
                    //     status: chestGroup.status
                    // }
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
        patchNotiChestGroupToSvUploadChest({
            uuid_chestGroup: uuid_chestGroup.trim(),
            note: infor.note
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
        patchChestGroupStatusToSvTKS_UploadChest({
            uuid_chestGroup: uuid_chestGroup.trim(),
            status: statusChestGroup_,
            uuid_member: loginInfor.uuid_member
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
            triggerGetChestGroupFromSvTKS_GetChest({
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

    const handleUpdateToShopm = () => {
        const note_cp = JSON.parse(chestGroupTKS?.note);
        note_cp.customInfor.isNewCustom = false;
        note_cp.customInfor.isUpdatedToShopm = true;
        note_cp.customInfor.isCreated = false;
        const chestGroup_s = {
            uuid_chestGroup: chestGroupTKS.uuid_chestGroup,
            name: chestGroupTKS.name,
            title: chestGroupTKS.title,
            address: chestGroupTKS.address,
            note: JSON.stringify(note_cp),
            status: chestGroupTKS.status
        }

        setMessageUpdateShopm('Waiting for update data to database of shopm !');
        updateShopmLoading.current = true;
        const q_ChestGroupCustom_overlay = $('.ChestGroupCustom-overlay');
        q_ChestGroupCustom_overlay.classList.add('show');
        setTimeout(() => {
            patchChestGroupToSvUploadChest({
                uuid_chestGroup: chestGroupTKS.uuid_chestGroup,
                chestGroupOptions: chestGroup_s
            }).then( res => {
                const resData = res.data;
                if (resData?.success) {
                    setMessageUpdateShopm('Update data to database of shopm successly. Waiting for update finish !');
                    setSuccessUpdateShopm(true);
                    setTimeout(() => {
                        updateShopmLoading.current = true;
                        setSuccessUpdateShopm(false);
                        setTimeout(() => {
                            patchNotiChestGroupToSvTKS_UploadChest({
                                uuid_chestGroup: chestGroupTKS.uuid_chestGroup, 
                                note: JSON.stringify(note_cp)
                            }).then(res => {
                                const resData1 = res.data;
                                if (resData1?.success) {
                                    setMessageUpdateShopm('Update data to database of shopm successly. FINISH !');
                                    setSuccessUpdateShopm(true);
                                } else {
                                    setMessageUpdateShopm('Update data to shopm failure !');
                                    setSuccessUpdateShopm(false);
                                }
                                updateShopmLoading.current = false;
                            }).catch(error => {
                                console.error(error);
                                setMessageUpdateShopm('Update data to shopm failure !');
                                updateShopmLoading.current = false;
                            })
                        }, 3000)
                    }, 2000)
                } else {
                    setMessageUpdateShopm(`Update data to shopm failure. ${resData.message} !`);
                    setSuccessUpdateShopm(false);
                }
                updateShopmLoading.current = false;
            }).catch(error => {
                console.error(error);
                setMessageUpdateShopm('Update data to shopm failure !');
                updateShopmLoading.current = false;
            })
        }, 3000)
    }

    const handleCustomInforInshopm = (chestGroup) => {
        if (chestGroup?.success) {
            const customInfor = JSON.parse(chestGroup?.chestGroup?.note)?.customInfor;
            return customInfor;
        }
        return false;
    }

    return (
        loginInfor!==null && <div className="ChestGroupCustom">
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
                    {  
                        statusShopm==='ready custom' && 
                        handleCustomInforInshopm(data_chestGroupShopm).isNewCustom && 
                        !updateShopmLoading.current &&
                        <>
                            <div>Possible to update to shopm now !</div>
                            <button onClick={() => handleUpdateToShopm()}>
                                Update To Shopm
                            </button>
                        </>
                    }
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
                        {  
                            statusShopm==='ready custom' && 
                            handleCustomInforInshopm(data_chestGroupShopm).isNewCustom && 
                            !updateShopmLoading.current &&
                            <>
                                <div>
                                    { possibleUpdateMsg }
                                </div> 
                                <button onClick={() => handleUpdateToShopm()}>
                                    Update
                                </button> 
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChestGroupCustom;