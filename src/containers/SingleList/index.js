import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../actions/navigationActions';
import * as bucketlistActions from '../../actions/bucketlistActions';
import SingleList from '../../components/Drawer/List/Bucketlist';

const mapStateToProps = ({
  profile,
  allData: { bucketlists },
},
{
  navigation: { state },
}) => {
  let bucketlist;
  let param = {};
  let navigator = '';

  if (state && state.params) {
    param = state.params;
    navigator = param.navigator;
    bucketlist = bucketlists.filter(buck => buck.id === param.bucketlist.id)[0];
  }

  return ({
    profile,
    bucketlist,
    navigator,
    params: param,
    current: 'bucketlist',
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
    ...bucketlistActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleList);
