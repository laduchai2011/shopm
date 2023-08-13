import React, { useState, useEffect, memo } from "react";
import './styles.css';

const DoctorPharmacistReadyServiceToastMessage = ({time, onCallback}) => {
    
    const [timeCount, setTimeCount] = useState(0); 
    const [note, setNote] = useState();

    useEffect(() => {
        setTimeCount(time);
        setNote(`Please wait in ${time}s !`);
        const toastMessageOverlay = document.querySelector('.DoctorPharmacistReadyServiceToastMessage');
        toastMessageOverlay.style.setProperty('--time', time);
        const intervalCount = setInterval(() => {
            setTimeCount(pre => {
                if (pre <= 1) {
                    clearInterval(intervalCount);
                    setNote('Book failure.');
                }
                return pre - 1;
            });
            
        }, 1000)

        return () => {
            clearInterval(intervalCount);
        }

    }, [time])

    const handleExitToastMessage = (e) => {
        const toastMessageOverlay = document.querySelector('.DoctorPharmacistReadyServiceToastMessage');
        const toastMessageDialog = document.querySelector('.DoctorPharmacistReadyServiceToastMessage-dialog');

        if (e.target === e.currentTarget) {
            toastMessageOverlay.classList.remove('DoctorPharmacistReadyServiceToastMessage-show');
            toastMessageDialog.classList.remove('DoctorPharmacistReadyServiceToastMessage-dialog-show');

            setTimeout(() => {
                toastMessageDialog.style.display = 'none';
            }, [300])

            onCallback();
        }
    }
    return ( 
        <div className="DoctorPharmacistReadyServiceToastMessage" onClick={(e) => handleExitToastMessage(e)}>
            <div className="DoctorPharmacistReadyServiceToastMessage-dialog">
                <div className="DoctorPharmacistReadyServiceToastMessage-circle">
                    <div className="DoctorPharmacistReadyServiceToastMessage-rectangleContainer">
                        <div className="DoctorPharmacistReadyServiceToastMessage-rectangle1">
                            <div className="DoctorPharmacistReadyServiceToastMessage-smallRectangle1"/>
                        </div>
                        <div className="DoctorPharmacistReadyServiceToastMessage-rectangle2">
                            <div className="DoctorPharmacistReadyServiceToastMessage-smallRectangle2"/>
                        </div>
                        <div className="DoctorPharmacistReadyServiceToastMessage-rectangle3">
                            <div className="DoctorPharmacistReadyServiceToastMessage-smallRectangle3"/>
                        </div>
                        <div className="DoctorPharmacistReadyServiceToastMessage-rectangle4">
                            <div className="DoctorPharmacistReadyServiceToastMessage-smallRectangle4"/>
                        </div>
                    </div>
                    <div className="DoctorPharmacistReadyServiceToastMessage-smallCircle">
                        <span>{ timeCount }</span>
                    </div>
                </div>
                <div className="DoctorPharmacistReadyServiceToastMessage-note">
                    <span>{ note }</span>
                </div>
            </div>
        </div>
    )
}

export default memo(DoctorPharmacistReadyServiceToastMessage);