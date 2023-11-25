import React, { useState, useEffect, useTransition, memo, useContext } from 'react';
import './styles.css';

import axios from 'axios';
import { useParams } from "react-router-dom";

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { HiOutlineX } from 'react-icons/hi';

import { useGetDoctorOrPharmacistSearchByIdQuery } from 'reduxStore/RTKQuery/doctorOrPharmacistRTKQuery';
import { useCreateNotificationMutation } from 'reduxStore/RTKQuery/notificationRTKQuery';

import { ThemeContextApp } from 'utilize/ContextApp';

import myEvents from 'utilize/myEvents';

import { $ } from 'utilize/Tricks';
import { avatarNull } from 'utilize/constant';
import { SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST } from 'config/server';

/**
*@typedef {
*type: string,
*notification: text,
*status: string,  // sent - receved - seen - read - deleted / 1 - 2 - 3 - 4 - 5
*uuid_user: uuid
*} notificationOptions
*/  

/**
*@typedef {
*title: string,
*type: string,
*uuid_userSent: string,
*} notification
*/


const CaseRecordInforSearchBox = () => {

    const { id: uuid_caseRecord } = useParams();

    const { loginInfor } = useContext(ThemeContextApp);

    const [searchText, setSearchText] = useState('');
    const [selectedDoctorPharmacist, setSelectedDoctorPharmacist] = useState(null);
    const [doctorPharmacistList, setDoctorPharmacistList] = useState([]);
    const [sentStatus, setSentStatus] = useState(false);
    const [isPending, startTransition] = useTransition();
    const { 
        data: resData_doctorPharmacistList, 
        error: error_doctorPharmacistList, 
        isLoading: isLoading_doctorPharmacistList 
    } = useGetDoctorOrPharmacistSearchByIdQuery(searchText);
    // 925ae150-b29e-4714-b7ee-909c1aee1a01

    const [createNotification] = useCreateNotificationMutation();

    useEffect(() => {
        // console.log('selectedDoctorPharmacist', selectedDoctorPharmacist)
    }, [selectedDoctorPharmacist])

    useEffect(() => {
        if (error_doctorPharmacistList) {
            console.error(error_doctorPharmacistList);
        } else {
            if (resData_doctorPharmacistList?.success) {
                setDoctorPharmacistList([resData_doctorPharmacistList?.doctorOrPharmacist]);
            } else {
                setDoctorPharmacistList([]);
            }
        }

        // console.log(doctorPharmacistList)
    }, [resData_doctorPharmacistList, error_doctorPharmacistList])

    const handleRemove = () => {
        $('.CaseRecordInforSearchBox-overlay').classList.remove('active');
    }

    useEffect(() => {
        myEvents.onFirst('searchInput', (data) => {
            startTransition(() => {
                setSearchText(data);
                // setSelectedName();
            })
            if (!isLoading_doctorPharmacistList) {
                myEvents.finishFirst('searchInput');
            }
        })
    }, [searchText, isLoading_doctorPharmacistList])

    const handleSearchInput = (e) => {
        myEvents.emitFirst('searchInput', (e.target.value));
    }

    const handlePatchDoctorPharmacist = () => {
        const notification = {
            title: 'Toi can kham benh',
            type: 'requireExamine',
            uuid_userSent: loginInfor?.uuid
        }

        setSentStatus(true);

        axios({
            method: 'patch',
            url: `${SERVER_ADDRESS_PATCH_CASERECORD_SENDREQUIRETODOCTORPHARMACIST}`, 
            withCredentials: true,
            data: {
                uuid_caseRecord: uuid_caseRecord,
                uuid_doctorOrPharmacist: selectedDoctorPharmacist.uuid_doctorOrPharmacist
            }
        }).then((res) => {
            const resData = res.data;
            if (resData.success) {
                createNotification({
                    type: 'normal',
                    notification: JSON.stringify(notification),
                    status: 'sent',
                    uuid_user: selectedDoctorPharmacist.uuid_user
                })
            } else {
                console.log(resData.message);
            }
        }).catch(err => console.error(err));
    }

    const isIntergerRange = (fistInt, lastInt, averageInt) => {
        if (averageInt >= 0) {
            if ((fistInt <= averageInt) && (averageInt < lastInt)) {
                return true;
            } 
            return false;
        }
        return false;
    } 

    const list_star = (averageRating_m) => {
        return [0,1,2,3,4].map((data1, index) => {
            const averageRating = averageRating_m;
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
    } 

    const list_doctorPharmacist = doctorPharmacistList?.map((data, index) => {
        return (
            <div className='CaseRecordInforSearchBox-doctorPharmacistInforBox' key={index}>
                <div>
                    <img src={ data?.avatar ? data?.avatar : avatarNull } alt='' />
                    <div>
                        <div>{ `${data?.name} 11 111 1111111` }</div>
                        <div>{ list_star(data?.averageRating) }</div>
                    </div>
                </div>
                { !sentStatus && <div>
                    { data!==selectedDoctorPharmacist && <button onClick={() => setSelectedDoctorPharmacist(data)}>Select</button> }
                    { data===selectedDoctorPharmacist && <RiDeleteBin2Fill onClick={() => setSelectedDoctorPharmacist(null)} size={25} color='red' /> }
                </div> }
            </div>
        )
    })

    return (
        <div className='CaseRecordInforSearchBox'>
            <div className='CaseRecordInforSearchBox-overlay'>
                <div className='CaseRecordInforSearchBox-box'>
                    <div><TiDeleteOutline size={35} onClick={() => handleRemove()} /></div>
                    <h4>Search Doctor or Pharmacist</h4>
                    <input value={searchText} onChange={(e) => handleSearchInput(e)} placeholder='Search' />
                    { isPending && <div className='CaseRecordInforSearchBox-box-pending'><span>Loading ...</span></div> }
                    <div className='CaseRecordInforSearchBox-list'>
                        { list_doctorPharmacist }
                    </div>
                    { selectedDoctorPharmacist &&
                        <div className='CaseRecordInforSearchBox-box-selected'>
                            { !sentStatus ? 
                            <div>
                                <strong>{selectedDoctorPharmacist?.name}</strong>
                                <span>Selected</span>
                            </div> :
                            <div>
                                <span>You sent a require to user:</span>
                                <strong>{selectedDoctorPharmacist?.name}</strong>
                            </div>
                            }
                            { !sentStatus && <div>
                                <button onClick={() => handlePatchDoctorPharmacist()}>Send</button>
                                <HiOutlineX onClick={() => setSelectedDoctorPharmacist(null)} color='red' size={20} />
                            </div> }
                        </div> 
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(CaseRecordInforSearchBox);