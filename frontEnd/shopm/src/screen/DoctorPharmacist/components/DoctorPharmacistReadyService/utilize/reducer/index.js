/** 
*@typedef {
*id: string,
*title: string,
*shortDescribe: string,
*text: text,
*price: number,
*time: number
*} ServiceOptions
*/


// init state
const initState = {
    allServices: [],
    services: [],
    deletedServices: [],
    selectedServices: [], 
    timeCount: 0
}

// action
const GET_ALLSERVICES = 'get_allservices';
const INIT_SERVICES = 'init_services';
const ADD_SERVICES = 'add_services';
const ADD_ALL_SERVICES = 'add_all_services';
const DELETE_SERVICES = 'delete_services';
const SELECT_SERVICE = 'select_service';
const REMOVE_SELECTEDSERVICE = 'remove_selectedservice';
const DELETE_SERVICE = 'delete_service';
const BOOK_SERVICE = 'book_service';

// action function
function getAllServices (allServices) {  // allServices is a ServiceOptions array get from server
    return {
        type: GET_ALLSERVICES,
        allServices: allServices
    }
}
function initServices (allServices) {  // newServices is a ServiceOptions array get from server
    return {
        type: INIT_SERVICES,
        allServices: allServices
    }
}
function addServices (newServices) {  // newServices is a ServiceOptions array 
    return {
        type: ADD_SERVICES,
        newServices: newServices
    }
}
function addAllServices (allServices) {  // allServices is a ServiceOptions array 
    return {
        type: ADD_ALL_SERVICES,
        allServices: allServices
    }
}
function deleteService (service) {   // service is a ServiceOptions
    return {
        type: DELETE_SERVICE,
        service: service
    }
}
function deleteServices (services) {  // newServices is a ServiceOptions array 
    return {
        type: DELETE_SERVICES,
        services: services
    }
}
function selectService (newService) {   // newServices is a ServiceOptions
    return {
        type: SELECT_SERVICE,
        newService: newService
    }
}
function removeSelectedService (service) {   // service is a ServiceOptions
    return {
        type: REMOVE_SELECTEDSERVICE,
        service: service
    }
}
function bookService (timeCount) {    // timeCount is a second
    return {
        type: BOOK_SERVICE,
        timeCount: timeCount
    }
}

const handleInitServices = (allServices) => {
    let new_services = [];
    switch (allServices.length) {
        case 1:
            new_services = [allServices[0]]
            break;
        
        case 2:
            new_services = [allServices[0], allServices[1]]
            break;

        default:
            new_services = [allServices[0], allServices[1], allServices[2]]
            break;
    }
    return new_services;
}

function reducer(state, action) {
    switch (action.type) {
        case GET_ALLSERVICES:
            return {
                ...state,
                allServices: action.allServices,
                services: handleInitServices(action.allServices)
            };

        case INIT_SERVICES:
            return {
                ...state,
                services: handleInitServices(action.allServices),
                deletedServices: [],
                selectedServices: []
            };

        case ADD_SERVICES:
            const new_services_add_services = [...state.services];
            return {
                ...state,
                services: new_services_add_services.concat(action.newServices)
            };
        
        case ADD_ALL_SERVICES:
            return {
                ...state,
                services: action.allServices
            };

        case DELETE_SERVICE:
            const index_delete_service = state.services.indexOf(action.service);
            const new_services_delete_service = [...state.services];
            const new_deletedServices_delete_service = [...state.deletedServices];
            const new_selectedServices_delete_service = [...state.selectedServices];
            new_services_delete_service.splice(index_delete_service, 1);
            new_deletedServices_delete_service.push(action.service)
            return {
                ...state,
                services: new_services_delete_service,
                deletedServices: new_deletedServices_delete_service,
                selectedServices: new_selectedServices_delete_service.filter(value => value !== action.service)
            };

        case DELETE_SERVICES:
            const new_services_remove_services = [...state.services];
            const new_deletedServices_delete_services = [...state.deletedServices];
            const new_selectedServices_delete_services = [...state.selectedServices];
            const delete_services = action.services;
            return {
                ...state,
                services: new_services_remove_services.filter(value => delete_services.indexOf(value) < 0),
                deletedServices: new_deletedServices_delete_services.concat(delete_services),
                selectedServices: new_selectedServices_delete_services.filter(value => delete_services.indexOf(value) < 0)
            }

        case SELECT_SERVICE:
            return {
                ...state,
                selectedServices: [...state.selectedServices, action.newService]
            };

        case REMOVE_SELECTEDSERVICE:
            const index_remove_selectedService = state.selectedServices.indexOf(action.service);
            const new_selectedServices = [...state.selectedServices];
            new_selectedServices.splice(index_remove_selectedService, 1);
            return {
                ...state,
                selectedServices: new_selectedServices
            };
        
        case BOOK_SERVICE:
            return {
                ...state,
                timeCount: action.timeCount
            };

        default:
            throw new Error('Invalid action.')
    }
}

module.exports = { 
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
}