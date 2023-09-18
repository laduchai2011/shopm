import React, { useContext, useEffect, useState } from "react";
import './styles.css';

import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { HiDotsHorizontal } from 'react-icons/hi'; 

import { $ } from "utilize/Tricks";
import { ThemeContextApp } from "utilize/ContextApp";
import ProviderBottomNewsContainer from "./components/ProviderBottomNewsContainer";
import { SERVER_ADDRESS_GET_PROVIDER_NEWS_LIST } from "config/server";

/**
*@typedef {
*name: string, 
*avatar: string,
*banner: string,
*follow: integer,
*averageRating: float,
*rateCount: integer
*} providerOptions
*/ 

/**
*@typedef {
*news: text, 
*like: integer,
*comment: integer,
*share: integer,
*status: string,
*uuid_provider: uuid
*} providerNewsOptions 
*/ 

const dataFake = {
    // provider: JSON.parse(window.sessionStorage.getItem('providerData')),
    news: [{
        news: '', 
        like: '',
        comment: '',
        share: '',
        status: '',
        uuid_provider: '',
        createdAt: null
    }], 
    pageIndex: 1,
    pageAmount: 1, 
    pageOffset: 1, 
}

const ProviderBottomNews = () => {

    const { clickDocument } = useContext(ThemeContextApp);

    const navigate = useNavigate();
    const { id: uuid_provider } = useParams();

    const [state, setState] = useState(dataFake);
    const pageSize = 5;

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDER_NEWS_LIST}?uuid_provider=${uuid_provider}&pageIndex=${state.pageIndex}&pageSize=${pageSize}`
        }).then(res => {
            const resData = res.data;
            if (resData.success) {
                setState(pre => {
                    return {
                        ...pre,
                        news: resData.providerNews.rows,
                        pageAmount: handlePageAmount(resData.providerNews.count)
                    }
                })
            } else {
                alert(resData.message);
            }
        }).catch(err => console.error(err))
    }, [uuid_provider, state.pageIndex])

    const handlePageAmount = (count) => {
        if ((count % pageSize) > 0) {
            return Math.floor(count / pageSize) + 1;
        } else {
            return Math.floor(count / pageSize);
        }
    }

    const handleSelectPage = (pageIndex) => { 
        let newPageOffset = state.pageOffset;

        if ((state.pageAmount > 5) && (4 + state.pageOffset < state.pageAmount)) {
            if (pageIndex >= (3 + state.pageOffset)) {
                newPageOffset = state.pageOffset + 1;
            }
        }

        if (state.pageOffset > 1) {
            if (pageIndex <= (state.pageOffset + 1)) {
                newPageOffset = state.pageOffset - 1;
            }
        }

        setState(pre => {
            return {
                ...pre,
                pageIndex : pageIndex,
                pageOffset: newPageOffset
            }
        })
    } 

    const handleSelectMostPage = (type) => {
        if (type === 'first') {
            setState(pre => {
                return {
                    ...pre,
                    pageIndex : 1,
                    pageOffset: 1
                }
            })
        } else if (type === 'last') {
            setState(pre => {
                return {
                    ...pre,
                    pageIndex : pre.pageAmount,
                    pageOffset: pre.pageAmount - 4
                }
            })
        }
        
    }

    const handleOptions = (e) => {
        e.stopPropagation();
        const queryOptions = $('.ProviderBottomNews-options');
        queryOptions.classList.toggle('show');
        clickDocument.pushElement(queryOptions);
    }

    const list_news = state.news.map((data, index) => {
        return (
            <div key={index}>
                <ProviderBottomNewsContainer onData={ data } index={ index } />
            </div>
        )
    })

    const pagArray = [];
    for (let i = 0; i < state.pageAmount; i++) {
        if (i < 5) {
            pagArray.push(i + state.pageOffset);
        }
    }
    const list_pages = pagArray.map((data, index) => {
        const initActive = () => {
            if ((index + state.pageOffset) === (state.pageIndex)) {
                return 'active'
            } else {
                return ''
            }
        }
        return (
            <span key={ index } className={`ProviderBottomNews-page ${initActive()}`} onClick={() => handleSelectPage(data)}>{ data }</span>
        )
    })

    return (
        <div className="ProviderBottomNews"> 
            <div className="ProviderBottomNews-headerContainer">
                <div className="ProviderBottomNews-header">News</div>
                <div className="ProviderBottomNews-optionsContainer">
                    <HiDotsHorizontal onClick={(e) => handleOptions(e)} size={25} />
                    <div className="ProviderBottomNews-options">
                        <div onClick={() => navigate(`/provider/${uuid_provider}/news/add`)}>Add News</div>
                        <div>Delete News</div>
                        <div>Custom News</div>
                    </div>
                </div>
            </div>
            { list_news }
            <div className="ProviderBottomNews-pagination">
                <div className="ProviderBottomNews-pages">
                    { list_pages }
                </div>
                <div className="ProviderBottomNews-pageAll">
                    <span className="ProviderBottomNews-page" onClick={() => handleSelectMostPage('first')}>First</span>
                    <span className="ProviderBottomNews-page" onClick={() => handleSelectMostPage('last')}>Last</span>
                    <span className="ProviderBottomNews-page">ALL:{ state.pageAmount }</span>
                </div>
            </div>
        </div>
    )
}

export default ProviderBottomNews;