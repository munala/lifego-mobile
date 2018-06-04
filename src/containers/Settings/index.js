import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import Settings from '../../components/Drawer/Settings';

const mapStateToProps = ({
  profile,
  currentApiCalls: {
    settings: currentApiCalls,
  },
}) => ({
  profile,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
