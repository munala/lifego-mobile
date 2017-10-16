import {combineReducers} from 'redux';
import data from './bucketlistReducer';
import loggedIn from './authReducer';
import currentApiCalls from './apiCallReducer';

const rootReducer = combineReducers({
  data,
  currentApiCalls,
  loggedIn
});

export default rootReducer;
