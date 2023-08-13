import React, { useEffect, useContext } from "react";
import './styles.css';

import { BiSearch } from 'react-icons/bi';
import { BsFillMicFill } from 'react-icons/bs';

import { $$ } from "utilize/Tricks";
import { ThemeContextApp } from "utilize/ContextApp";

const ProductsFromProviderTop = () => {

    const clickDocument = useContext(ThemeContextApp);

    useEffect(() => {
        return () => {
            clickDocument.clear();
        }
    }, [clickDocument])

    const handleClickInput = (e) => {
        e.stopPropagation();
        e.target.classList.add('show');
        clickDocument.pushElement(e.target);
    }

    const handleSelectSubject = (e, index) => {
        const querySubject = $$('.ProductsFromProviderTop-subject');
        querySubject.forEach((value, i) => {
            querySubject[i].classList.remove('active');
        })
        e.target.classList.add('active');
    }

    const list_subject = [1,2,3,4,5].map((data, index) => {
        return (
            <span className="ProductsFromProviderTop-subject" onClick={(e) => handleSelectSubject(e, index + 1)} key={ index }>{`subject ${data}`}</span>
        )
    })

    return (
        <div className="ProductsFromProviderTop">
            <div className="ProductsFromProviderTop-searchContainer">
                <input className="ProductsFromProviderTop-input" onClick={(e) => handleClickInput(e)} placeholder="Search" />
                <BsFillMicFill size={20} />
                <BiSearch size={20} />
            </div>
            <div className="ProductsFromProviderTop-subjectContainer">
                <span className="ProductsFromProviderTop-subject active" onClick={(e) => handleSelectSubject(e, 0)}>All</span>
                { list_subject }
            </div>
        </div>
    )
}

export default ProductsFromProviderTop;