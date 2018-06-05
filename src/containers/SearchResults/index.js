import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import SearchResults from '../../components/Common/SearchResults';

const mapStateToProps = ({
  searchText,
  profile,
  allData: {
    searchResults: bucketlists,
  },
}, ownProps) => ({
  searchText,
  bucketlists,
  profile,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
