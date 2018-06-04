import { connect } from 'react-redux';

import Conversations from '../../components/Drawer/Home/Messages';

export default connect(({
  MessageNavigator: nav,
}) => ({
  nav,
}))(Conversations);
