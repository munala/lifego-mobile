/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../Common/SuperText';
import { logout } from '../../../../actions/userActions';
import styles from '../styles';

export default connect(
  ({ profile }) => ({ ...profile }),
  dispatch => ({
    actions: bindActionCreators({ logout }, dispatch),
  }),
)(class Account extends Component {
  static propTypes = {
    pictureUrl: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    actions: PropTypes.shape({
      logout: PropTypes.func.isRequired,
    }).isRequired,
  }

  state = {
    open: false,
  }

  toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }

  render = () => {
    const { pictureUrl, displayName, email } = this.props;
    const { open } = this.state;
    return (
      <View style={styles.account} >
        <Image
          style={styles.image}
          source={require('../../../../images/bucketlist_front.jpg')}
        />
        <Image
          style={styles.profilePic}
          source={
            pictureUrl ?
              { uri: pictureUrl.replace('http://', 'https://') } :
              require('../../../../assets/images/user.png')}
        />
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.toggle}
        >
          <View style={styles.all}>
            <View style={styles.details}>
              <Text style={styles.displayName}>{displayName}</Text>
              <Text style={styles.email}>{email}</Text>
            </View>
            {open &&
              <TouchableOpacity
                onPress={this.props.actions.logout}
                style={styles.logout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={styles.icon}>
            <Icon
              type="material-icons"
              name={open ? 'arrow-drop-up' : 'arrow-drop-down'}
              color="#fff"
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
});
