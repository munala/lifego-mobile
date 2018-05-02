import React from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import MyBucketlistNavigator from '../../../navigators/myBucketlists';
import { addMyListener } from '../../../store/configureStore';

const StackNav = ({ dispatch, nav }) => (
  <MyBucketlistNavigator navigation={
    addNavigationHelpers({
      dispatch,
      state: nav,
      addMyListener,
    },
    )}
  />
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
