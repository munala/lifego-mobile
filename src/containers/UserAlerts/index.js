import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as alertActions from '../../actions/userAlertActions';
import * as userActions from '../../actions/userActions';
import { navigate } from '../../actions/navigationActions';
import UserAlerts from '../../components/Drawer/Home/UserAlerts';

const mapStateToProps = ({
  profile,
  alerts,
  currentApiCalls: {
    userAlerts: currentApiCalls,
  },
}, ownProps) => ({
  profile,
  alerts,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...alertActions, ...userActions, navigate }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAlerts);
