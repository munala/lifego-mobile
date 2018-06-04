import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bucketlistActions from '../../actions/bucketlistActions';
import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import Lists from '../../components/Drawer/List/Bucketlists';

const mapStateToProps = ({
  currentApiCalls: calls,
  allData,
  data: myData,
  profile,
}, { screen }) => {
  const currentApiCalls = calls[screen];
  const loaderCalls = calls.loader;
  const data = screen === 'allBucketlists' ? allData : myData;

  return ({
    currentApiCalls,
    data,
    loaderCalls,
    profile,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Lists);
