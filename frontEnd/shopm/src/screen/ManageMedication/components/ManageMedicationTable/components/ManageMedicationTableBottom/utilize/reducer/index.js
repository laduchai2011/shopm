/**
*@typedef {
*name: string,
*subject: string,
*object: string,
*symptom: string,
*type: string,
*price: string,
*note: string,
*catalog: object,
*information: string,
*amount: string,
*sold: string,
*discount: string,
*averageRating: float,
*rateCount: integer,
*status: string
*uuid_provider: uuid
*} medicateOptions
*/

 

// init state
const initState = {
    medications: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
}

// action
const GET_DATA = 'get_data';

// action function
function getData(data) {
    return {
        type: GET_DATA,
        data: data
    }
}

function reducer(state, action) {
    switch (action.type) {
        case GET_DATA:
            return {
                ...state,
                medications: action.data
            }
    
        default:
            throw new Error('Invalid action.')
    }
}

export { 
    initState,
    getData
}

export default reducer;