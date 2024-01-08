import React, { memo, useState } from 'react';
import './styles.css';

import { TiDeleteOutline } from 'react-icons/ti';

import { $$ } from 'utilize/Tricks';

const CaseRecordCreateImage = ({ index, onData, setDatas, onHandleDeleteImage }) => {
    const [title, setTitle] = useState(() => {
        if (onData?.title) {
            return onData?.title;
        } 
        return '';
    });
    const [customing, setCustoming] = useState(true);

    const handleAddTitle = () => {
        const q_image = $$('.CaseRecordCreateImage')[index].children[1];
        q_image.classList.add('show');
    }

    const handleCancelTitle = () => {
        const q_image = $$('.CaseRecordCreateImage')[index].children[1];
        q_image.classList.remove('show');
    }

    const handleChangeTitle = (e) => {
        const value = e.target.value;
        setTitle(value)
    }

    const handleCustom = () => {
        setCustoming(true);
    }

    const handleOk = () => {
        setCustoming(false);
        setDatas(pre => {
            const datasCp = [...pre];
            datasCp[index].title = title.trim();
            return datasCp;
        });
    }

    return (
        <div className='CaseRecordCreateImage'>
            <TiDeleteOutline size={20} onClick={() => onHandleDeleteImage()} title='Delete Image' />
            <img src={ onData.blob } alt=''/>
            <button onClick={() => handleAddTitle()} title='Add title for image'>Add title</button>
            {customing && <input value={ title } onChange={(e) => handleChangeTitle(e)} /> }
            {!customing && <span>{ onData.title }</span>}
            <div>
                <div>
                    {!customing && <button className='CaseRecordCreateImage-custom' onClick={() => handleCustom()}>Custom</button> }
                    {customing && <button className='CaseRecordCreateImage-ok' onClick={() => handleOk()}>Ok</button> }
                    {!customing && <button className='CaseRecordCreateImage-del'>Delete</button> }
                    <button className='CaseRecordCreateImage-cancel' onClick={() => handleCancelTitle()}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordCreateImage);