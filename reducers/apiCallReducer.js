import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(actionType) {
  return actionType.indexOf('SUCCESS') !== -1;
}

export default function apiCallReducer(
  state = initialState.currentApiCalls,
  action,
) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  } else if (action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)) {
    return state - 1;
  }
  return state;
}
