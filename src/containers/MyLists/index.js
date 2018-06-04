import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../actions/navigationActions';
import * as bucketlistActions from '../../actions/bucketlistActions';
import MyLists from '../../components/Drawer/MyBucketlists';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
    ...bucketlistActions,
  }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(MyLists);
