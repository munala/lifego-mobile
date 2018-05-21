import { NavigationActions } from 'react-navigation';

export const navigate = ({
  navigator,
  route,
  params,
}) => (dispatch) => {
  dispatch({
    navigator,
    ...NavigationActions.navigate({
      routeName: route,
      params,
    }),
  });
  if (navigator === 'DrawerNav' && route !== 'DrawerOpen') {
    dispatch({
      navigator,
      ...NavigationActions.navigate({
        routeName: 'DrawerClose',
      }),
    });
  }
};

export const setParams = ({
  navigator,
  params,
  key,
}) => dispatch => dispatch({
  navigator,
  ...NavigationActions.setParams({
    params,
    key,
  }),
});
