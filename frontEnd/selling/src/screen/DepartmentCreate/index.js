import React, { useState, useEffect } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { AiOutlineArrowRight } from "react-icons/ai";

import Header from "screen/Header";
import { isVietkey } from 'utilize/StringValidate';
import { isFloat, isInteger } from 'utilize/CheckString';
import { getCookie } from 'auth/cookie';
import { PROVIDER_CONST } from 'utilize/constant';

import { useReadAllDepartmentGroupQuery } from 'reduxStore/RTKQuery/departmentGroupRTKQuery';
import { useSrCreateDepartmentReadAllMedicationQuery } from 'reduxStore/RTKQuery/medicationRTKQuery';

import DepartmentCreateDialog from './components/DepartmentCreateDialog';
import { setShowDialog } from 'reduxStore/slice/departmentCreateSlice';


const DepartmentCreate = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [newInfor, setNewInfor] = useState({
        name: '',
        title: '',
        amount: '',
        sold: '',
        remain: '',
        recover: '',
        turnover: '', 
        return: '',
        consultantCost: '',
        price: '',
        discount: '',
        firstTime: '',
        lastTime: '',
        note: '',
        status: 'normal',
        uuid_medication: '',
        uuid_chest: null,
        uuid_departmentGroup: ''
    });

    const [dialogMsg, setDialogMsg] = useState('message');
    const [msgColor, setMsgColor] = useState('');

    const selectedProvider_cookie = JSON.parse(getCookie(PROVIDER_CONST.SELECTED_PROVIDER));
    const [departmentGroupAll, setDepartmentGroupAll] = useState([]);
    const [allMedications, setAllMedications] = useState([]);

    const {
        data: data_departmentGroup, 
        // isFetching: isFetching_departmentGroup, 
        isError: isError_departmentGroup,
        error: error_departmentGroup
    } = useReadAllDepartmentGroupQuery({uuid_provider: selectedProvider_cookie.uuid_provider}, {skip: selectedProvider_cookie ? false : true});
    useEffect(() => {
        isError_departmentGroup && console.log(error_departmentGroup);
    }, [isError_departmentGroup, error_departmentGroup])
    useEffect(() => {
        const resData = data_departmentGroup;
        if (resData?.success) {
            setDepartmentGroupAll(resData.departmentGroupAll);
        } else {
            resData?.message && console.log(resData?.message);
        }
    }, [data_departmentGroup])

    const {
        data: data_allMedications, 
        // isFetching: isFetching_allMedications, 
        isError: isError_allMedications,
        error: error_allMedications
    } = useSrCreateDepartmentReadAllMedicationQuery({uuid_provider: selectedProvider_cookie.uuid_provider}, {skip: selectedProvider_cookie ? false : true});
    useEffect(() => {
        isError_allMedications && console.log(error_allMedications);
    }, [isError_allMedications, error_allMedications])
    useEffect(() => {
        const resData = data_allMedications;
        if (resData?.success) {
            setAllMedications(resData.allMedications);
        } else {
            resData?.message && console.log(resData?.message);
        }
    }, [data_allMedications])


    const handleInput = (e, type) => {
        const value = e.target.value;
        if (!isVietkey(value)) {
            switch(type) {
                case 'name':
                    setNewInfor({
                        ...newInfor,
                        name: value
                    })
                    break;
                case 'title':
                    setNewInfor({
                        ...newInfor,
                        title: value
                    })
                    break;
                case 'amount':
                    if (isInteger(value)) {
                        setNewInfor({
                            ...newInfor,
                            amount: value,
                            remain: value
                        })
                    } else if(value.length===0) {
                        setNewInfor({
                            ...newInfor,
                            amount: '',
                            remain: ''
                        })
                    }
                    break;
                case 'sold':
                    // Number.isInteger(valueInter) && valueInter > -1 && setNewInfor({
                    //     ...newInfor,
                    //     sold: valueInter
                    // })
                    alert('You can NOT change this !')
                    break;
                case 'remain':
                    // Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                    //     ...newInfor,
                    //     remain: valueInter
                    // })
                    alert('You can NOT change this !')
                    break;
                case 'recover':
                    // Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                    //     ...newInfor,
                    //     recover: valueInter
                    // })
                    alert('You can NOT change this !')
                    break;
                case 'turnover':
                    // Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                    //     ...newInfor,
                    //     turnover: valueInter
                    // })
                    alert('You can NOT change this !');
                    break;
                case 'return':
                    // Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                    //     ...newInfor,
                    //     return: valueInter
                    // })
                    alert('You can NOT change this !');
                    break;
                case 'consultantCost':
                    if (isInteger(value) || isFloat(value)) {
                        setNewInfor({
                            ...newInfor,
                            consultantCost: value
                        })
                    } else if(value.length===0) {
                        setNewInfor({
                            ...newInfor,
                            consultantCost: ''
                        })
                    }
                    break;
                case 'price':
                    if (isInteger(value) || isFloat(value)) {
                        setNewInfor({
                            ...newInfor,
                            price: value
                        })
                    } else if(value.length===0) {
                        setNewInfor({
                            ...newInfor,
                            price: ''
                        })
                    }
                    break;
                case 'discount':
                    if (isInteger(value) || isFloat(value)) {
                        setNewInfor({
                            ...newInfor,
                            discount: value
                        })
                    } else if(value.length===0) {
                        setNewInfor({
                            ...newInfor,
                            discount: ''
                        })
                    }
                    break;
                case 'note':
                    setNewInfor({
                        ...newInfor,
                        note: value
                    })
                    break;
                default: 
            }
        }
    }

    const handleCreate = () => {
        // setMsgColor('red');
        // setDialogMsg('1111111');
        // dispatch(setShowDialog({showDialog: true}));

        const uuid_departmentGroup_ = document.getElementById("department-groups").value;
        const uuid_medication_ = document.getElementById("department-medication").value;

        const departmentOptions = {
            name: newInfor.name,
            title: newInfor.title,
            amount: newInfor.amount,
            sold: newInfor.sold,
            remain: newInfor.remain,
            recover: newInfor.recover,
            turnover: newInfor.turnover,
            return: newInfor.return,
            consultantCost: parseFloat(newInfor.consultantCost.trim()),
            price: parseFloat(newInfor.price.trim()),
            discount: parseFloat(newInfor.discount.trim()),
            firstTime: newInfor.firstTime,
            lastTime: newInfor.lastTime,
            note: newInfor.note,
            status: newInfor.status,
            uuid_medication: uuid_medication_,
            uuid_chest: newInfor.uuid_chest,
            uuid_departmentGroup: uuid_departmentGroup_
        }
    }

    const handleGotoEdit = () => {
        navigate('/department/edit');
    }

    const list_departmentGroup = departmentGroupAll.map((data, index) => {
        console.log(data)
        return (
            <option key={index} value={data?.uuid_departmentGroup} title={data?.title}>{ data?.name }</option>
        )
    })

    const list_medication = allMedications.map((data, index) => {
        return (
            <option key={index} value={data?.uuid_medication} title={data?.title}>{ data?.name }</option>
        )
    })

    return (
        <div className='DepartmentCreate'>
            <Header />
            <div className='DepartmentCreate-main'>
                <div className='DepartmentCreate-center'>
                    <h3>Create depatment</h3>
                    <div>
                        <div>
                            <label htmlFor="department-groups">Choose a department group:</label>
                            <select name="department-groups" id="department-groups">
                                <option value="Select">Select</option>
                                { list_departmentGroup }
                            </select>
                        </div>
                        <div>
                            <label htmlFor="department-medication">Choose a medication:</label>
                            <select name="department-medication" id="department-medication">
                                <option value="Select">Select</option>
                                { list_medication }
                            </select>
                        </div>
                    </div>
                    <div>
                        <p>Name</p>
                        <input value={ newInfor.name } onChange={(e) => handleInput(e, 'name')} placeholder="Name" />
                    </div>
                    <div>
                        <p>Title</p>
                        <input value={ newInfor.title } onChange={(e) => handleInput(e, 'title')} placeholder="Title" />
                    </div>
                    <div>
                        <p>Amount</p>
                        <input value={ newInfor.amount } onChange={(e) => handleInput(e, 'amount')} placeholder="Amount" />
                    </div>
                    <div>
                        <p>Sold</p>
                        <input value={ newInfor.sold } onChange={(e) => handleInput(e, 'sold')} placeholder="Sold" />
                    </div>
                    <div>
                        <p>Remain</p>
                        <input value={ newInfor.remain } onChange={(e) => handleInput(e, 'remain')} placeholder="Remain" />
                    </div>
                    <div>
                        <p>Recover</p>
                        <input value={ newInfor.recover } onChange={(e) => handleInput(e, 'recover')} placeholder="Recover" />
                    </div>
                    <div>
                        <p>Turnover</p>
                        <input value={ newInfor.turnover } onChange={(e) => handleInput(e, 'turnover')} placeholder="Turnover" />
                    </div>
                    <div>
                        <p>Return</p>
                        <input value={ newInfor.return } onChange={(e) => handleInput(e, 'return')} placeholder="Return" />
                    </div>
                    <div>
                        <p>Consultant Cost</p>
                        <input value={ newInfor.consultantCost } onChange={(e) => handleInput(e, 'consultantCost')} placeholder="Return" />
                        <p>%</p>
                    </div>
                    <div>
                        <p>Price</p>
                        <input value={ newInfor.price } onChange={(e) => handleInput(e, 'price')} placeholder="Return" />
                    </div>
                    <div>
                        <p>Discount</p>
                        <input value={ newInfor.discount } onChange={(e) => handleInput(e, 'discount')} placeholder="Return" />
                    </div>
                    <div>
                        <p>Note</p>
                        <input value={ newInfor.note } onChange={(e) => handleInput(e, 'note')} placeholder="Note" />
                    </div>
                    <button className='DepartmentCreate-btnCreate' onClick={() => handleCreate()}>Create</button>
                    <div className='DepartmentCreate-btnEdit'>
                        <i>Goto edit</i>
                        <AiOutlineArrowRight onClick={() => handleGotoEdit()} size={ 25 } />
                    </div>
                </div>
            </div>
            <DepartmentCreateDialog message={dialogMsg} textColor={msgColor} />
        </div>
    )
}

export default DepartmentCreate;