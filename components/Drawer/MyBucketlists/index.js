import React from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import Header from '../../Common/Header';
import MyBucketlistNavigator from '../../../navigators/myBucketlists';
import { addMyListener } from '../../../store/configureStore';
import styles from '../Home/styles';

const StackNav = ({ dispatch, nav }) => (
  <View style={styles.container}>
    <Header
      title="My Lists"
      leftIcon="menu"
      onPressLeft={() => dispatch({
        navigator: 'DrawerNav',
        ...NavigationActions.navigate({
          routeName: 'DrawerOpen',
        }),
      })}
      onFocus={this.onFocus}
      clearSearch={this.clearSearch}
      mode="myBucketlists"
    />
    <MyBucketlistNavigator navigation={
      addNavigationHelpers({
        dispatch,
        state: nav,
        addMyListener,
      },
      )}
    />
  </View>
);

StackNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ MyBucketlistNavigator: nav }) => ({
  nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(StackNav);
