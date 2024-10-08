import React, { useState } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Header from "screen/Header";
import DepartmentGroupCreateDialog from './components/DepartmentGroupCreateDialog';

import { setShowDialog } from 'reduxStore/slice/departmentGroupSlice';

import { SERVER_ADDRESS_CREATE_DEPARTMENTGROUP } from 'config/server';
import { getCookie } from 'auth/cookie';
import { PROVIDER_CONST } from 'utilize/constant';

const DepartmentGroupCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [departmentGroupInput, setDepartmentGroupInput] = useState({
        name: '',
        title: '',
        note: '',
        status: 'normal',
        uuid_provider: ''
    });
    const [dialogMsg, setDialogMsg] = useState('message');
    const [msgColor, setMsgColor] = useState('');

    const handleInput = (e, type) => {
        const value = e.target.value;

        switch(type) {
            case 'name':
                setDepartmentGroupInput({
                    ...departmentGroupInput,
                    name: value
                })
                break;
            case 'title':
                setDepartmentGroupInput({
                    ...departmentGroupInput,
                    title: value
                })
                break;
            default:
        }
    }

    const handleCreate = () => {
        const selectedProvider = JSON.parse(getCookie(PROVIDER_CONST.SELECTED_PROVIDER));

        const departmentGroupInput_f = {
            name: departmentGroupInput.name,
            title: departmentGroupInput.title,
            note: departmentGroupInput.note,
            status: departmentGroupInput.status,
            uuid_provider: selectedProvider?.uuid_provider
        }

        axios({
            method: 'POST',
            url: SERVER_ADDRESS_CREATE_DEPARTMENTGROUP,
            withCredentials: true,
            data: {
                departmentGroupOptions: departmentGroupInput_f
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                setDialogMsg('Create the department group successly !')
                setMsgColor('blue');
            } else {
                setDialogMsg('Create the department group failure !')
                setMsgColor('red');
            }
            dispatch(setShowDialog({showDialog: true}));
        }).catch(error => {
            console.error(error);
            setDialogMsg('Sorry. My system is erred !')
            setMsgColor('red');
            dispatch(setShowDialog({showDialog: true}));
        })
    }

    return (
        <div className='DepartmentGroupCreate'>
            <Header />
            <div className='DepartmentGroupCreate-main'>
                <div className='DepartmentGroupCreate-center'>
                    <h3>Create Department Group</h3>
                    <div>
                        <p>Name:</p>
                        <input value={ departmentGroupInput.name } onChange={(e) => handleInput(e, 'name')} placeholder='Name' />
                    </div>
                    <div>
                        <p>Title:</p>
                        <input value={ departmentGroupInput.title } onChange={(e) => handleInput(e, 'title')} placeholder='Title' />
                    </div>
                    <button className='DepartmentGroupCreate-btnCreate' onClick={() => handleCreate()}>Create</button>
                    <h4>If you have group, you can go to that group !</h4>
                    <div>
                        <button onClick={() => navigate('/departmentGroup/setup')}>Click to exist group to set up</button>
                        <button onClick={() => navigate('/department/create')}>Create a department</button>
                    </div>
                </div>
            </div>
            <div>
                <DepartmentGroupCreateDialog message={ dialogMsg } textColor={ msgColor } />
            </div>
        </div>
    )
}

export default DepartmentGroupCreate;