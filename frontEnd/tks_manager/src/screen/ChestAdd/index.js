import React, { useContext, useState } from "react";
import './styles.css';

import { ThemeContextApp } from "utilize/ContextApp";
import axios from "axios";

import { 
    SERVER_ADDRESS_CREATE_CHEST,
    SERVER_ADDRESS_CREATE_CHEST_TO_SHOPM
} from "config/server";

const ChestAdd = () => {
    const { loginInfor } = useContext(ThemeContextApp);

    const [inforInput, setInforInput] = useState({
        name: "",
        title: "",
        type: "",
        size: "",
        maxAmount: "",
        note: "",
        status: "",
        uuid_departmentChest: '',
        uuid_chestGroup: ''
    });
    const [selectedChestGroup, setSelectedChestGroup] = useState('');
    const [message, setMessage] = useState('');

    const handleInput = (e, type) => {
        const value = e.target.value;

        switch(type) {
            case 'name':
                setInforInput({
                    ...inforInput,
                    name: value
                })
                break;
            case 'title':
                setInforInput({
                    ...inforInput,
                    title: value
                })
                break;
            case 'type':
                setInforInput({
                    ...inforInput,
                    type: value
                })
                break;
            case 'size':
                setInforInput({
                    ...inforInput,
                    size: value
                })
                break;
            case 'maxAmount':
                setInforInput({
                    ...inforInput,
                    maxAmount: value
                })
                break;
            case 'note':
                setInforInput({
                    ...inforInput,
                    note: value
                })
                break;
            default:
        }
    }

    const handleSelectChestGroup = (e) => {
        setSelectedChestGroup(e.target.value);
    }

    const handleAdd = () => {
        if (selectedChestGroup.length > 0) {
            axios({
                method: 'post',
                url: SERVER_ADDRESS_CREATE_CHEST,
                withCredentials: true,
                data: {
                    chestOptions : {
                        name: inforInput.name,
                        title: inforInput.title,
                        type: inforInput.type,
                        size: inforInput.size,
                        maxAmount: inforInput.maxAmount,
                        note: inforInput.note,
                        status: 'no ready',
                        uuid_departmentChest: null,
                        uuid_chestGroup: selectedChestGroup
                    }
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => {
                const resData = res.data;
                if (resData?.success) {
                    const resChest = {
                        uuid_chest: resData.chest.uuid_chest,
                        name: resData.chest.name,
                        title: resData.chest.title,
                        type: resData.chest.type,
                        size: resData.chest.size,
                        maxAmount: resData.chest.maxAmount,
                        note: resData.chest.note,
                        status: 'no ready',
                        uuid_departmentChest: null,
                        uuid_chestGroup: resData.chest.uuid_chestGroup
                    } 
                    setMessage(`${resData?.message}. Let WAIT for update chest to shopm ..........`);
                    setTimeout(() => {
                        addToShopm(resChest);
                    }, 3000)
                } else {
                    console.log(resData?.message);
                }
            }).catch(error => console.error(error))
        } else {
            alert('Let select a chest group !');
        }
    }

    const addToShopm = (chestOptions) => {
        axios({
            method: 'post',
            url: SERVER_ADDRESS_CREATE_CHEST_TO_SHOPM,
            withCredentials: true,
            data: {
                chestOptions : chestOptions
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            if (resData?.success) {
                setMessage(`${resData?.message}. FINISH creating chest.`);
            } else {
                console.log(resData?.message);
            }
        }).catch(error => console.error(error))
    }

    return (
        loginInfor!==null && <div className='Chest'>
            <div className="Chest-main">
                <h4>Add chest</h4>
                <div className="Chest-form">
                    <div>
                        <div>Chest group:</div>
                        <input value={ selectedChestGroup } onChange={(e) => handleSelectChestGroup(e)} placeholder="Selected chest group" />
                    </div>
                    <div>
                        <div>Name:</div>
                        <input value={ inforInput.name } onChange={(e) => handleInput(e, "name")} placeholder="Name" />
                    </div>
                    <div>
                        <div>Title:</div>
                        <input value={ inforInput.title } onChange={(e) => handleInput(e, "title")} placeholder="Title" />
                    </div>
                    <div>
                        <div>Type:</div>
                        <input value={ inforInput.type } onChange={(e) => handleInput(e, "type")} placeholder="Type" />
                    </div>
                    <div>
                        <div>Size:</div>
                        <input value={ inforInput.size } onChange={(e) => handleInput(e, "size")} placeholder="Size" />
                    </div>
                    <div>
                        <div>Max amount:</div>
                        <input value={ inforInput.maxAmount } onChange={(e) => handleInput(e, "maxAmount")} placeholder="Max amount" />
                    </div>
                    <div>
                        <div>Note:</div>
                        <textarea value={ inforInput.note } onChange={(e) => handleInput(e, "note")} placeholder="Note" />
                    </div>
                    <div>
                        <button onClick={() => handleAdd()}>Add chest</button>
                    </div>
                    <div>
                        <p>{ message }</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChestAdd;