import React, { memo } from "react";
import './styles.css';

const HomeBottomMedication = ({onData}) => {

    const handleGotoMedication = () => {
        window.open(`/medication/${onData.uuid_medication}`, 'rel=noopener noreferrer')
    }

    return (
        <div className="HomeBottomMedication">
            <div className="HomeBottomMedication-imgContainer">
                <img src={JSON.parse(onData.image).urls[0]} alt="" />
                <div>
                    <span onClick={() => handleGotoMedication()}>See more</span>
                </div>
            </div>
            <p>Name: {onData.name}</p>
            <p>Subject: {onData.subject}</p>
            <p>Object: {onData.object}</p>
            <p>Symptom: {onData.symptom}</p>
            <p>Type: {onData.type}</p>
            <p>{onData.sold}/{onData.amount} : {onData.price} $ : {onData.discount} %</p>
        </div>
    )
}

export default memo(HomeBottomMedication);