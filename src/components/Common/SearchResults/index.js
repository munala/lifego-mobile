/* eslint-disable global-require */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import {
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

import Text from '../SuperText';
import styles from './styles';

class SearchResults extends Component {
  state = {
    bucketlistMode: true,
  }

  toggleMode = (bucketlistMode) => {
    this.setState({ bucketlistMode });
  }

  isFriend = (id) => {
    const { friends } = this.props.profile;

    return friends.some(friend => friend.id === id);
  }

  goToProfile = async ({ id }) => {
    const {
      actions: { navigate, getOtherProfile },
    } = this.props;

    getOtherProfile(id);

    await navigate({
      route: 'Profile',
      navigator: 'DrawerNav',
      params: {
        fromRoute: 'Home',
        viewProfile: true,
      },
    });
  }

  renderOptions = person => (
    <TouchableOpacity
      style={[styles.personAction, this.isFriend(person.id) && styles.removeAction]}
      onPress={() => (this.isFriend(person.id) ?
        this.props.actions.removeFriend(person) :
        this.props.actions.addFriend(person))
      }
    >
      <Text
        style={[styles.actionText, this.isFriend(person.id) && styles.removeActionText]}
      >
        {this.isFriend(person.id) ? 'Remove' : 'Add'}
      </Text>
    </TouchableOpacity>
  )

  renderBucketlists = (bucketlists, onItemPress) => bucketlists && bucketlists.map(result => (
    <ListItem
      key={result.id}
      title={result.name}
      subtitle={result.description || 'no description'}
      containerStyle={styles.resultContainerStyle}
      wrapperStyle={styles.resultWrapperStyle}
      titleStyle={styles.title}
      subtitleStyle={styles.subtitle}
      onPress={() => onItemPress(result)}
      hideChevron
    />
  ))

  renderUsers = searchUsers => searchUsers.map(person => (
    <ListItem
      key={person.id}
      avatar={person.pictureUrl ?
        { uri: person.pictureUrl.replace('http://', 'https://') } :
        require('../../../assets/images/user.png')}
      roundAvatar
      title={person.displayName}
      containerStyle={styles.resultContainerStyle}
      wrapperStyle={styles.resultWrapperStyle}
      titleStyle={styles.personTitle}
      rightIcon={this.renderOptions(person)}
      onPress={() => this.goToProfile(person)}
    />
  ))

  render() {
    const { bucketlistMode } = this.state;
    const {
      bucketlists, onItemPress, profile: { searchUsers },
    } = this.props;

    return (
      <ScrollView>
        <View style={styles.options}>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: bucketlistMode ? 'grey' : 'transparent' }]}
            onPress={() => this.toggleMode(true)}
          >
            <Text style={[styles.optionText, { color: bucketlistMode ? '#f7f7f7' : 'grey' }]}>bucketlists</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { backgroundColor: !bucketlistMode ? 'grey' : 'transparent' }]}
            onPress={() => this.toggleMode(false)}
          >
            <Text style={[styles.optionText, { color: !bucketlistMode ? '#f7f7f7' : 'grey' }]}>users</Text>
          </TouchableOpacity>
        </View>
        <List containerStyle={styles.results}>
          {
            bucketlistMode ?
              this.renderBucketlists(bucketlists, onItemPress) :
              this.renderUsers(searchUsers)
          }
        </List>
      </ScrollView>
    );
  }
}

SearchResults.propTypes = {
  bucketlists: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  })),
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  actions: PropTypes.shape({
    removeFriend: PropTypes.func.isRequired,
    addFriend: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  onItemPress: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  bucketlists: [],
};

export default SearchResults;
