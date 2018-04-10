import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default (state = initialState.navigationData, action) => {
  switch (action.type) {
    case types.NAVIGATE:
      return {
        ...state,
        [action.navigator]: {
          ...state[action.navigator],
          route: action.route,
        },
      };

    case types.SET_PARAMS:
      return {
        ...state,
        [action.navigator]: {
          ...state[action.navigator],
          params: action.params,
        },
      };

    default:
      return state;
  }
};
