import React from 'react';
import './styles.css';

import { useSelector, useDispatch } from 'react-redux';

import Overlay from 'screen/Overlay';
import { TiDelete  } from "react-icons/ti";

import { setShowDialog } from 'reduxStore/slice/departmentGroupSlice';

const DepartmentGroupCreateDialog = ({message, textColor}) => {
    const dispatch = useDispatch();

    const showDialog = useSelector(state => state.departmentGroupSlice.showDialog);

    const handleTextMessage = (textColor) => {
        let textColor_m = '';
        switch(textColor) {
            case 'red':
                textColor_m =  'textRedColor';
                break;
            case 'blue':
                textColor_m = 'textBlueColor';
                break;
            default:
        }

        return textColor_m;
    }

    const handleCloseDialog = () => {
        dispatch(setShowDialog({showDialog: false}));
    }

    return (
        <div className='DepartmentGroupCreateDialog'>
            <Overlay show={ showDialog }>
                <div>
                    <div>
                        <TiDelete onClick={() => handleCloseDialog()} size={ 25 } />
                    </div>
                    <div className={`${handleTextMessage(textColor)}`}>
                        { message }
                    </div>
                </div>
            </Overlay>
        </div>
    )
}

export default DepartmentGroupCreateDialog;