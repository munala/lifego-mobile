import { combineReducers } from 'redux';
import data from './bucketlistReducer';
import auth from './authReducer';

const rootReducer = combineReducers({
  data,
  auth,
});

export default rootReducer;
