import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import UserComponent from '../../components/User';
import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';


const mapStateToProps = ({
  error,
  message,
  currentApiCalls: { user: currentApiCalls },
  ...state
}) => ({
  ...state,
  currentApiCalls,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserComponent);
