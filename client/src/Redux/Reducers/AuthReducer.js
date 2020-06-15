
import * as actionTypes from '../Actions/ActionTypes';


const initialState = {
    registerStatus: false,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    forgotPasswordStatus: false,
    resetPasswordSuccess: false,
    

}

const authReducer = (state = initialState, action) => {

    switch (action.type){

        case (actionTypes.REGISTER_SUCCESS):
            return {
                ...state,
                registerStatus: true
            }

        case (actionTypes.RESET_REGISTER_STATUS):
            return {
                ...state,
                registerStatus: false
            }

        case (actionTypes.LOGIN_SUCCESS):
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.data.user,
                isAuthenticated: true

            }

        case (actionTypes.LOGOUT):
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false
            }

        case (actionTypes.FORGOT_PASSWORD):
            return {
                ...state,
                forgotPasswordStatus: true
            }

        case (actionTypes.RESET_FORGOT_PASSWORD_STATUS):
            return {
                ...state,
                forgotPasswordStatus: false
            }

        case (actionTypes.RESET_PASSWORD_SUCCESS):
            return {
                ...state,
                resetPasswordSuccess: true
            }

        case (actionTypes.RESET_PASSWORD_SUCCESS_STATUS):
            return {
                ...state,
                resetPasswordSuccess: false
            }

        case (actionTypes.GET_USER):
            return {
                ...state,
                user: action.payload.data.user
            }
        
        case (actionTypes.RESET_MY_PASSWORD):
            return {
                ...state,
                resetPasswordSuccess: true
            }

        

        default:
            return state
    }
}


export default authReducer;