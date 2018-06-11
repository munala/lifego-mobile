/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  Platform,
  BackHandler,
} from 'react-native';

import BaseClass from './BaseClass2';
import ProfileBody from './ProfileBody';
import Header from '../../../containers/Header';
import propTypes from './propTypes';
import styles from './styles';

class Profile extends BaseClass {
  state = {
    activeType: 'Followers',
    scrollY: new Animated.Value(0),
    uploadingImage: false,
    scrollEnabled: true,
    editMode: false,
    image: null,
    uploading: false,
    profile: { ...this.props.profile },
    fromRoute: this.props.fromRoute,
  }

  componentDidMount = () => {
    if (!this.props.profile.id) {
      this.props.actions.getProfile();
    }

    BackHandler.addEventListener('hardwareBackPress', () => {
      if (this.state.editMode) {
        this.cancel();
        return true;
      }

      if (this.props.fromRoute) {
        this.goBack();
        return true;
      }

      this.props.actions.navigate({
        route: 'Home',
        navigator: 'DrawerNav',
      });

      return true;
    });
  };

  componentDidUpdate = ({ error, profile }) => {
    if (!error && this.props.profile !== profile) {
      this.setState({
        profile,
      });
    }
  }

  render() {
    const {
      activeType, scrollEnabled, editMode, uploading, scrollY,
    } = this.state;

    const {
      profile,
      currentApiCalls,
      otherProfile,
      fromRoute: from,
    } = this.props;

    const { profile: { id: profileId } } = this.state;

    const showUserProfile = !!from && otherProfile.id !== profile.id;
    const avatar = showUserProfile ? otherProfile.pictureUrl : this.state.profile.pictureUrl;

    const height = this.state.scrollY.interpolate({
      inputRange: [0, 5],
      outputRange: [editMode ? 75 : 100, 0],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
    const marginTop = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -160],
      extrapolate: 'clamp',
    });
    const formHeight = this.animationFactor.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 300],
    });
    const opacity = this.animationFactor.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0],
    });

    const listHeight = 60 * (
      showUserProfile ? otherProfile : profile
    )[activeType.toLowerCase()]
      .length;

    const [firstName, lastName] = (this.state.profile.displayName || '').split(' ');
    const displayName = {};
    displayName['first name'] = firstName;
    displayName['last name'] = lastName;

    const editProfileProps = {
      uploading,
      formHeight,
      displayName,
      profile,
      avatar,
      changePhoto: this.changePhoto,
      onChange: this.onChange,
      cancel: this.cancel,
      onSave: this.onSave,
    };

    const profileBodyProps = {
      marginTop,
      height,
      opacity,
      editProfileProps,
      activeType,
      scrollEnabled,
      listHeight,
      scrollY,
      avatar,
      showUserProfile,
      profile: showUserProfile ? otherProfile : profile,
      profileId,
      sendMessage: this.sendMessage,
      toggleType: this.toggleType,
      goToProfile: this.goToProfile,
      isFriend: this.isFriend,
      openEditProfileMode: this.openEditProfileMode,
      removeFriend: this.props.actions.removeFriend,
      addFriend: this.props.actions.addFriend,
    };

    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          leftIcon={from ? (Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back') : 'menu'}
          onPressLeft={
            from ?
              this.goBack :
              () => this.props.actions.navigate({
                route: 'DrawerOpen',
                navigator: 'DrawerNav',
              })}
          mode="profile"
        />
        {
          currentApiCalls > 0 &&
          !this.state.uploading &&
          <View style={styles.activity}>
            <ActivityIndicator color="#00bcd4" size="large" />
          </View>
        }
        <ProfileBody {...profileBodyProps} />
      </View>
    );
  }
}

Profile.propTypes = propTypes;

export default Profile;
