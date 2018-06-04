import { connect } from 'react-redux';

import Home from '../../containers/Home';

const mapStateToProps = ({
  HomeTabNav: nav,
  AllBucketlistNavigator,
}) => ({
  nav,
  AllBucketlistNavigator,
});

export default connect(mapStateToProps)(Home);
