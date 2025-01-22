import React, { FC, useRef } from 'react';
import './styles.css';

import AddCircle from 'src/components/Icon/AddCircle';
import SubCircle from 'src/components/Icon/SubCircle';


const ADD_COLOR = 'rgb(0, 255, 232)';
const SUB_COLOR = 'rgb(255, 240, 0)';

const AddSub: FC<{}> = () => {

    const addSubElement = useRef<HTMLDivElement | null>(null);

    if (addSubElement.current) {
        addSubElement.current.style.setProperty('--add-color', ADD_COLOR);
        addSubElement.current.style.setProperty('--sub-color', SUB_COLOR);
    }
    

    const input_change = (e: React.ChangeEvent<HTMLInputElement>) => {

    }
    
    return <div className="TKS-AddSub" ref={addSubElement}>
        <div>
            <SubCircle subCircle={{size: 23, background: SUB_COLOR}} />
            <input 
                onChange={(e) => input_change(e)}
            />
            <AddCircle addCircle={{size: 23, background: ADD_COLOR}}/>
        </div>
    </div>
};

export default AddSub;