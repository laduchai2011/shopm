import React, { useContext, useEffect, memo, useState } from "react";
import './styles.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 

import { MedicationContext } from "screen/Medication/MedicationContext";
import { Timestamp } from "utilize/Timestamp";
import { SERVER_ADDRESS_GET_PROVIDER } from "config/server";

const MedicationProvider = () => {
    const navigate = useNavigate();
    const { medicationSate } = useContext(MedicationContext);

    const [provider, setProvider] = useState({
            name: '', 
            avatar: '',
            follow: 0,
            averageRating: 0
        });

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDER}/${medicationSate.uuid_provider}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData.success) {
                setProvider(resData.provider);
            } else {
                alert(resData.message);
            }
        }).catch(error => console.error(error))
    }, [medicationSate.uuid_provider])

    const isIntergerRange = (fistInt, lastInt, averageInt) => {
        if (averageInt >= 0) {
            if ((fistInt <= averageInt) && (averageInt < lastInt)) {
                return true;
            } 
            return false
        }
        return false;
    } 

    const list_star = [0,1,2,3,4].map((data1, index) => {
        const averageRating = provider.averageRating;
        return (
            <div key={index}>
            {
                isIntergerRange(0, 0.25, averageRating - data1) ? 
                <BsStar key={index} size={20} color="red" /> : <>{
                    isIntergerRange(0.25, 0.75, averageRating - data1) ? 
                    <BsStarHalf key={index} size={20} color="red" /> : <>{
                        isIntergerRange(0.75, 1, averageRating - data1) ? 
                        <BsStarFill key={index} size={20} color="red" /> : <>{
                            isIntergerRange(1, 5, averageRating - data1) ?
                            <BsStarFill key={index} size={20} color="red" /> : 
                            <BsStar key={index} size={20} color="red" />
                        }</>
                    }</>
                }</> 
            }
            </div>
        )
    })

    return (
        <div className="MedicationProvider">
            <div className="MedicationProvider-avatarContainer" onClick={() => navigate(`/provider/${ medicationSate.uuid_provider }`)}>
                <img src={provider.avatar.length > 0 ? provider.avatar : 'https://tse3.mm.bing.net/th?id=OIP.JZBTJtNF8UwcrOQhh-UgogAAAA&pid=Api&P=0&h=180' } alt=""/>
                <div className="MedicationProvider-inforContainer">
                    <div className="MedicationProvider-name">{ provider.name }</div>
                    <div className="MedicationProvider-listStar">{ list_star }</div>
                    <div>Follow: { provider.follow }/ Timer: { Timestamp(provider.createdAt) }</div>
                </div>
            </div>
            <div className="MedicationProvider-btnContainer">
                <div className="MedicationProvider-btn">
                    <button>Chat</button>
                    <button>Follow</button>
                </div>
            </div>
        </div>
    )
}

export default memo(MedicationProvider);