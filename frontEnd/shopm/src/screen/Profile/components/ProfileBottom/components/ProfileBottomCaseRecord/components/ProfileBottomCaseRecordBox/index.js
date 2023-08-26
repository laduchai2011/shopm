import React, { memo, useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 

import { $$ } from "utilize/Tricks";
import { Timestamp } from "utilize/Timestamp";

const ProfileBottomCaseRecordBox = ({ index, onData }) => {

    const navigate = useNavigate();

    useEffect(() => {
        const q_CaseRecordBox = $$('.ProfileBottomCaseRecordBox');
        if (onData.load) {
            q_CaseRecordBox[index].classList.remove('ProfileBottomCaseRecordBox-loading');
        }
    }, [index, onData.load])

    const handleViewAvatar = (e) => {
        const target = e.target;
        const q_avatarContainer = $$('.ProfileBottomCaseRecordBox-center-avatarContainer')[index];
        if (target === q_avatarContainer.children[0]) {
            q_avatarContainer.children[0].classList.remove('viewAvatarDoctorPharmacist');
            q_avatarContainer.children[1].classList.remove('viewAvatarDoctorPharmacist');
        } else {
            q_avatarContainer.children[0].classList.add('viewAvatarDoctorPharmacist');
            q_avatarContainer.children[1].classList.add('viewAvatarDoctorPharmacist');
        }
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
        const averageRating = 3.2;
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
        <div className="ProfileBottomCaseRecordBox ProfileBottomCaseRecordBox-loading">
            <div className="ProfileBottomCaseRecordBox-top">
                <div>{ onData.title }</div>
                <div>{ Timestamp(onData.createdAt) }</div>
                <div>{ onData.status }</div>
                <div><button onClick={() => navigate(`/caseRecord/${onData.uuid_caseRecord}`)}>Detail</button></div>
            </div>
            <div className="ProfileBottomCaseRecordBox-center">
                <div>Doctor/Pharmacist</div>
                <div>
                    <div className="ProfileBottomCaseRecordBox-center-avatarContainer">
                        <img className="viewAvatarDoctorPharmacist" src="https://tse3.mm.bing.net/th?id=OIP.D8z-01L15DnYmN3pT-veJQHaHa&pid=Api&P=0&h=180" onClick={(e) => handleViewAvatar(e)} alt=""/>
                        <img className="viewAvatarDoctorPharmacist" src="https://tse3.mm.bing.net/th?id=OIP.D8z-01L15DnYmN3pT-veJQHaHa&pid=Api&P=0&h=180" onClick={(e) => handleViewAvatar(e)} alt=""/>
                    </div>
                    { onData.uuid_doctorOrPharmacist ? <div className="ProfileBottomCaseRecordBox-center-infor">
                        <div>Name Name Name Name Name Name Name Name</div>
                        <div>Doctor/Pharmacist</div>
                        <div>{ list_star }</div>
                    </div> : <div className="ProfileBottomCaseRecordBox-noDoctorOrPharmacist">Empty</div> }
                </div>
            </div>
            <div className="ProfileBottomCaseRecordBox-bottom">
                <div>Page total: { onData.pageTotal }</div>
                <div>Cost: { onData.priceTotal }$</div>
                <div><button>Continue</button></div>
            </div>
        </div>
    )
}

export default memo(ProfileBottomCaseRecordBox);