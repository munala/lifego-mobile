import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as notificationActions from '../../actions/notificationActions';
import * as navigationActions from '../../actions/navigationActions';
import Notifications from '../../components/Drawer/Home/Notifications';

const mapStateToProps = ({
  profile,
  notifications,
  currentApiCalls: {
    notifications: currentApiCalls,
  },
}, ownProps) => ({
  profile,
  notifications: notifications.map(({ read, ...notification }) => ({
    ...notification,
    read: typeof notification === 'string' ? read === 'true' : read,
  })),
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...notificationActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
