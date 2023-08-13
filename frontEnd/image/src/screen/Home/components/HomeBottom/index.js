import React, { useEffect, useState, useRef } from "react";
import './styles.css';

import axios from "axios";

import { CiCircleRemove } from 'react-icons/ci';

import { $, $$ } from "utilize/Tricks";
import { SERVER_ADDRESS_GETIMAGELIST } from "config/server";


const HomeBottom = () => {
    const [view, setView] = useState({
        status: false,
        data: null
    });
    const [data, setData] = useState([]);

    const pageIndex = useRef(1);
    const isDatabaseEmpty = useRef(false);
    const loadding = useRef(false);
    const pageSize = 28;

    useEffect(() => {
        const element = $('.HomeBottom');
        const img = $$('.imgContainer');
        const viewImg = $('.viewImg');
        img.forEach(imgElement => {
            imgElement.onclick = function() {
                const column = getComputedStyle(element).getPropertyValue('--column');
                viewImg.classList.remove('show');
                const index = this.dataset.index;
                const lineStart = Math.floor(index/column) + 2;
                setTimeout(() => {
                    element.style.setProperty('--lineStart', lineStart);
                    viewImg.classList.add('show');
                }, 300)
                setView({
                    status: true,
                    data: data[index]
                });
            }
        });
    }, [data])

    useEffect(() => {   
        if (data.length === 0) {
            getData(pageIndex.current, pageSize); 
        }      
        
        // eslint-disable-next-line
    }, [])

    // load more
    window.onscroll = function() {
        const scrollable = window.innerHeight + document.documentElement.scrollTop - document.documentElement.offsetHeight;
        if((scrollable > -10) && !loadding.current) {
            loadding.current = true;
            pageIndex.current = pageIndex.current + 1;
            getData(pageIndex.current, pageSize);
        }
    } 

    // get data
    const getData = (pageIndex, pageSize) => {
        if (!isDatabaseEmpty.current) {
            axios({
                method: 'get',
                url: `${SERVER_ADDRESS_GETIMAGELIST}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
                withCredentials: true
            }).then(res => {
                const resData = res.data;
                const images = resData.images.rows;
                if (resData.status) {
                    setData(data.concat(images));

                    loadding.current = false;
                    
                    if (images.length < pageSize) {
                        isDatabaseEmpty.current = true;
                    }
                }
            }).catch(error => console.error(error))
        }
        
    }   

    const handleCloseView = () => {
        const viewImg = $('.viewImg');
        viewImg.classList.remove('show');
        setView({
            status: false,
            data: null
        });
    }

    const list_img = data.map((data, index) => {
        return (
            <div className="imgContainer" key={ index } data-index={`${index}`} >
                <img src={ data.url } alt=""/>
            </div>
        )
    })

    return (
        <div className="HomeBottom">
            <div className="viewImg">
                <div className="viewImg-img">
                    {view.status && <img src={ view.data.url } alt=""/>}
                </div>
                {view.status && <div className="viewImg-content">
                    <div>{ view.data.uuidImage }</div>
                    <div>{ view.data.tag }</div>
                    <div>{ view.data.content }</div>
                </div>}
                <div className="viewImg-icon">
                    <CiCircleRemove size={30} onClick={() => handleCloseView()} />
                </div>
            </div>
            { list_img }
        </div>
    )
}

export default HomeBottom;