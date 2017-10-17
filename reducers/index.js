import { combineReducers } from 'redux';
import data from './bucketlistReducer';
import auth from './authReducer';
import error from './errorReducer';

const rootReducer = combineReducers({
  data,
  auth,
  error,
});

export default rootReducer;
