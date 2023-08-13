import React from "react";
import './styles.css';

import axios from "axios";
import { useParams } from "react-router-dom";

import Header from "screen/Header";
import TextEditor from "TextEditor";
import { TEGetContent } from "TextEditor/utilize";

import { SERVER_ADDRESS_POST_PROVIDER_NEWS } from "config/server";

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
    

const ProviderNewsAdd = () => {
    const {id: uuid_provider} = useParams();

    const handleUploadNews = () => {
        const providerNewsBody = {
            uuid_provider: uuid_provider,
            providerNewsOptions: {
                news: TEGetContent(), 
                like: 0,
                comment: 0,
                share: 0,
                status: 'normal',
                uuid_provider: uuid_provider
            }
        }
        axios({
            method: 'post',
            url: SERVER_ADDRESS_POST_PROVIDER_NEWS,
            withCredentials: true,
            data: providerNewsBody,
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const resData = res.data;
            console.log(resData)
        }).catch(err => console.error(err))
    }
    return (
        <div className="ProviderNewsAdd">
            <Header />
            <div className="ProviderNewsAdd-main">
                <div className="ProviderNewsAdd-teContainer">
                    <TextEditor />
                </div>
                <div className="ProviderNewsAdd-Control">
                    <div>
                        <button>Upload Image</button>
                        <button>Upload Video</button>
                    </div>
                    <div>
                        <button onClick={() => handleUploadNews()}>Upload News</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProviderNewsAdd;