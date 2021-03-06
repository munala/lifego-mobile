import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(actionType) {
  return actionType.substring(actionType.length - 8) === '_SUCCESS';
}

export default function apiCallReducer(
  state = initialState.currentApiCalls,
  action,
) {
  const screen = action.screen || 'others';
  if (action.type === types.BEGIN_API_CALL) {
    return {
      ...state,
      [screen]: state[screen] + 1,
    };
  } else if (action.type === types.API_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
    return {
      ...state,
      [screen]: state[screen] - 1,
    };
  }
  return state;
}
