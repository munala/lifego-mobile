import * as types from '../actions/actionTypes';
import initialState from './initialState';

const actionTypeEndsInSuccess = actionType => actionType.substring(actionType.length - 8) === '_SUCCESS';

export default(
  state = initialState.message,
  action,
) => {
  if (actionTypeEndsInSuccess(action.type)) {
    return action.message;
  } else if (action.type === types.RESET_MESSAGE) {
    return '';
  }
  return state;
};
