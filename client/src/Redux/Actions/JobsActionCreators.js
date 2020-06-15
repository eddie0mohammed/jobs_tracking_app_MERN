
import axios from 'axios';

import * as actionTypes from './ActionTypes';


export const getAllJobs = () => async (dispatch, getState) => {

    try{
        const token = getState().auth.token;
        if (!token){
            return {
                status: 'fail',
                error: 'Unauthorized'
            };
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }

        const res = await axios.get('http://localhost:8080/jobs', config);
        // console.log(res.data);
        
        dispatch({
            type: actionTypes.GET_ALL_JOBS,
            payload: res.data
        });

        


    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERROR,
            payload: 'Failed to get jobs'
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);

        
    }
}


export const createNewJob = (companyName, jobUrl, resume, coverLetter) => async (dispatch, getState) => {

    try{

        const token = getState().auth.token;
        if (!token){
            return {
                status: 'fail',
                error: 'Unauthorized'
            };
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        };

        // const body = JSON.stringify({companyName : companyName});
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('jobUrl', jobUrl);
        formData.append("resume", resume, resume.filename);
        formData.append('coverLetter', coverLetter, coverLetter.filename);

        const res = await axios.post('http://localhost:8080/jobs', formData, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.CREATE_NEW_JOB,
            payload: res.data.data.job
        })
        
        return res.data;

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error.message
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);

        return {
            status: 'fail'
        }
    }
}

export const updateJob = (companyName, status, jobURL, date, resume, coverLetter, id) => async (dispatch, getState) => {

    try {
        const token = getState().auth.token;
        if (!token){
            return {
                status: 'fail',
                error: 'Unauthorized'
            };
        }

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            }
        }

        // const body = JSON.stringify({
        //     companyName,
        //     status, 
        //     date
        // });
        const formData = new FormData();
        formData.append('companyName', companyName);
        formData.append('status', status);
        formData.append('date', date);
        formData.append('jobURL', jobURL);
        if (resume){
            formData.append('resume', resume, resume.filename);
        }
        if (coverLetter){
            formData.append('coverLetter', coverLetter, coverLetter.filename);
        }
        const res = await axios.patch(`http://localhost:8080/jobs/${id}`, formData, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.UPDATE_JOB,
            payload: res.data.data.job
        });

        return res.data;

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERR,
            payload: err.response.data.error.message
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);

        return {
            status: 'fail'
        }
    }
}


export const deleteJob = (id) => async (dispatch, getState) => {

    try{
        const token = getState().auth.token;
        if (!token){
            return {
                status: 'fail',
                error: 'Unauthorized'
            };
        }

        const config = {
            headers: {
                'auth-token': token
            }
        }

        const res = await axios.delete(`http://localhost:8080/jobs/${id}`, config);
        // console.log(res.data);

        dispatch({
            type: actionTypes.DELETE_JOB,
            payload: id
        });

        return res.data;

    }catch(err){
        console.log(err);
        dispatch({
            type: actionTypes.ERROR,
            payload: 'Failed to create new job'
        });

        setTimeout(() => {
            dispatch({
                type: actionTypes.CLEAR_ERRORS
            })
        }, 3000);

        return {
            status: 'fail'
        }
    }
}



export const resetJobState = () => {
    return {
        type: actionTypes.SET_JOB_NULL
    }
}