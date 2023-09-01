import React from 'react';
import './styles.css';

import { useNavigate } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

import { Timestamp } from 'utilize/Timestamp';

const ProviderListBox = ({ onData }) => {
    const navigate = useNavigate();

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
        const averageRating = onData.averageRating;
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
        <div className='ProviderListBox'>
            <div className='ProviderListBox-bannerContainer' onClick={() => navigate(`/provider/${onData.uuid_provider}`)}>
                <img src={ onData.banner.length > 0 ? onData.banner : 'https://tse4.mm.bing.net/th?id=OIP.VoXO6QAJnMcud_Oig38WBQHaB2&pid=Api&P=0&h=180' } alt='' />
                <div className='ProviderListBox-bannerOverlay'>
                    <div><strong>Go to provider</strong></div>
                </div>
            </div>
            <div className='ProviderListBox-infor'>
                <img src={ onData.avatar.length > 0 ? onData.avatar : 'https://tse3.mm.bing.net/th?id=OIP.JZBTJtNF8UwcrOQhh-UgogAAAA&pid=Api&P=0&h=180' } alt='' />
                <div className='ProviderListBox-infor1'>
                    <div className='ProviderListBox-name'>{ onData.name }</div>
                    <div className='ProviderListBox-listStar'>
                        { list_star }
                    </div>
                    <span>{ `Followed: ${ onData.follow } / ${ Timestamp(onData.createdAt) }` }</span>
                </div>
                <div className='ProviderListBox-infor2'>
                    <div>Edit</div>
                </div>
            </div>
        </div>
    )
}

export default ProviderListBox;