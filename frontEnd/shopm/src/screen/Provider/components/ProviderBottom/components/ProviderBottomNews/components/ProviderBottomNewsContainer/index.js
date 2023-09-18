import React, { useContext, useEffect } from "react";
import './styles.css';

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 
import { HiDotsHorizontal } from 'react-icons/hi'; 

import { ThemeContextApp } from 'utilize/ContextApp';
import { $$ } from "utilize/Tricks";
import { Timestamp } from "utilize/Timestamp";


const ProviderBottomNewsContainer = ({ onData, index }) => {
    const news = onData;

    const provider = JSON.parse(window.sessionStorage.getItem('providerData'));

    const { clickDocument } = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        $$('.ProviderBottomNewsContainer-news')[index].innerHTML = news.news;
    }, [news.news, index])

    const handleHiddenPost = () => {
        const queryContent = $$('.ProviderBottomNewsContainer-news');
        queryContent[index].style.display = 'none';
    }

    const handleRemoveHiddenPost = () => {
        const queryContent = $$('.ProviderBottomNewsContainer-news');
        queryContent[index].style.display = 'block';
    }

    const toggleOptions = (e) => {
        e.stopPropagation();
        const queryOptions = document.querySelectorAll('.ProviderBottomNewsContainer-options-dialog');
        queryOptions[index].classList.toggle('show');
        clickDocument.pushElement(queryOptions[index]);
    }

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
                <BsStar key={index} size={15} color="red" /> : <>{
                    isIntergerRange(0.25, 0.75, averageRating - data1) ? 
                    <BsStarHalf key={index} size={15} color="red" /> : <>{
                        isIntergerRange(0.75, 1, averageRating - data1) ? 
                        <BsStarFill key={index} size={15} color="red" /> : <>{
                            isIntergerRange(1, 5, averageRating - data1) ?
                            <BsStarFill key={index} size={15} color="red" /> : 
                            <BsStar key={index} size={15} color="red" />
                        }</>
                    }</>
                }</> 
            }
            </div>
        )
    })

    return (
        <div className="ProviderBottomNewsContainer">
            <div className="ProviderBottomNewsContainer-top">
                <div className="ProviderBottomNewsContainer-avatarContainer">
                    <img src={ provider.avatar.length > 0 ? provider.avatar : 'https://tse3.mm.bing.net/th?id=OIP.JZBTJtNF8UwcrOQhh-UgogAAAA&pid=Api&P=0&h=180' } alt=""/>
                    <div className="ProviderBottomNewsContainer-avatarContainer-text">
                        <span className="ProviderBottomNewsContainer-name"> { provider.name } </span>
                        <span className="ProviderBottomNewsContainer-followed">Followed: { provider.follow } / Posted: { Timestamp(news.createdAt) }</span>
                        <div className="ProviderBottomNewsContainer-star">
                            { list_star }
                        </div>
                    </div>
                </div>
                <div className="ProviderBottomNewsContainer-options">   
                    <div className="ProviderBottomNewsContainer-options-dialog">
                        <div className="ProviderBottomNewsContainer-option">Delete</div>
                        <div className="ProviderBottomNewsContainer-option">Change</div>
                        <div className="ProviderBottomNewsContainer-option" onClick={() => handleHiddenPost()}>Hidden</div>
                        <div className="ProviderBottomNewsContainer-option" onClick={() => handleRemoveHiddenPost()}>Remove hidden</div>
                    </div>
                    <HiDotsHorizontal size={25} onClick={(e) => toggleOptions(e)} />
                </div>
            </div>
            <div className="ProviderBottomNewsContainer-center">
                <div className="ProviderBottomNewsContainer-news" />
                <div className="ProviderBottomNewsContainer-text1">
                    <span>Like : { news.like }</span>
                    <span>Comments : { news.comment }</span>
                    <span>Share : { news.share }</span>
                </div>
            </div>
            <div className="ProviderBottomNewsContainer-bottom">
                <div>Like</div>
                <div>Comment</div>
                <div>Share</div>
            </div>
        </div>
    )
}

export default ProviderBottomNewsContainer;