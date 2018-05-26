/* eslint-disable global-require */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Text from '../../Common/SuperText';
import BaseClass from './BaseClass';
import propTypes from './propTypes';
import styles from './styles';

class BaseClass2 extends BaseClass {
  goBack = async () => {
    const [from, ...routes] = this.props.previousRoutes;
    const [newFrom] = routes;
    if (from === 'Profile') {
      const [previousId, ...newIds] = this.props.previousIds;
      this.props.actions.navigate({
        params: { viewProfile: true, previousIds: newIds, previousRoutes: routes, from: newFrom },
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
          from: undefined,
          viewProfile: false,
          previousIds: undefined,
        },
      });
      this.props.actions.navigate({
        navigator: 'DrawerNav',
        route: from,
      });
    }
  }

  sendMessage = async (receiver) => {
    const newConversation = {
      senderId: this.props.profile.id,
      senderDisplayName: this.props.profile.displayName,
      senderUsername: this.props.profile.username,
      senderPictureUrl: this.props.profile.pictureUrl,
      receiverId: receiver.id,
      receiverPictureUrl: receiver.pictureUrl,
      receiverUsername: receiver.username,
      receiverDisplayName: receiver.displayName,
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
      params: { id: null, newConversation },
    });
  }
  renderStats = (userProfile) => {
    const { activeType } = this.state;
    return ['Followers', 'Friends'].map(type => (
      <TouchableOpacity
        key={type}
        style={[styles.stat, activeType === type && styles.statActive]}
        onPress={() => this.toggleType(type)}
      >
        <View style={styles.statWrapper} >
          <Text
            style={[styles.statCount, activeType === type && styles.statCountActive]}
          >
            {userProfile[activeType.toLowerCase()] ? userProfile[type.toLowerCase()].length : 0}
          </Text>
          <Text
            style={[styles.statLabel, activeType === type && styles.statLabelActive]}
          >
            {type}
          </Text>
        </View>
      </TouchableOpacity>
    ));
  }

  renderPeople = (userProfile) => {
    const { activeType } = this.state;
    const { actions: { addFriend, removeFriend }, profile } = this.props;
    return userProfile ?
      userProfile[activeType.toLowerCase()].map((person, index) => (
        <TouchableOpacity
          key={person.id}
          style={[styles.person, this.isLastPerson(index) && styles.lastPerson]}
          onPress={() => this.goToProfile(person.id)}
          activeOpacity={1}
        >
          <Image
            style={styles.personPic}
            source={person.pictureUrl ?
              { uri: person.pictureUrl.replace('http://', 'https://') } :
              require('../../../assets/images/user.png')}
          />
          <Text style={styles.personName}>{person.displayName || 'no name'}</Text>
          {
            profile.id !== person.id &&
            <TouchableOpacity
              style={[styles.personAction, this.isFriend(person) && styles.removeAction]}
              onPress={() => (this.isFriend(person) ? removeFriend(person) : addFriend(person))}
            >
              <Text
                style={[styles.actionText, this.isFriend(person) && styles.removeActionText]}
              >
                {this.isFriend(person) ? 'Remove' : 'Add'}
              </Text>
            </TouchableOpacity>
          }
        </TouchableOpacity>
      )) :
      <View />;
  }
}

BaseClass2.propTypes = propTypes;

export default BaseClass2;
