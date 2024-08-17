import React, { useState } from 'react';
import './styles.css';

import Header from "screen/Header";
import { isVietkey } from 'utilize/StringValidate';

const DepartmentEdit = () => {

    const [infor, setInfor] = useState({
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
                case 'amount':
                    Number.isInteger(valueInter) && valueInter > -1 && setInfor({
                        ...infor,
                        amount: valueInter
                    })
                    break;
                case 'sold':
                    Number.isInteger(valueInter) && valueInter > -1 && setInfor({
                        ...infor,
                        sold: valueInter
                    })
                    break;
                case 'remain':
                    Number.isInteger(valueInter) && valueInter > 0 && setInfor({
                        ...infor,
                        remain: valueInter
                    })
                    break;
                case 'recover':
                    Number.isInteger(valueInter) && valueInter > 0 && setInfor({
                        ...infor,
                        recover: valueInter
                    })
                    break;
                case 'turnover':
                    Number.isInteger(valueInter) && valueInter > 0 && setInfor({
                        ...infor,
                        turnover: valueInter
                    })
                    break;
                case 'return':
                    Number.isInteger(valueInter) && valueInter > 0 && setInfor({
                        ...infor,
                        return: valueInter
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
    }

    return (
        <div className='DepartmentEdit'>
            <Header />
            <div className='DepartmentEdit-main'>
                <div className='DepartmentEdit-center'>
                    <h3>Create depatment</h3>
                    <div>
                    <label htmlFor="departments">Choose a department:</label>
                    <select name="departments" id="departments">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                    </div>
                    <div>
                        <p>Name</p>
                        <input value={ infor.name } onChange={(e) => handleInput(e, 'name')} placeholder="Name" />
                    </div>
                    <div>
                        <p>Title</p>
                        <input value={ infor.title } onChange={(e) => handleInput(e, 'title')} placeholder="Title" />
                    </div>
                    <div>
                        <p>Amount</p>
                        <input value={ infor.amount } onChange={(e) => handleInput(e, 'amount')} placeholder="Amount" />
                    </div>
                    <div>
                        <p>Sold</p>
                        <input value={ infor.sold } onChange={(e) => handleInput(e, 'sold')} placeholder="Sold" />
                    </div>
                    <div>
                        <p>Remain</p>
                        <input value={ infor.remain } onChange={(e) => handleInput(e, 'remain')} placeholder="Remain" />
                    </div>
                    <div>
                        <p>Recover</p>
                        <input value={ infor.recover } onChange={(e) => handleInput(e, 'recover')} placeholder="Recover" />
                    </div>
                    <div>
                        <p>Turnover</p>
                        <input value={ infor.turnover } onChange={(e) => handleInput(e, 'turnover')} placeholder="Turnover" />
                    </div>
                    <div>
                        <p>Return</p>
                        <input value={ infor.return } onChange={(e) => handleInput(e, 'return')} placeholder="Return" />
                    </div>
                    <div>
                        <p>Note</p>
                        <input value={ infor.note } onChange={(e) => handleInput(e, 'note')} placeholder="Note" />
                    </div>
                    <button className='DepartmentEdit-btnEdit'>Edit</button>
                </div>
            </div>
        </div>
    )
}

export default DepartmentEdit;