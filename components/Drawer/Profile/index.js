/* eslint-disable global-require */
import React from 'react';
import { View, Text, Image, TouchableHighlight, ScrollView, Animated } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import * as userActions from '../../../actions/userActions';
import Header from '../../Common/Header';
import propTypes from './propTypes';
import styles from './styles';

class Profile extends BaseClass {
  state = {
    activeType: 'Followers',
    scrollY: new Animated.Value(0),
  }

  componentWillMount = () => {
    this.props.actions.getProfile();
  };

  componentWillReceiveProps = async ({ error }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    }
  }

  renderStats = () => {
    const { activeType } = this.state;
    const { profile } = this.props;
    return ['Followers', 'Friends'].map(type => (
      <TouchableHighlight
        underlayColor="transparent"
        style={[styles.stat, activeType === type && styles.statActive]}
        onPress={() => this.toggleType(type)}
      >
        <View style={styles.statWrapper} >
          <Text
            style={[styles.statCount, activeType === type && styles.statCountActive]}
          >
            {profile[activeType.toLowerCase()] ? profile[type.toLowerCase()].length : 0}
          </Text>
          <Text
            style={[styles.statLabel, activeType === type && styles.statLabelActive]}
          >
            {type}
          </Text>
        </View>
      </TouchableHighlight>
    ));
  }

  renderPeople = () => {
    const { activeType } = this.state;
    const { actions: { addFriend, removeFriend }, profile } = this.props;
    return profile ?
      profile[activeType.toLowerCase()].map((person, index) => (
        <View style={[styles.person, this.isLastPerson(index) && styles.lastPerson]}>
          <Image
            style={styles.personPic}
            source={
              person.pictureUrl ?
                { uri: person.pictureUrl.replace('http://', 'https://') } :
                require('../../../assets/images/user.png')
            }
          />
          <Text style={styles.personName}>{person.displayName || 'no name'}</Text>
          <TouchableHighlight
            underlayColor="transparent"
            style={[styles.personAction, this.isFriend(person) && styles.removeAction]}
            onPress={() => (this.isFriend(person) ? removeFriend(person) : addFriend(person))}
          >
            <Text
              style={[styles.actionText, this.isFriend(person) && styles.removeActionText]}
            >
              {this.isFriend(person) ? 'Remove' : 'Add'}
            </Text>
          </TouchableHighlight>
        </View>
      )) :
      <View />
    ;
  }

  render() {
    const { activeType } = this.state;
    const { actions: { logout }, profile, navigation: { navigate }, nav } = this.props;
    const height = this.state.scrollY.interpolate({
      inputRange: [0, 5],
      outputRange: [100, 0],
      extrapolate: 'clamp',
    });
    const marginTop = this.state.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [0, -150],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.container}>
        <Header
          title="PROFILE"
          leftIcon="menu"
          onPressLeft={() => navigate('DrawerOpen')}
          search={this.search}
          mode="profile"
          clearSearch={this.clearSearch}
          logout={logout}
          navigate={nav}
          handleResults={this.handleResults}
        />
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
              source={
                profile.pictureUrl ?
                  { uri: profile.pictureUrl.replace('http://', 'https://') } :
                  require('../../../assets/images/user.png')}
            />
          </Animated.View>
          <Text style={styles.profileName}>Oliver Munala</Text>
          <Text style={styles.profileEmail}>oliver.munala@andela.com</Text>
          <TouchableHighlight style={styles.profileAction} >
            <Text style={styles.profileActionText}>Edit Profile</Text>
          </TouchableHighlight>
          <View style={styles.profileStats} >
            {this.renderStats()}
          </View>
        </Animated.View>
        <View style={styles.profileBody} >
          <ScrollView
            contentContainerStyle={{ height: 60 * profile[activeType.toLowerCase()].length }}
            scrollEventThrottle={16}
            onScroll={Animated.event([{
              nativeEvent: { contentOffset: { y: this.state.scrollY } },
            }])}
          >
            <View>
              {this.renderPeople()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

Profile.propTypes = propTypes;

const mapStateToProps = ({ profile }) => ({ profile });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ ...userActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
