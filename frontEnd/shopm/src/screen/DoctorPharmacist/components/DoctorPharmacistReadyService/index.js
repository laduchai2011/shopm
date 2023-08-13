import React, { useReducer, useEffect } from "react";
import './styles.css';

import { useNavigate } from "react-router-dom";

import { CgRadioChecked } from 'react-icons/cg';
import { MdCheckBoxOutlineBlank, MdDeleteForever } from 'react-icons/md';
import { CiCircleRemove } from 'react-icons/ci';
import { FiCheckCircle, FiEdit } from 'react-icons/fi';
import { GrAddCircle } from 'react-icons/gr';
import { BiMessageSquareDetail } from 'react-icons/bi';

import { $, $$ } from "utilize/Tricks";
import DoctorPharmacistReadyServiceToastMessage from "./components/DoctorPharmacistReadyServiceToastMessage";
import { 
    initState,
    reducer,
    getAllServices, 
    initServices,
    addServices, 
    addAllServices,
    deleteService,
    deleteServices,
    selectService,
    removeSelectedService,
    bookService
} from './utilize/reducer';

const service = (title) => {
    return {
        id: `id-${title}`,
        title: title,
        shortDescribe: 'rat hong, ho nhieu, dfgdfg, dfgdfg,df ',
        text: 'ho, kho tho, non lao, nhiet, fgdf jkh oljloi jlok hhkih hjoi hoihj oih oih oihj oihj oh oho hjo hjo hjoihj oih o khijoihj oj o ij oj j o j joij ijo jlkjl joljlo knjmlokjnm ojnmlk',
        price: 10.000,
        time: 10
    }
}
const getservices = [
    service(1), service(2), service(3), service(4), service(5), service(6), service(7), service(8)
]

const DoctorPharmacistReadyService = () => {

    const [state, dispatch] = useReducer(reducer, initState);
    const { allServices, services, deletedServices, selectedServices, timeCount } = state;

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllServices(getservices));
    }, [])

    useEffect(() => {
        const iconContainer = $$('.DoctorPharmacistReadyService-iconContainer');
        const queryServices = $$('.DoctorPharmacistReadyService-dialog');
        const querySelectedServices = $$('.DoctorPharmacistReadyService-bottom-list');

        // check selectedServices to setup attribute if services
        services.forEach((value, index) => {
            const index_electedServices = selectedServices.indexOf(value);
            if (index_electedServices >= 0) {
                iconContainer[index*2 + 0].children[0].classList.remove('DoctorPharmacistReadyService-activeIcon');
                iconContainer[index*2 + 0].children[1].classList.add('DoctorPharmacistReadyService-activeIcon');
                iconContainer[index*2 + 1].children[0].classList.remove('DoctorPharmacistReadyService-activeIcon'); 
                iconContainer[index*2 + 1].children[1].classList.add('DoctorPharmacistReadyService-activeIcon');

                if(querySelectedServices[index_electedServices + 1].classList.contains('DoctorPharmacistReadyService-bottom-list-active')) {
                    queryServices[index].classList.add('DoctorPharmacistReadyService-dialog-active');
                } else { 
                    queryServices[index].classList.remove('DoctorPharmacistReadyService-dialog-active');
                }
            } else {
                iconContainer[index*2 + 0].children[0].classList.add('DoctorPharmacistReadyService-activeIcon');
                iconContainer[index*2 + 0].children[1].classList.remove('DoctorPharmacistReadyService-activeIcon');
                iconContainer[index*2 + 1].children[0].classList.add('DoctorPharmacistReadyService-activeIcon'); 
                iconContainer[index*2 + 1].children[1].classList.remove('DoctorPharmacistReadyService-activeIcon');

                queryServices[index].classList.remove('DoctorPharmacistReadyService-dialog-active');
            }   
        })

    }, [services, selectedServices])

    const handleDeleteServices = (needDeleteServices) => {
        const querySelectedServices = $$('.DoctorPharmacistReadyService-bottom-list');
        // on table
        let startEvent = false;
        for (let index = 0; index < selectedServices.length - 1; index++) {
            if (needDeleteServices.indexOf(services[index]) >= 0) {
                startEvent = true;
            }

            if (startEvent) {
                if (querySelectedServices[index + 2].classList.contains('DoctorPharmacistReadyService-bottom-list-active')) {
                    querySelectedServices[index + 1].classList.add('DoctorPharmacistReadyService-bottom-list-active');
                } else {
                    querySelectedServices[index + 1].classList.remove('DoctorPharmacistReadyService-bottom-list-active');
                }
            }
        }
        
        if (needDeleteServices.length > 1) {
            dispatch(deleteServices(needDeleteServices));
        } else {
            dispatch(deleteService(needDeleteServices[0]));
        }
    }

    const handleSelectService = (select, index) => {
        // on table
        const querySelectedServices = $$('.DoctorPharmacistReadyService-bottom-list');
        let startEvent = false;
        for (let i = 0; i < selectedServices.length - 1; i++) {
            if (index === i) {
                startEvent = true;
            }

            if (startEvent) {
                if (querySelectedServices[index + 2].classList.contains('DoctorPharmacistReadyService-bottom-list-active')) {
                    querySelectedServices[index + 1].classList.add('DoctorPharmacistReadyService-bottom-list-active');
                } else {
                    querySelectedServices[index + 1].classList.remove('DoctorPharmacistReadyService-bottom-list-active');
                }
            }
        }

        if (select) {
            dispatch(selectService(services[index]));
        } else {
            dispatch(removeSelectedService(services[index]));
        }
    }

    const handleViewFromTable = (data) => {
        const queryServices = $$('.DoctorPharmacistReadyService-dialog');
        const querySelectedServices = $$('.DoctorPharmacistReadyService-bottom-list');
        const indexServices = services.indexOf(data);
        const indexSelectedServices = selectedServices.indexOf(data);
        queryServices[indexServices].classList.toggle('DoctorPharmacistReadyService-dialog-active');
        querySelectedServices[indexSelectedServices + 1].classList.toggle('DoctorPharmacistReadyService-bottom-list-active');
    }

    const hanleAllTimePrice = () => {
        let time = 0, price = 0;
        selectedServices.forEach((value, index, array) => {
            time = time + value.time;
            price = price + value.price; 
        });
        return `${time}m/${price}$`;
    }

    const handleBook = () => {
        const toastMessageOverlay = $('.DoctorPharmacistReadyServiceToastMessage');
        const toastMessageDialog = $('.DoctorPharmacistReadyServiceToastMessage-dialog');

        toastMessageOverlay.classList.add('DoctorPharmacistReadyServiceToastMessage-show');
        toastMessageDialog.style.display = 'block';

        dispatch(bookService(10));
        setTimeout(() => {
            toastMessageDialog.classList.add('DoctorPharmacistReadyServiceToastMessage-dialog-show');
        }, 0)
    }

    const handleHidden = () => {
        dispatch(initServices(allServices));
    }

    const handleAllServices = () => {
        dispatch(addAllServices(allServices));
    }

    const handleMore = () => {
        let new_services = [];
        let new_services_deletedServices = services.concat(deletedServices);

        if (allServices.length - new_services_deletedServices.length > 0) {
            switch (allServices.length - new_services_deletedServices.length) {
                case 1:
                    new_services = [allServices[new_services_deletedServices.length + 0]]
                    break;
                
                case 2:
                    new_services = [allServices[new_services_deletedServices.length + 0], allServices[new_services_deletedServices.length + 1]]
                    break;

                default:
                    new_services = [allServices[new_services_deletedServices.length + 0], allServices[new_services_deletedServices.length + 1], allServices[new_services_deletedServices.length + 2]]
                    break;
            }
        }

        dispatch(addServices(new_services));
    }
    
    const list_service = services.map((data, index) => {
        const { id, title, shortDescribe, text, price, time } = data;
        return (
            <div key={index} className="DoctorPharmacistReadyService-dialogContainer">
                <div className="DoctorPharmacistReadyService-custom">
                    <BiMessageSquareDetail onClick={() => navigate(`/service/${id}`)} size={21} color="blue" />
                    <FiEdit size={20} color="green" />
                    <MdDeleteForever onClick={() => handleDeleteServices([data])} size={25} color="red" />
                </div>
                <div className="DoctorPharmacistReadyService-dialog">
                    <div className="DoctorPharmacistReadyService-smallDialog">
                        <div className="DoctorPharmacistReadyService-iconContainer">
                            <CgRadioChecked className="DoctorPharmacistReadyService-activeIcon" size={25} color="red" />
                            <FiCheckCircle size={25} color="green" />
                        </div>
                        <div className="DoctorPharmacistReadyService-contentContainer">
                            <h4>{ title }</h4>
                            <p>{ shortDescribe }</p>
                        </div>
                        <div className="DoctorPharmacistReadyService-iconContainer">
                            <MdCheckBoxOutlineBlank className="DoctorPharmacistReadyService-activeIcon DoctorPharmacistReadyService-check" onClick={() => handleSelectService(true, index)} size={25} color="gray" />
                            <CiCircleRemove size={25} onClick={() => handleSelectService(false, index)} />
                        </div>
                    </div>
                </div>
                <div className="DoctorPharmacistReadyService-pre">
                    <pre>{ text }</pre>
                </div>
                <div className="DoctorPharmacistReadyService-price">
                    <span>{ `${price}$` }</span>
                    <span>{ `${time}m` }</span>
                </div>
            </div>
        )
    })

    const list_service_selected = selectedServices.map((data, index) => {
        const { title, shortDescribe, price, time } = data;
        return (
            <div key={ index } className="DoctorPharmacistReadyService-bottom-list" onClick={() => handleViewFromTable(data)}>
                <div>{ index }</div>
                <div>{ title }</div>
                <div>{ shortDescribe }</div>
                <div>{ time }</div>
                <div>{ price }</div>
                <div><MdDeleteForever onClick={(e) => {
                    e.stopPropagation()
                    handleSelectService(false, services.indexOf(data))
                }} size={25} color="red" /></div>
            </div>
        )
    })

    return (
        <div className="DoctorPharmacistReadyService">
            <div className="DoctorPharmacistReadyService-headerContainer">
                <span className="DoctorPharmacistReadyService-header">Services is ready !</span>
                <div>
                    <GrAddCircle size={25} />
                    <MdDeleteForever onClick={() => handleDeleteServices(services)} size={25} color="red" />
                </div>
            </div>
            <div className="DoctorPharmacistReadyService-center">
                { list_service }
            </div>
            <div className="DoctorPharmacistReadyService-viewCustom">
                <span>{`${services.length}/${allServices.length}`}</span>
                { services.length > 3 && <button onClick={() => handleHidden()}>Hidden</button> }
                { services.length < allServices.length && <button onClick={() => handleAllServices()}>All</button> }
                { services.concat(deletedServices).length < allServices.length && <button onClick={() => handleMore()}>More</button> }
            </div>
            <div className="DoctorPharmacistReadyService-bottom">
                <div className="DoctorPharmacistReadyService-bottom-list">
                    <div>Stt</div>
                    <div>Service</div>
                    <div>Short Describe</div>
                    <div>Time</div>
                    <div>Price</div>
                    <div>X</div>
                </div>
                { list_service_selected }
                <div className="DoctorPharmacistReadyService-bottom-btn">
                    <span>{ hanleAllTimePrice() }</span>
                    <button onClick={() => handleBook()}>BOOK</button>
                </div>
            </div>
            <DoctorPharmacistReadyServiceToastMessage time={ timeCount } onCallback={ () => dispatch(bookService(0)) } />
        </div>
    )
}

export default DoctorPharmacistReadyService;