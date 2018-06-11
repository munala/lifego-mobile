/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  View,
} from 'react-native';

import Text from '../../../../Common/SuperText';
import styles from '../../styles';

class FriendsAndFollowers extends Component {
  isLastPerson = (index) => {
    const { profile, activeType } = this.props;
    const isLast = profile[activeType.toLowerCase()].length === index + 1;

    return isLast;
  }

  renderPeople = (userProfile) => {
    const {
      addFriend,
      removeFriend,
      activeType,
      isFriend,
      profileId,
    } = this.props;

    return userProfile ?
      userProfile[activeType.toLowerCase()].map(person => (
        <TouchableOpacity
          key={person.id}
          style={styles.person}
          onPress={() => this.props.goToProfile(person.id)}
          activeOpacity={1}
        >
          <Image
            style={styles.personPic}
            source={person.pictureUrl ?
              { uri: person.pictureUrl.replace('http://', 'https://') } :
              require('../../../../../assets/images/user.png')}
          />
          <Text numberOfLines={1} style={styles.personName}>
            {person.displayName || 'no name'}
          </Text>
          {
            profileId !== person.id &&
            <TouchableOpacity
              style={[styles.personAction, isFriend(person) && styles.removeAction]}
              onPress={() => (isFriend(person) ? removeFriend(person) : addFriend(person))}
            >
              <Text
                style={[styles.actionText, isFriend(person) && styles.removeActionText]}
              >
                {isFriend(person) ? 'Remove' : 'Add'}
              </Text>
            </TouchableOpacity>
          }
        </TouchableOpacity>
      )) :
      <View />;
  }

  render() {
    const {
      profile,
      activeType,
      opacity,
      scrollEnabled,
      listHeight,
      scrollY,
    } = this.props;

    return (
      profile[activeType.toLowerCase()].length === 0 ?
        <Animated.View style={[styles.profileBody, { opacity }]} >
          <Text style={styles.noPeople}>You have no {activeType.toLowerCase()}</Text>
        </Animated.View> :
        <Animated.View style={[styles.profileBody, styles.list, {
          opacity,
        }]}
        >
          <ScrollView
            scrollEnabled={scrollEnabled}
            style={[styles.borderRadius, {
              height: listHeight + 20,
            }]}
            contentContainerStyle={[styles.scrollView, {
              height: listHeight + 20,
            }]}
            scrollEventThrottle={16}
            onScroll={
              Platform.OS === 'ios' ?
                Animated.event([{
                  nativeEvent: { contentOffset: { y: scrollY } },
                }]) :
                () => {}
            }
          >
            {this.renderPeople(profile)}
          </ScrollView>
        </Animated.View>
    );
  }
}

FriendsAndFollowers.propTypes = {
  profile: PropTypes.shape({
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  isFriend: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  removeFriend: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired,
  opacity: PropTypes.shape({}).isRequired,
  scrollEnabled: PropTypes.bool.isRequired,
  listHeight: PropTypes.number.isRequired,
  scrollY: PropTypes.shape({}).isRequired,
  goToProfile: PropTypes.func.isRequired,
  profileId: PropTypes.number.isRequired,
};

export default FriendsAndFollowers;
