import React, { FC, useRef, useEffect } from 'react';
import './styles.css';

import AddCircle from 'src/components/Icon/AddCircle';
import SubCircle from 'src/components/Icon/SubCircle';

import moneyString from 'src/utils/moneyString';

const ADD_COLOR = 'rgb(0, 255, 232)';
const SUB_COLOR = 'rgb(255, 240, 0)';

const CalculateMoney: FC<{}> = () => {

    const addSubElement = useRef<HTMLDivElement | null>(null);

    if (addSubElement.current) {
        addSubElement.current.style.setProperty('--add-color', ADD_COLOR);
        addSubElement.current.style.setProperty('--sub-color', SUB_COLOR);
    }

    useEffect(() => {
       
    }, [])
    
    const moneyString_ = moneyString({
        numberString: '987977097908', 
        alias_list: ['K', 'TR', 'T', 'KT'], 
        money_type: 'VND',
        isLog: true
    })

    // console.log(moneyString_)

    const input_change = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handleSub = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log(222222222222)
    }
    
    return <div className="TKS-CalculateMoney" ref={addSubElement}>
        <div>
            <SubCircle subCircle={{size: 23, background: SUB_COLOR}} onClick={(e) => handleSub(e)} />
            <input 
                value={moneyString_.clusted_rounded_numberString} 
                title={moneyString_.clusted_string} 
                onChange={(e) => input_change(e)}
            />
            <div className='TKS-CalculateMoney--'><strong>-</strong></div>
            <div className='TKS-CalculateMoney-text'>{`${moneyString_.clusted_rounded_numberString} ${moneyString_.alias_string.alias}`}</div>
            <div className='TKS-CalculateMoney--'><strong>-</strong></div>
            <div className='TKS-CalculateMoney-text'>{`${moneyString_.clusted_rounded_numberString} ${moneyString_.alias_string.alias}`}</div>
            <AddCircle addCircle={{size: 23, background: ADD_COLOR}}/>
        </div>
    </div>
};

export default CalculateMoney;