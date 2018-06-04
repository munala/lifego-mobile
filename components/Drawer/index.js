import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';

import { loadAllBucketlists, loadBucketlists } from '../../actions/bucketlistActions';
import { getConversations } from '../../actions/messageActions';
import { getNotifications } from '../../actions/notificationActions';
import { getAlerts } from '../../actions/userAlertActions';
import { getProfile } from '../../actions/userActions';
import { navigate } from '../../actions/navigationActions';
import DrawerNav from '../../navigators/drawer';
import { addDrawerListener } from '../../store/configureStore';

class Drawer extends Component {
  componentDidMount = () => {
    Object.keys(this.props.actions)
      .forEach(key => (key !== 'navigate' ? this.props.actions[key](0, 10) : null));
  }

  render() {
    return (
      <DrawerNav navigation={
        addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
          addDrawerListener,
        },
        )}
      />
    );
  }
}

Drawer.propTypes = {
  actions: PropTypes.shape({
    loadAllBucketlists: PropTypes.func.isRequired,
    loadBucketlists: PropTypes.func.isRequired,
    getConversations: PropTypes.func.isRequired,
    getNotifications: PropTypes.func.isRequired,
    getAlerts: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ DrawerNav: nav }) => ({ nav });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadAllBucketlists,
    loadBucketlists,
    getConversations,
    getNotifications,
    getAlerts,
    getProfile,
    navigate,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);
