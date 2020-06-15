
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    error: ''
}


const errorReducer = (state = initialState, action) => {

    switch(action.type){

        case actionTypes.CLEAR_ERRORS:
            return {
                ...state,
                error: ''
            }

        case actionTypes.REGISTER_ERROR:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.RESET_PASSWORD_ERR:
            return {
                ...state,
                error: action.payload
            }

        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                error: 'User not found'
            }

        case actionTypes.ERROR:
            return {
                ...state,
                error: 'ERROR'
            }
        
        case actionTypes.ERR:
            return {
                ...state,
                error: action.payload
            }


        default:
            return state;
    }
}

export default errorReducer;