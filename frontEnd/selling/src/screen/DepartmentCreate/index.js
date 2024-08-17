import React, { useState } from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import { AiOutlineArrowRight } from "react-icons/ai";

import Header from "screen/Header";
import { isVietkey } from 'utilize/StringValidate';

const DepartmentCreate = () => {

    const navigate = useNavigate();

    const [newInfor, setNewInfor] = useState({
        name: '',
        title: '',
        amount: 0,
        sold: 0,
        remain: 0,
        recover: 0,
        turnover: 0, 
        return: 0,
        note: ''
    });

    const handleInput = (e, type) => {
        const value = e.target.value;
        const valueInter = value.length > 0 ? parseInt(value) : 0;
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
                    Number.isInteger(valueInter) && valueInter > -1 && setNewInfor({
                        ...newInfor,
                        amount: valueInter
                    })
                    break;
                case 'sold':
                    Number.isInteger(valueInter) && valueInter > -1 && setNewInfor({
                        ...newInfor,
                        sold: valueInter
                    })
                    break;
                case 'remain':
                    Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                        ...newInfor,
                        remain: valueInter
                    })
                    break;
                case 'recover':
                    Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                        ...newInfor,
                        recover: valueInter
                    })
                    break;
                case 'turnover':
                    Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                        ...newInfor,
                        turnover: valueInter
                    })
                    break;
                case 'return':
                    Number.isInteger(valueInter) && valueInter > 0 && setNewInfor({
                        ...newInfor,
                        return: valueInter
                    })
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

    return (
        <div className='DepartmentCreate'>
            <Header />
            <div className='DepartmentCreate-main'>
                <div className='DepartmentCreate-center'>
                    <h3>Create depatment</h3>
                    <div>
                    <label htmlFor="department-groups">Choose a department group:</label>
                    <select name="department-groups" id="department-groups">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
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