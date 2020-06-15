

import * as actionTypes from '../Actions/ActionTypes';



const initialState = {
    jobs: [],

}


const jobsReducer = (state = initialState, action) => {


    switch (action.type){

        case (actionTypes.GET_ALL_JOBS):
            return {
                ...state,
                jobs: action.payload.data.jobs
            }

        case (actionTypes.CREATE_NEW_JOB):
            return {
                ...state,
                jobs: [...state.jobs, action.payload]
            }

        case (actionTypes.UPDATE_JOB):  
            const allJobs = [...state.jobs];
            const currentJobIndex = allJobs.findIndex(elem => elem._id === action.payload._id);
            allJobs[currentJobIndex] = {...action.payload};
         
            return {
                ...state,
                jobs: allJobs
            }

        case (actionTypes.DELETE_JOB):
            const filteredJobs = [...state.jobs].filter(elem => elem._id !== action.payload);
            return {
                ...state,
                jobs: filteredJobs
            }

        
        case (actionTypes.SET_JOB_NULL):
            return {
                ...state,
                jobs: []
            }

        default:
            return state;
    }
}

export default jobsReducer;