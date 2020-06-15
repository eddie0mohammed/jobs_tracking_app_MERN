
import {combineReducers} from 'redux';

import authReducer from './AuthReducer';
import errorReducer from './ErrorReducer';
import jobsReducer from './JobsReducer';

const rootReducer = combineReducers({
    
    auth: authReducer,
    error: errorReducer,
    jobs: jobsReducer

});

export default rootReducer;