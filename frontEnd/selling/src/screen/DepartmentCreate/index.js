import React, { useState, useEffect } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import { AiOutlineArrowRight } from "react-icons/ai";

import Header from "screen/Header";
import { isVietkey } from 'utilize/StringValidate';
import { isFloat, isInteger } from 'utilize/CheckString';
import { getCookie } from 'auth/cookie';
import { PROVIDER_CONST } from 'utilize/constant';

import { useReadAllDepartmentGroupQuery } from 'reduxStore/RTKQuery/departmentGroupRTKQuery';

const DepartmentCreate = () => {

    const navigate = useNavigate();

    const [newInfor, setNewInfor] = useState({
        name: '',
        title: '',
        amount: '',
        sold: 0,
        remain: 0,
        recover: 0,
        turnover: 0, 
        return: 0,
        price: 0,
        discount: 0,
        firstTime: '',
        lastTime: '',
        note: '',
        status: 'normal',
        uuid_medication: '',
        uuid_chest: '',
        uuid_departmentGroup: ''
    });

    const selectedProvider_cookie = JSON.parse(getCookie(PROVIDER_CONST.SELECTED_PROVIDER));
    const [departmentGroupAll, setDepartmentGroupAll] = useState([]);

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
                    isInteger(value) && setNewInfor({
                        ...newInfor,
                        amount: value,
                        remain: value
                    })
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
                case 'price':
                    // console.log((Number.isInteger(valueInter) && valueInter > -1), isFloat(value))
                    if (isInteger(value) || isFloat(value)) {
                        setNewInfor({
                            ...newInfor,
                            price: value
                        })
                    }   
                    break;
                case 'discount':
                    if (isInteger(value) || isFloat(value)) {
                        setNewInfor({
                            ...newInfor,
                            discount: value
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

    const handleGotoEdit = () => {
        navigate('/department/edit');
    }

    const list_departmentGroup = departmentGroupAll.map((data, index) => {
        return (
            <option key={index} value={`${data?.uuid_provider}`}>{ data?.name }</option>
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
                                <option value="saab">Saab</option>
                                <option value="mercedes">Mercedes</option>
                                <option value="audi">Audi</option>
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
                    <button className='DepartmentCreate-btnCreate'>Create</button>
                    <div className='DepartmentCreate-btnEdit'>
                        <i>Goto edit</i>
                        <AiOutlineArrowRight onClick={() => handleGotoEdit()} size={ 25 } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentCreate;