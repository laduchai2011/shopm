import React from 'react';
import './styles.css';

import { $$ } from 'utilize/Tricks';

export const setToasMessage = (type, index) => {
    const q_ToastMessage = $$('.ManageMedicationTableBottomToastMessage');

        if (type) {
            switch(type) {
                case 'registerSelling':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-registerSelling');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-registerSelling');
                    }, 5000)
                    break;
                case 'registerSellingSuccessly':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-registerSellingSuccessly');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-registerSellingSuccessly');
                    }, 5000)
                    break;
                case 'registerSellingFailure':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-registerSellingFailure');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-registerSellingFailure');
                    }, 5000)
                    break;
                case 'stopSelling':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-stopSelling');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-stopSelling');
                    }, 5000)
                    break;
                case 'stopSellingSuccessly':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-stopSellingSuccessly');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-stopSellingSuccessly');
                    }, 5000)
                    break;
                case 'stopSellingFailure':
                    q_ToastMessage[index].classList.add('ManageMedicationTableBottomToastMessage-stopSellingFailure');
                    setTimeout(() => {
                        q_ToastMessage[index].classList.remove('ManageMedicationTableBottomToastMessage-stopSellingFailure');
                    }, 5000)
                    break;
                default:
                    throw new Error('Invalid parameter !');
            }
        }
}

const ManageMedicationTableBottomToastMessage = () => {
    return (
        <div className='ManageMedicationTableBottomToastMessage'>
            <div />
        </div>
    )
}

export default ManageMedicationTableBottomToastMessage;