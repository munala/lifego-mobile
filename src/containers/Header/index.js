import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { searchBucketlists, clearSearch as clearBucketlists } from '../../actions/bucketlistActions';
import { logout, searchUsers } from '../../actions/userActions';
import * as searchActions from '../../actions/searchActions';
import Header from '../../components/Common/Header';

const mapStateToProps = ({
  searchText,
  components: { showHeader },
}, ownProps) => ({
  searchText,
  showHeader,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchBucketlists,
    clearBucketlists,
    logout,
    searchUsers,
    ...searchActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
