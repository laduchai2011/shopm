import React, { useState, useEffect, useLayoutEffect } from 'react';
import './styles.css';

import { useParams } from 'react-router-dom';
import axios from 'axios';

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 

import { getCookie } from 'auth/cookie';
import { Timestamp } from 'utilize/Timestamp';
import { SERVER_ADDRESS_GET_PROVIDER } from 'config/server';
import { $ } from 'utilize/Tricks';

const ManageMedicationHeader = () => {

    const {id: uuid_provider} = useParams();

    const [data, setData] = useState({
        name: 'defaut name',
        avatar: '',
        banner: '',
        follow: 0,
        averageRating: 0, 
        role: 'normal', 
        loadData: false
    });

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDER}/${uuid_provider}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData?.hacked) {
                alert(resData.message);
            }
            const newData = {...resData.provider};
            newData.role = getCookie('providerRole');
            newData.loadData = true;
            setData(newData);
        }).catch(error => console.error(error))
    }, [uuid_provider])

    useLayoutEffect(() => {
        if (data.loadData) {
            const qProviderTopLoading = $('.ManageMedicationHeader');
            qProviderTopLoading.classList.remove('ManageMedicationHeader-loading');
        }
    }, [data])

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
        const averageRating = data.averageRating;
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
        <div className='ManageMedicationHeader ManageMedicationHeader-loading'>
            <div className='ManageMedicationHeader-avatar'>
                <img src={ data.avatar.length > 0 ? data.avatar : 'https://tse3.mm.bing.net/th?id=OIP.JZBTJtNF8UwcrOQhh-UgogAAAA&pid=Api&P=0&h=180'} alt=""/>
            </div> 
            <div className='ManageMedicationHeader-infor'>
                <div>{ data.name }</div>
                <div>{ `Follow: ${data.follow} / ${ Timestamp(data.createdAt) }` }</div>
                <div>{ list_star }</div>
            </div>
        </div>
    )
}

export default ManageMedicationHeader;