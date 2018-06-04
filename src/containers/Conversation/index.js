import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as messageActions from '../../actions/messageActions';
import * as userActions from '../../actions/userActions';
import * as navigationActions from '../../actions/navigationActions';
import Conversation from '../../components/Drawer/Home/Messages/Conversation';

const mapStateToProps = ({
  profile,
  conversations,
}, {
  navigation: { state },
}) => {
  let param = {};
  let conversation;

  if (state && state.params) {
    const { params, params: { id, newConversation } } = state;
    param = params;

    if (newConversation) {
      conversation = conversations
        .filter(chat => chat.senderId === newConversation.senderId
          && chat.receiverId === newConversation.receiverId)[0];
    } else {
      conversation = conversations.filter(chat => chat.id === id)[0];
    }
  }

  return ({
    params: param,
    profile,
    conversation,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...messageActions,
    ...userActions,
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
