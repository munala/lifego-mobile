/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import ProfileBody from './ProfileBody';
import * as userActions from '../../../actions/userActions';
import * as navigationActions from '../../../actions/navigationActions';
import Header from '../../Common/Header';
import Text from '../../Common/SuperText';
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
    showUserProfile: Boolean(this.props.viewProfile),
  }

  componentDidMount = () => {
    if (!this.props.profile.id) {
      this.props.actions.getProfile();
    }
  };

  componentDidUpdate = ({ error, profile }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    } else if (this.props.profile !== profile) {
      this.setState({
        profile,
      });
    }
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

  render() {
    const {
      activeType, scrollEnabled, editMode, uploading, scrollY,
    } = this.state;
    const {
      profile, currentApiCalls, otherProfile,
    } = this.props;
    const { showUserProfile } = this.state;
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

    const listHeight = 60 * (showUserProfile ? otherProfile : profile)[activeType.toLowerCase()]
      .length;
    const [firstName, lastName] = (this.state.profile.displayName || '').split(' ');
    const displayName = {};
    displayName['first name'] = firstName;
    displayName['last name'] = lastName;

    const editProfileProps = {
      uploading,
      formHeight,
      changePhoto: this.changePhoto,
      displayName,
      onChange: this.onChange,
      cancel: this.cancel,
      profile,
      avatar,
      onSave: this.onSave,
    };

    const profileBodyProps = {
      marginTop,
      height,
      opacity,
      profile: showUserProfile ? otherProfile : profile,
      editProfileProps,
      openEditProfileMode: this.openEditProfileMode,
      renderStats: this.renderStats,
      renderPeople: this.renderPeople,
      activeType,
      scrollEnabled,
      listHeight,
      scrollY,
      avatar,
      showUserProfile,
      isFriend: this.isFriend,
      removeFriend: this.props.actions.removeFriend,
      addFriend: this.props.actions.addFriend,
    };

    return (
      <View style={styles.container}>
        <Header
          title="Profile"
          leftIcon={showUserProfile ? (Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back') : 'menu'}
          onPressLeft={showUserProfile ? this.goBack : () => this.props.navigation.navigate('DrawerOpen')}
          mode="profile"
        />
        {currentApiCalls > 0 && !this.state.uploading &&
          <View style={styles.activity}>
            <ActivityIndicator color="#fff" size="large" />
          </View>
        }
        <ProfileBody {...profileBodyProps} />
      </View>
    );
  }
}

Profile.propTypes = propTypes;

const mapStateToProps = ({
  navigationData: { profile: { params: { viewProfile } } },
  profile, otherProfile, currentApiCalls,
}) => ({ profile, otherProfile, currentApiCalls, viewProfile });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...userActions, ...navigationActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
