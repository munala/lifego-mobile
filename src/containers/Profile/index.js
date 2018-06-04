import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import Profile from '../../components/Drawer/Profile';

const mapStateToProps = (
  {
    profile,
    otherProfile,
    currentApiCalls: {
      profile: currentApiCalls,
    },
  },
  { navigation: { state } },
) => {
  let viewProfile;
  let fromRoute;
  let previousIds;
  let previousRoutes;
  if (state && state.params) {
    viewProfile = state.params.viewProfile;
    fromRoute = state.params.fromRoute;
    previousIds = state.params.previousIds;
    previousRoutes = state.params.previousRoutes || [fromRoute];
  }
  return ({
    profile,
    otherProfile,
    currentApiCalls,
    viewProfile,
    fromRoute,
    previousIds,
    previousRoutes });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...userActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
