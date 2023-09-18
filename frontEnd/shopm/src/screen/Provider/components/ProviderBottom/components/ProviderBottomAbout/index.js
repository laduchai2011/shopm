import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { FiMoreHorizontal } from 'react-icons/fi';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { GrAddCircle } from 'react-icons/gr';

import { ThemeContextApp } from "utilize/ContextApp";
import { ProviderContext } from "screen/Provider/utilize/ProviderContext";

import ProviderBottomAboutDialog from "./components/ProviderBottomAboutDialog";

import { $ } from "utilize/Tricks";
import { getCookie } from "auth/cookie";

import { SERVER_ADDRESS_GET_PROVIDERABOUTLIST } from "config/server";

const fakeData = [{subject: '111',content: '111'}, {subject: '111',content: '111'}, {subject: '111',content: '111'}, {subject: '111',content: '111'}, {subject: '111',content: '111'}, {subject: '111',content: '111'}]

const ProviderBottomAbout = () => {
    const navigate = useNavigate();
    const { clickDocument } = useContext(ThemeContextApp);
    const providerStore = useContext(ProviderContext);
    const [data, setData] = useState({
        showData: fakeData,
        allData: [],
        loadData: false
    });
    const providerRole = getCookie('providerRole');

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_PROVIDERABOUTLIST}?uuid_provider=${providerStore.uuid_provider}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            const showData = [];
            const allData = resData.providerAbouts;

            for(let i = 0; i < allData.length; i++) {
                if (i < 6) {
                    showData.push(allData[i])
                }
            }

            if (resData.exist) {
                setData({
                    showData: showData,
                    allData: allData,
                    loadData: true
                });
            } else {
                setData({
                    showData: [],
                    allData: [],
                    loadData: true
                });
            }
        }).catch(error => console.error(error))

        return () => {
            clickDocument.clear();
        }
    }, [clickDocument, providerStore])

    useLayoutEffect(() => {  
        if (data.loadData) {  
            $('.ProviderBottomAbout').classList.remove('ProviderBottomAbout-loading');
        }
    }, [data])

    const handleMoreHidden = (e, type) => {
        e.stopPropagation();
        const queryMoreHidden = $('.ProviderBottomAbout-footer');
        const qTable = $('.ProviderBottomAbout-table');

        switch(type) {
            case 'down':
                queryMoreHidden.children[0].classList.remove('ProviderBottomAbout-footer-svgActive');
                queryMoreHidden.children[1].classList.add('ProviderBottomAbout-footer-svgActive');
                setData({
                    ...data,
                    showData: data.allData
                })
                qTable.classList.add('showAll');
                break;
            case 'up':
                queryMoreHidden.children[0].classList.add('ProviderBottomAbout-footer-svgActive');
                queryMoreHidden.children[1].classList.remove('ProviderBottomAbout-footer-svgActive');
                const showData = [];
                const allData = data.allData;

                for(let i = 0; i < allData.length; i++) {
                    if (i < 6) {
                        showData.push(allData[i])
                    }
                }
                qTable.classList.remove('showAll');
                setTimeout(() => {
                    setData({
                        ...data,
                        showData: showData
                    })
                }, 250)
                break;
            default:
                throw new Error('Invalid parameter !');
        }
    }

    const handleMore = (e) => {
        e.stopPropagation();
        const optionsShow = $('.ProviderBottomAbout-options');
        optionsShow.classList.toggle('show');
        clickDocument.pushElement(optionsShow);
    }

    const handleAddInfor = () => {
        const aboutDialog = $('.ProviderBottomAboutDialog');
        aboutDialog.classList.add('show');
    }

    const list_about = data.showData.map((data1, index) => {
        return (
            <div key={index} className="ProviderBottomAbout-table1">
                <div className="ProviderBottomAbout-subject">{ data1.subject }</div>
                <div className="ProviderBottomAbout-content">{ data1.content }</div>
            </div>
        )
    })

    return (
        <div className="ProviderBottomAbout ProviderBottomAbout-loading">
            <div className="ProviderBottomAbout-headerContainer">
                <div className="ProviderBottomAbout-header">About</div>
                <div className="ProviderBottomAbout-optionsContainer">
                    <FiMoreHorizontal onClick={(e) => handleMore(e)} size={25} />
                    <div className="ProviderBottomAbout-options">
                        <div onClick={() => handleAddInfor()}>Add</div>
                        <div>Custom</div>
                        <div onClick={() => navigate('/provider/setting/about', { state: { uuid_provider: providerStore.uuid_provider } })}>Setting</div>
                    </div>
                </div>
            </div>
            { data.length === 0 && <div className="ProviderBottomAbout-ifEmpty">
                <h4>Empty</h4>
                { providerRole === 'admin' && <GrAddCircle onClick={() => handleAddInfor()} />}
            </div>}
            <div className="ProviderBottomAbout-table">
                { list_about }
            </div>
            <div className="ProviderBottomAbout-footer">
                <HiChevronDown className="ProviderBottomAbout-footer-svgActive" onClick={(e) => handleMoreHidden(e, 'down')} size={25} />
                <HiChevronUp onClick={(e) => handleMoreHidden(e, 'up')} size={25} />
            </div>
            <ProviderBottomAboutDialog />
        </div>
    )
}

export default ProviderBottomAbout;