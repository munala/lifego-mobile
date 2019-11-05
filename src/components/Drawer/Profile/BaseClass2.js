import BaseClass from './BaseClass';
import propTypes from './propTypes';

class BaseClass2 extends BaseClass {
  goBack = async () => {
    const [from, ...routes] = this.props.previousRoutes;
    const [newFrom] = routes;
    if (from === 'Profile') {
      const [previousId, ...newIds] = this.props.previousIds;
      this.props.actions.navigate({
        params: {
          viewProfile: true,
          previousIds: newIds,
          previousRoutes: routes,
          fromRoute: newFrom,
        },
        navigator: 'DrawerNav',
        route: 'Profile',
      });
      this.props.actions.getOtherProfile(previousId || this.props.profile.id);
    } else {
      await this.props.actions.navigate({
        navigator: 'DrawerNav',
        route: 'Profile',
        params: {
          previousRoutes: undefined,
          viewProfile: false,
          previousIds: undefined,
          fromRoute: undefined,
        },
      });
      this.props.actions.navigate({
        navigator: 'DrawerNav',
        route: this.state.fromRoute,
      });
    }
  }

  isFriend = (person) => {
    const { friends } = this.props.profile;

    return friends.some(friend => friend.id === person.id && person.id);
  }

  sendMessage = async (receiver) => {
    const newConversation = {
      senderId: this.props.profile.id,
      receiverId: receiver.id,
    };
    await this.props.actions.navigate({
      route: 'Home',
      navigator: 'DrawerNav',
    });
    await this.props.actions.navigate({
      route: 'Messages',
      navigator: 'HomeTabNav',
    });
    this.props.actions.navigate({
      route: 'Conversation',
      navigator: 'MessageNavigator',
      params: {
        id: null,
        newConversation,
      },
    });
  }
}

BaseClass2.propTypes = propTypes;

export default BaseClass2;
