/* eslint-disable global-require */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as messageActions from '../../actions/messageActions';
import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import Conversations from '../../components/Drawer/Home/Messages/MessageList';

const mapStateToProps = ({
  profile,
  conversations,
  currentApiCalls: { messages: currentApiCalls },
}, ownProps) => ({
  profile,
  conversations,
  currentApiCalls,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversations);
