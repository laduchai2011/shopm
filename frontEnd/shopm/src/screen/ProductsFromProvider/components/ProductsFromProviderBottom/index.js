import React, { useState, useEffect, useContext } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";
import { BsThreeDots } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';

import { ThemeContextApp } from "utilize/ContextApp";

import { $, $$ } from "utilize/Tricks";

const ProductsFromProviderBottom = () => {

    const [zoom, setZoom] = useState(-1);

    const navigate = useNavigate();

    const { clickDocument } = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    const handleZoomProduct = (index) => {
        const queryProduct = $$('.ProductsFromProviderBottom-productContainer');
        for (let i = 0; i < queryProduct.length; i++) {
            queryProduct[i].classList.remove('activeLeft');
            queryProduct[i].classList.remove('activeRight');
        }

        const queryComponent = $('.ProductsFromProviderBottom');
        const column = getComputedStyle(queryComponent).getPropertyValue('--gridColumn');


        const posColumn = (index + 1)%column === 0 ? column : (index + 1)%column;
        const posRow = Math.floor((index)/column) + 1;
        queryComponent.style.setProperty('--row', posRow);
        queryComponent.style.setProperty('--column', posColumn);
        if ((index + 1)%column === 0) {
            queryProduct[index].classList.add('activeRight');
        } else {
            queryProduct[index].classList.add('activeLeft');
        }

        setZoom(index);
    }

    const handleCloseZoom = (index) => {
        const queryProduct = $$('.ProductsFromProviderBottom-productContainer');
        for (let i = 0; i < queryProduct.length; i++) {
            queryProduct[i].classList.remove('activeLeft');
            queryProduct[i].classList.remove('activeRight');
        }

        setZoom(-1);
    }

    const handleShowMenu = (e) => {
        e.stopPropagation();
        const menuDialog = $('.ProductsFromProviderBottom-menuDialog');
        menuDialog.classList.toggle('show');
        clickDocument.pushElement(menuDialog);
    }

    const list_product = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,21
                         ,22,23,24,25,26,27,28,29,30].map((data, index) => {
        return (
            <div key={ index } className="ProductsFromProviderBottom-productContainer">
                <div className="ProductsFromProviderBottom-imgContainer">
                    { zoom === index && <>
                        <BsThreeDots className="ProductsFromProviderBottom-iconMenu" onClick={(e) => handleShowMenu(e)} size={20} />
                        <div className="ProductsFromProviderBottom-menuDialog">
                            <div onClick={() => navigate('/medication/fdgsdfg')}>Go to medication</div>
                            <div onClick={() => navigate('/provider/sdfsdgf')}>Provider</div>
                            <div>Hidden</div>
                            <div>Edit</div>
                        </div>
                        <TiDeleteOutline className="ProductsFromProviderBottom-iconDelete" onClick={() => handleCloseZoom(index)} size={20} />
                    </>}
                    <img src="https://1.bp.blogspot.com/-a71p9zvla98/UkP4-cPfK4I/AAAAAAAAAg8/va9AmdChErg/s1600/anh-dep-hinh-nen-thien-nhien-0.jpg" onClick={() => handleZoomProduct(index)} alt=""/>
                </div>
                <div>-Subject: sot</div>
                <div>-Object: person</div>
                <div>-Id: { data }</div>
                <div>-Name: paradol</div>
                <div>-Type: pill</div>
                <div>-Symptom: headache</div>
                <div>-Price: 10$/pill</div>
                <div>-Note:</div>
            </div>
        )
    })
    return (
        <div className="ProductsFromProviderBottom">
            { list_product }
        </div>
    )
}

export default ProductsFromProviderBottom;