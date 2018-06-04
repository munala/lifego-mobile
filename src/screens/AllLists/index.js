import { connect } from 'react-redux';
import HomeView from '../../components/Drawer/Home/Bucketlists';

const mapStateToProps = ({
  AllBucketlistNavigator: nav,
}) => ({
  nav,
});

export default connect(mapStateToProps)(HomeView);
