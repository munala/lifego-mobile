import { combineReducers } from 'redux';
import data from './bucketlistReducer';
import auth from './authReducer';
import error from './errorReducer';
import currentApiCalls from './apiCallReducer';

const rootReducer = combineReducers({
  data,
  auth,
  error,
  currentApiCalls,
});

export default rootReducer;
