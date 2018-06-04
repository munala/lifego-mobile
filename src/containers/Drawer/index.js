import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadAllBucketlists, loadBucketlists } from '../../actions/bucketlistActions';
import { getConversations } from '../../actions/messageActions';
import { getNotifications } from '../../actions/notificationActions';
import { getAlerts } from '../../actions/userAlertActions';
import { getProfile } from '../../actions/userActions';
import { navigate } from '../../actions/navigationActions';
import Drawer from '../../components/Drawer';

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

export default connect(null, mapDispatchToProps)(Drawer);
