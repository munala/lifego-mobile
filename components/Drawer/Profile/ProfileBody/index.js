/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  TouchableOpacity,
  Animated,
  Text,
  ScrollView,
  Platform,
} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import EditProfileForm from '../EditProfileForm';
import styles from '../styles';

const ProfileBody = ({
  marginTop,
  height,
  opacity,
  profile,
  editProfileProps,
  openEditProfileMode,
  renderStats,
  renderPeople,
  activeType,
  scrollEnabled,
  listHeight,
  scrollY,
  avatar,
}) => (
  <View style={styles.profileBodyStyle}>
    <Animated.View style={[
      styles.profileWrapper,
      {
        marginTop,
      },
    ]}
    >
      <Animated.View
        style={[
          styles.profilePicWrapper,
          {
            height,
            width: height,
            borderRadius: 50,
          },
        ]}
      >
        <Image
          style={styles.profilePic}
          indicator={Progress.Pie}
          source={
            avatar ?
              { uri: avatar.replace('http://', 'https://') } :
              require('../../../../assets/images/user.png')}
        />
      </Animated.View>
      <EditProfileForm {...editProfileProps} />
      <Animated.View style={[styles.profileView, { opacity }]}>
        <Text style={styles.profileName}>{profile.displayName || 'no name'}</Text>
        <Text style={styles.profileEmail}>
          {profile.email}
        </Text>
        <TouchableOpacity
          style={styles.profileAction}
          onPress={openEditProfileMode}
        >
          <Text style={styles.profileActionText}>Edit Profile</Text>
        </TouchableOpacity>
        <View style={styles.profileStats} >
          {renderStats()}
        </View>
      </Animated.View>
    </Animated.View>
    {
      profile[activeType.toLowerCase()].length === 0 ?
        <Animated.View style={[styles.profileBody, { opacity }]} >
          <Text style={styles.noPeople}>You have no {activeType.toLowerCase()}</Text>
        </Animated.View> :
        <Animated.View style={[styles.profileBody, styles.list, { opacity }]}>
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
            {renderPeople()}
          </ScrollView>
        </Animated.View>
    }
  </View>
);

ProfileBody.propTypes = {
  marginTop: PropTypes.shape({}).isRequired,
  height: PropTypes.shape({}).isRequired,
  opacity: PropTypes.shape({}).isRequired,
  profile: PropTypes.shape({}).isRequired,
  scrollY: PropTypes.shape({}).isRequired,
  editProfileProps: PropTypes.shape({}).isRequired,
  openEditProfileMode: PropTypes.func.isRequired,
  renderStats: PropTypes.func.isRequired,
  renderPeople: PropTypes.func.isRequired,
  activeType: PropTypes.string.isRequired,
  scrollEnabled: PropTypes.bool.isRequired,
  listHeight: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default ProfileBody;
