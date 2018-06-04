import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../actions/navigationActions';
import Home from '../../components/Drawer/Home';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
  }, dispatch),
  dispatch,
});

export default connect(null, mapDispatchToProps)(Home);
