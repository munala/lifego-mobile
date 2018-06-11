/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  Animated,
} from 'react-native';

import EditProfileForm from '../EditProfileForm';
import ProfilePic from './ProfilePic';
import ProfileActions from './ProfileActions';
import FriendsAndFollowers from './FriendsAndFollowers';
import styles from '../styles';

const ProfileBody = ({
  marginTop,
  height,
  opacity,
  profile,
  editProfileProps,
  openEditProfileMode,
  activeType,
  scrollEnabled,
  listHeight,
  scrollY,
  avatar,
  profileId,
  showUserProfile,
  removeFriend,
  addFriend,
  isFriend,
  sendMessage,
  toggleType,
  goToProfile,
}) => (
  <View style={styles.profileBodyStyle}>
    <Animated.View style={[styles.profileWrapper, {
      marginTop,
    }]}
    >
      <ProfilePic
        height={height}
        avatar={avatar}
      />
      <EditProfileForm {...editProfileProps} />
      <ProfileActions
        opacity={opacity}
        profile={profile}
        showUserProfile={showUserProfile}
        removeFriend={removeFriend}
        addFriend={addFriend}
        profileId={profileId}
        sendMessage={sendMessage}
        openEditProfileMode={openEditProfileMode}
        activeType={activeType}
        toggleType={toggleType}
        isFriend={isFriend}
      />
    </Animated.View>
    <FriendsAndFollowers
      profile={profile}
      addFriend={addFriend}
      removeFriend={removeFriend}
      activeType={activeType}
      opacity={opacity}
      scrollEnabled={scrollEnabled}
      listHeight={listHeight}
      scrollY={scrollY}
      goToProfile={goToProfile}
      isFriend={isFriend}
      profileId={profileId}
    />
  </View>
);

ProfileBody.propTypes = {
  marginTop: PropTypes.shape({}).isRequired,
  height: PropTypes.shape({}).isRequired,
  opacity: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  scrollY: PropTypes.shape({}).isRequired,
  editProfileProps: PropTypes.shape({
    uploading: PropTypes.bool.isRequired,
    formHeight: PropTypes.shape({}).isRequired,
    changePhoto: PropTypes.func.isRequired,
    displayName: PropTypes.shape({}).isRequired,
    onChange: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    profile: PropTypes.shape({}).isRequired,
    avatar: PropTypes.string,
    onSave: PropTypes.func.isRequired,
  }).isRequired,
  openEditProfileMode: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired,
  scrollEnabled: PropTypes.bool.isRequired,
  listHeight: PropTypes.number.isRequired,
  avatar: PropTypes.string,
  showUserProfile: PropTypes.bool.isRequired,
  removeFriend: PropTypes.func.isRequired,
  addFriend: PropTypes.func.isRequired,
  isFriend: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  toggleType: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
  profileId: PropTypes.number.isRequired,
};

ProfileBody.defaultProps = {
  avatar: null,
};

export default ProfileBody;
