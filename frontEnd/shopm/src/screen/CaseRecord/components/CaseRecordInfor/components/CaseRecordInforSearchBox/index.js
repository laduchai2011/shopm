import React, { useState } from 'react';
import './styles.css';

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';

import { $ } from 'utilize/Tricks';

const CaseRecordInforSearchBox = () => {
    const [searchText, setSearchText] = useState('');
    // const [doctorPharmacistList, setDoctorPharmacistList] = useState([1,2,3,4]);

    const handleRemove = () => {
        $('.CaseRecordInforSearchBox-overlay').classList.remove('active');
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
        const averageRating = 3.3;
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

    const list_doctorPharmacist = [1,2,3,4,5,6,7,8,9].map((data, index) => {
        return (
            <div className='CaseRecordInforSearchBox-doctorPharmacistInforBox' key={index}>
                <div>
                    <div>{data}</div>
                    <img src='https://tse1.mm.bing.net/th?id=OIP.DA2u6Ioeunl7aZ8z_sVsaQHaLH&pid=Api&P=0&h=180' alt='' />
                    <div>
                        <div>name</div>
                        <div>{ list_star }</div>
                    </div>
                </div>
                <div>
                    <button>Select</button>
                </div>
            </div>
        )
    })

    return (
        <div className='CaseRecordInforSearchBox'>
            <div className='CaseRecordInforSearchBox-overlay'>
                <div className='CaseRecordInforSearchBox-box'>
                    <div><TiDeleteOutline size={35} onClick={() => handleRemove()} /></div>
                    <h4>Search Doctor or Pharmacist</h4>
                    <input value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder='Search' />
                    <div className='CaseRecordInforSearchBox-list'>
                        { list_doctorPharmacist }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseRecordInforSearchBox;