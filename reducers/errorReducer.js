import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function errorReducer(state = initialState.error, action) {
  switch (action.type) {
    case types.SHOW_ERROR:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
}
