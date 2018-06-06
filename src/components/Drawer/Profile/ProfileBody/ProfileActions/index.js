import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  View,
  TouchableOpacity,
} from 'react-native';

import Text from '../../../../Common/SuperText';
import styles from '../../styles';

class ProfileActions extends Component {
  renderStats = (userProfile) => {
    const { activeType, toggleType } = this.props;
    return ['Followers', 'Friends'].map(type => (
      <TouchableOpacity
        key={type}
        style={[styles.stat, activeType === type && styles.statActive]}
        onPress={() => toggleType(type)}
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

  render() {
    const {
      opacity,
      profile,
      showUserProfile,
      removeFriend,
      addFriend,
      sendMessage,
      openEditProfileMode,
      isFriend,
    } = this.props;

    return (
      <Animated.View style={[styles.profileView, {
        opacity,
      }]}
      >
        <Text style={styles.profileName}>
          {profile.displayName || 'no name'}
        </Text>
        {!showUserProfile &&
        <Text style={styles.profileEmail} numberOfLines={1}>
          {profile.email}
        </Text>
        }
        {
          showUserProfile ?
            <View>
              <TouchableOpacity
                style={[styles.profileAction, isFriend(profile) && styles.removeAction]}
                onPress={() => (
                  isFriend(profile) ?
                    removeFriend(profile) :
                    addFriend(profile)
                )}
              >
                <Text
                  style={[
                    styles.profileActionText,
                    isFriend(profile) && styles.removeActionText,
                  ]}
                >
                  {isFriend(profile) ? 'Remove' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.profileAction}
                onPress={() => sendMessage(profile)}
              >
                <Text style={styles.profileActionText}>Send message</Text>
              </TouchableOpacity>
            </View> :
            <TouchableOpacity
              style={styles.profileAction}
              onPress={openEditProfileMode}
            >
              <Text style={styles.profileActionText}>Edit Profile</Text>
            </TouchableOpacity>
        }
        <View style={styles.profileStats} >
          {this.renderStats(profile)}
        </View>
      </Animated.View>
    );
  }
}

ProfileActions.propTypes = {
  opacity: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({
    friends: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
    })).isRequired,
  }).isRequired,
  showUserProfile: PropTypes.bool.isRequired,
  removeFriend: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  isFriend: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  openEditProfileMode: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired,
  toggleType: PropTypes.func.isRequired,
};

export default ProfileActions;
