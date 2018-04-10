import * as types from './actionTypes';

export const navigate = ({ navigator, route }) => dispatch => dispatch({
  type: types.NAVIGATE,
  navigator,
  route,
});

export const setParams = ({ navigator, params }) => dispatch => dispatch({
  type: types.SET_PARAMS,
  navigator,
  params,
});
