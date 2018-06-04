import * as types from '../actions/actionTypes';
import initialState from './initialState';


export default(
  state = initialState.tags,
  action,
) => {
  switch (action.type) {
    case types.ADD_TAG:
      return [action.tag, ...state];

    case types.GET_TAGS:
      return action.tags;

    default:
      return state;
  }
};
