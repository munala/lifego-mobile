import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { navigate } from '../../actions/navigationActions';
import TabIcons from '../../components/Drawer/Home/TabIcon';

const mapStateToProps = (state, ownProps) => {
  const counts = {};
  let count = 0;
  const types = {
    HomeBucketlists: 'allData',
    Messages: 'conversations',
    UserAlerts: 'alerts',
    Notifications: 'notifications',
  };

  ownProps.navigationState.routes.forEach(({ routeName: type }) => {
    if (types[type] === 'conversations') {
      state[types[type]].forEach((conversation) => {
        let unread = false;
        conversation.messages.forEach((message) => {
          if (!message.read && message.receiverId === state.profile.id) { unread = true; }
        });
        if (unread) { count += 1; }
      });
    } else if (types[type] !== 'allData') {
      state[types[type]].forEach((alert) => {
        if (!alert.read) {
          count += 1;
        }
      });
    }
    counts[type] = count;
    count = 0;
  });
  return ({
    ...ownProps,
    counts,
  });
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators({ navigate }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TabIcons);
