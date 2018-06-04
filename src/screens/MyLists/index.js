import { connect } from 'react-redux';

import MyLists from '../../containers/MyLists';

const mapStateToProps = ({
  MyBucketlistNavigator: nav,
}) => ({
  nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MyLists);
