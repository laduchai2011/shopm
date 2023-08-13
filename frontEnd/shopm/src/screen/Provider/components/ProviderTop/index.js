import React, { useLayoutEffect, useContext, useState, useEffect, memo } from "react";
import './styles.css';

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 
import { MdOutlineAddCircleOutline } from 'react-icons/md';
import { IoMdAdd } from 'react-icons/io';

import { ProviderContext } from "screen/Provider/utilize/ProviderContext"; 
import { SERVER_ADDRESS_GET_PROVIDER } from "config/server";
import { $ } from "utilize/Tricks";
import { getCookie } from "auth/cookie";

const ProviderTop = () => {
    const navigate = useNavigate();
    const providerStore = useContext(ProviderContext);
    const uuid_provider = providerStore?.uuid_provider;
    const setGetprovider = providerStore?.setGetprovider;
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
            // console.log(resData)
            if (resData?.hacked) {
                alert(resData.message);
            }
            window.sessionStorage.setItem("providerData", JSON.stringify(resData.provider));
            const newData = {...resData.provider};
            newData.role = getCookie('providerRole');
            newData.loadData = true;
            setGetprovider(true);
            setData(newData);
        }).catch(error => console.error(error))
    }, [uuid_provider, setGetprovider])

    useLayoutEffect(() => {
        if (data.loadData) {
            const qProviderTopLoading = $('.ProviderTop');
            qProviderTopLoading.classList.remove('ProviderTop-loading');
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
                <BsStar key={index} size={25} color="red" /> : <>{
                    isIntergerRange(0.25, 0.75, averageRating - data1) ? 
                    <BsStarHalf key={index} size={25} color="red" /> : <>{
                        isIntergerRange(0.75, 1, averageRating - data1) ? 
                        <BsStarFill key={index} size={25} color="red" /> : <>{
                            isIntergerRange(1, 5, averageRating - data1) ?
                            <BsStarFill key={index} size={25} color="red" /> : 
                            <BsStar key={index} size={25} color="red" />
                        }</>
                    }</>
                }</> 
            }
            </div>
        )
    })

    return (
        <div className="ProviderTop ProviderTop-loading">
            <div className="ProviderTop-bannerContainer">
                <img className="ProviderTop-banner" src={ data.banner.length > 0 ? data.banner : 'https://tse4.mm.bing.net/th?id=OIP.VoXO6QAJnMcud_Oig38WBQHaB2&pid=Api&P=0&h=180'} alt=""/>
                { data.role === 'admin' && <div className="ProviderTop-btnBanner" onClick={() => navigate('/provider/setting/register/change')}>
                    <IoMdAdd className="ProviderTop-btnBanner-icon" size={25} color="red" />
                    <div>Change Banner</div>
                </div> }
            </div>
            <div className="ProviderTop-avatarContainer">
                <div className="ProviderTop-avatar">
                    <div className="ProviderTop-avatar-imgContainer">
                        <img src={ data.avatar.length > 0 ? data.avatar : 'https://tse3.mm.bing.net/th?id=OIP.JZBTJtNF8UwcrOQhh-UgogAAAA&pid=Api&P=0&h=180'} alt=""/>
                        { data.role === 'admin' && <MdOutlineAddCircleOutline onClick={() => navigate('/provider/setting/register/change')} size={35} color="red" /> }
                    </div>
                    <div className="ProviderTop-name">
                        <div>{ data.name }</div>
                        <span>{ `Followed: ${data.follow}` }</span>
                        <div>
                            { list_star }
                        </div>
                    </div>
                </div>
                <div className="ProviderTop-btnContainer">
                    { data.role !== 'admin' && <>
                        <button>Chat Now</button>
                        <button>Follow</button>
                    </> }
                </div>
            </div>
        </div>
    )
}

export default memo(ProviderTop);