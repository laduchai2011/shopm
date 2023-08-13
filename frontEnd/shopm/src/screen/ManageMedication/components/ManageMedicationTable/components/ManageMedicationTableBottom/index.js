import React, { memo, useReducer, useEffect, useLayoutEffect, useRef, useState } from "react";
import './styles.css';

import axios from "axios";
import { useParams } from 'react-router-dom';

import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'; 
import { AiFillDelete } from 'react-icons/ai';
import { RxCaretUp, RxCaretDown } from 'react-icons/rx';
import { TiDelete } from 'react-icons/ti';

import ManageMedicationTableBottomToastMessage, { setToasMessage } from "./components/ManageMedicationTableBottomToastMessage";

import { $, $$ } from "utilize/Tricks";
import { SERVER_ADDRESS_GET_MEDICATIONMANAGER_LIST, SERVER_ADDRESS_PATCH_MEDICATION } from "config/server";

import { 
    initState, 
    reducer,
    getData
} from "./utilize/reducer";

const ManageMedicationTableBottom = ({changeTop, setChangBottom}) => {
    const {id: uuid_provider} = useParams();

    const [state, dispatch] = useReducer(reducer, initState);
    const { medications } = state;

    const loadData = useRef(false);
    const pageIndex = changeTop.pageIndex;
    const pageSize = 20;

    useEffect(() => {
        axios({
            method: 'get',
            url: `${SERVER_ADDRESS_GET_MEDICATIONMANAGER_LIST}?uuid_provider=${uuid_provider}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
            withCredentials: true
        }).then(res => {
            const resData = res.data;
            if (resData.success) {
                const newMedications = [...resData.medications.rows]
                for (let i = 0; i < newMedications.length; i++) {
                    newMedications[i].messageType = null;
                }
                dispatch(getData(newMedications));
                loadData.current = true;
                setChangBottom({pageNumber: handlePageNumber(resData.medications.count)});
            } else {
                alert(resData.message);
            }
        }).catch(error => console.error(error))

    }, [uuid_provider, setChangBottom, pageIndex])

    useLayoutEffect(() => {  
        if (loadData.current) {  
            $('.ManageMedicationTableBottom').classList.remove('ManageMedicationTableBottom-loading');
        }
    }, [loadData, medications])

    const handlePageNumber = (count) => {
        const newCount = Number(count);
        if ((newCount % pageSize) === 0) {
            return Math.floor(newCount/pageSize);
        } else {
            return Math.floor(newCount/pageSize) + 1;
        }
    }

    const handleMore = (e, index) => {
        const q_children = e.currentTarget.children;
        const q_rowContainer = $$('.ManageMedicationTableBottom-rowContainer');
        const q_fullInfor = $$('.ManageMedicationTableBottom-fullInfor');
        if (q_children[0].classList.contains('active')) {
            q_children[0].classList.remove('active');
            q_children[1].classList.add('active');
            q_rowContainer[index + 1].classList.remove('active');
            q_fullInfor[index].classList.remove('show');

            const q_underRow = $('.ManageMedicationTableBottom-underRow.header');
            if (q_underRow.children[1].children[1].classList.contains('active')) {
                q_rowContainer[index + 1].classList.add('active');
            }
        } else {
            q_children[0].classList.add('active');
            q_children[1].classList.remove('active');
            q_rowContainer[index + 1].classList.add('active');
            q_fullInfor[index].classList.add('show');
        }     
    }

    const handleShow = (e, type) => {
        const q_rowContainer = $$('.ManageMedicationTableBottom-rowContainer');
        const q_fullInfor = $$('.ManageMedicationTableBottom-fullInfor');
        const q_moreIcon = $$('.ManageMedicationTableBottom-underRow-setMore')
        const q_e = e.currentTarget;

        switch(type) {
            case 'underRow':
                if (q_e.classList.contains('active')) {
                    q_rowContainer.forEach(element => {
                        element.classList.remove('active');
                        q_e.classList.remove('active');
                    });
                } else {
                    q_rowContainer.forEach(element => {
                        element.classList.add('active');
                        q_e.classList.add('active');
                    });
                }
                break;
            
            case 'fullInfor':
                if (q_e.classList.contains('active')) {
                    q_fullInfor.forEach(element => {
                        element.classList.remove('show');
                        q_e.classList.remove('active');
                       
                    })
                    q_moreIcon.forEach(element => {
                        element.children[0].classList.remove('active');
                        element.children[1].classList.add('active');
                    })
                } else {
                    q_fullInfor.forEach(element => {
                        element.classList.add('show');
                        q_e.classList.add('active');
                    })
                    q_moreIcon.forEach(element => {
                        element.children[0].classList.add('active');
                        element.children[1].classList.remove('active');
                    })
                }
                break;

            default:
                throw new Error('Parameter invalid !');
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
        const averageRating = data1.averageRating;
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

    const MedicateComponent = memo(function MedicateComponent({data, index}) {
        const [viewImage, setViewImage] = useState('');
        const waitMessage = useRef(false);

        useEffect(() => {
            //set selling
            const q_detailImage = $$('.ManageMedicationTableBottom-underRow-setOption')
            if (data.status === 'selling') {
                q_detailImage[index].children[0].classList.add('active');
            }

            // set information
            $$('.ManageMedicationTableBottom-fullInfor-information')[index].innerHTML = data.information;
        }, [index, data]) 

        const handleSetSelling = (e) => {
            const q_children = e.currentTarget.children;
            const statusSelling = q_children[0].classList.contains('active');
            
            const body = { uuid_provider: uuid_provider, uuid_medication: data.uuid_medication, medicateOptionsPatch: {status: data.status}}
            if (!waitMessage.current) {
                waitMessage.current = true;
                if (statusSelling) {
                    q_children[0].classList.remove('active');
                    body.medicateOptionsPatch = {status: 'stop'};
                    setToasMessage('stopSelling', index);
                } else {
                    q_children[0].classList.add('active');
                    body.medicateOptionsPatch = {status: 'selling'};
                    setToasMessage('registerSelling', index);
                }
    
                setTimeout(() => {
                    axios({
                        method: 'patch',
                        url: SERVER_ADDRESS_PATCH_MEDICATION,
                        withCredentials: true,
                        data: body,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then((res) => {
                        const resData = res.data;
                        if (resData.success) {
                            if (statusSelling) {
                                setToasMessage('stopSellingSuccessly', index);
                            } else {
                                setToasMessage('registerSellingSuccessly', index);
                            }
                        } else {
                            if (statusSelling) {
                                setToasMessage('stopSellingFailure', index);
                            } else {
                                setToasMessage('registerSellingFailure', index);
                            }
                        }
                    }).catch(err => {
                        console.error(err);
                        if (statusSelling) {
                            setToasMessage('stopSellingFailure', index);
                        } else {
                            setToasMessage('registerSellingFailure', index);
                        }
                    }).finally(() => waitMessage.current = false)
                }, 5000)
            }
        }
        
        const handleCloseImageDetail = () => {
            const q_detailImage = $$('.ManageMedicationTableBottom-fullInfor-detailImage')
            q_detailImage[index].classList.remove('active');
            setTimeout(() => {
                setViewImage('');
            }, 500)
        }

        const list_image = data.image && JSON.parse(data.image).urls.map((data1, index1) => {
            const handleViewImageDetail = () => {
                const q_detailImage = $$('.ManageMedicationTableBottom-fullInfor-detailImage')
                q_detailImage[index].classList.add('active');
                setViewImage(data1);
            }
            return (
                <span key={index1}>
                    <img src={data1} onClick={() => handleViewImageDetail(index1)} alt="" />
                </span>
            )
        })

        const list_catalog = data.catalog && JSON.parse(data.catalog).catalogs.map((data1, index1) => {
            return (
                <span key={index1}>
                    <span><strong>{`${data1.subject}:`}</strong></span>
                    <span>{`${data1.content}:`}</span>
                </span>
            )
        })

        return (
            <div className="ManageMedicationTableBottom-rowContainer">
                <div className="ManageMedicationTableBottom-row">
                    <div>{index}</div>
                    <div>{data.uuid_provider}</div>
                    <div>{data.name}</div>
                    <div>{data.subject}</div>
                    <div>{data.object}</div>
                    <div>{data.symptom}</div>
                    <div>{data.type}</div>
                    <div>{ list_star }</div>
                </div>
                <div className="ManageMedicationTableBottom-underRow">
                    <div>{`${data.sold}/${data.amount} : ${data.price}$ : ${data.discount}%`}</div>
                    <div className="ManageMedicationTableBottom-underRow-right">
                        <div className="ManageMedicationTableBottom-underRow-setMore" onClick={(e) => handleMore(e, index)}>
                            <RxCaretUp size={25} />
                            <RxCaretDown className="active" size={25} />
                        </div>
                        <div className="ManageMedicationTableBottom-underRow-setOption" onClick={(e) => handleSetSelling(e)}>
                            <div />
                        </div>
                        <AiFillDelete color="red" size={20} />
                    </div>
                </div>
                <div className="ManageMedicationTableBottom-fullInfor">
                    <div>Note</div>
                    <div>{data.note}</div>
                    <div>Image</div>
                    <div>
                        <span className="ManageMedicationTableBottom-fullInfor-listImage">
                            { list_image }
                        </span>
                        <span className="ManageMedicationTableBottom-fullInfor-detailImage">
                            <TiDelete onClick={() => handleCloseImageDetail()} size={30} color="white" />
                            <img src={viewImage} alt=""/>
                        </span>
                    </div>
                    <div>Catalog</div>
                    <div>{ list_catalog }</div>
                    <div>Information</div>
                    <div className="ManageMedicationTableBottom-fullInfor-information"></div>
                </div>
                <ManageMedicationTableBottomToastMessage />
            </div>
        )
    })

    const list_medicate = medications.map((data, index) => {
        return (
            <MedicateComponent key={index} data={data} index={index} />
        )
    })  

    return (
        <div className="ManageMedicationTableBottom ManageMedicationTableBottom-loading">
            <div className="ManageMedicationTableBottom-rowContainer">
                <div className="ManageMedicationTableBottom-row">
                    <div>Id</div>
                    <div>Uid</div>
                    <div>Name</div>
                    <div>Subject</div>
                    <div>Object</div>
                    <div>Symptom</div>
                    <div>Type</div>
                    <div>Rate</div>
                </div>
                <div className="ManageMedicationTableBottom-underRow header">
                    <div></div>
                    <div>
                        <span>Show</span>
                        <div onClick={(e) => handleShow(e, 'underRow')} />
                        <div onClick={(e) => handleShow(e, 'fullInfor')} />
                    </div>
                </div>
            </div>
            { list_medicate }
        </div>
    )
}

export default ManageMedicationTableBottom;