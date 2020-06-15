
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const register = (username, email, password) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({
            username,
            email,
            password
        });

        await axios.post('http://localhost:8080/auth/register', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.REGISTER_SUCCESS,
        });

    }catch(err){
        console.log(err.response);

        dispatch({
            type: actionTypes.REGISTER_ERROR,
            payload: err.response.data.error.message
        });
        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            });
        }, 3000);
    }
}

export const resetRegisterStatus = () => {
    return {
        type: actionTypes.RESET_REGISTER_STATUS
    }
}


export const login = (email, password) => async (dispatch) => {
    

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({
            email,
            password
        });

        const res = await axios.post('http://localhost:8080/auth/login', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        })



    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            payload: err.response.data.error
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
    }
}



export const logout = () => {
    return {
        type: actionTypes.LOGOUT
    }
}


export const resetPasswordRequest = (email) => async (dispatch) => {

    try{

        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        };

        const body = JSON.stringify({email});

        await axios.post('http://localhost:8080/auth/forgotPassword', body, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.FORGOT_PASSWORD
        });

        
    }catch(err){
        console.log(err.response);
        dispatch({
            type: actionTypes.RESET_PASSWORD_ERR,
            payload: err.response.data.error
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
    }

}


export const resetPasswordForgotStatus = () => {
    return {
        type: actionTypes.RESET_FORGOT_PASSWORD_STATUS
    }
}

export const resetPassword = (password, token) => async (dispatch) => {

    try{

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify({
            password: password
        });
    

        const res = await axios.post(`http://localhost:8080/auth/resetPassword/${token}`, body, config);
        console.log(res.data);
        dispatch({
            type: actionTypes.RESET_PASSWORD_SUCCESS
        })

    }catch(err){
        console.log(err.response);
        dispatch({
            type: actionTypes.RESET_PASSWORD_ERR,
            payload: err.response.data.error
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
    }
}

export const resetPasswordSuccessStatus = () => {
    return {
        type: actionTypes.RESET_PASSWORD_SUCCESS_STATUS
    }
}



export const resetMyPassword = (currentPassword, newPassword) => async (dispatch, getState) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': getState().auth.token
            }
        }

        const body = JSON.stringify({
            currentPassword: currentPassword,
            newPassword: newPassword
        });

        await axios.post('http://localhost:8080/auth/resetMyPassword', body, config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.RESET_MY_PASSWORD
        })


    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERROR,
            // payload: err.response.data.error
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
    }
}






export const getUser = (token) => async (dispatch) => {

    try{

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (token){
            config.headers['auth-token'] = token;
        }

        // const res = await axios.get('/auth/user', config);
        const res = await axios.get('http://localhost:8080/auth/user', config);
        // console.log(res.data);
        dispatch({
            type: actionTypes.GET_USER,
            payload: res.data
        });


    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.GET_USER_FAIL,
            // payload: err.response.data.error
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);
        
    }
}