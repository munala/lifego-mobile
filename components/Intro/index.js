/* eslint-disable global-require */
import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../Common/SuperText';
import { navigate } from '../../actions/navigationActions';
import styles from './styles';

const features = [
  {
    image: true,
    icon: 'home',
    description: 'Welcome to LifeGo',
  },
  {
    icon: 'insert-photo',
    description: 'Add photos to your bucketlists',
  },
  {
    icon: 'comment',
    description: 'Comment on other people\'s bucketlists',
  },
  {
    icon: 'star',
    description: 'Star other people\'s bucketlists',
  },
  {
    icon: 'room',
    description: 'Add locations to your bucketlists',
  },
  {
    icon: 'schedule',
    description: 'Get reminders of your bucketlists due dates',
  },
  {
    icon: 'person-pin',
    description: 'Tag people on your bucketlists (coming soon)',
  },
];

const navigateToLogin = (nav) => {
  nav({ route: 'user', navigator: 'AuthNavigator' });
  AsyncStorage.setItem('notFirstTime', 'true');
};

const Intro = ({ actions: { navigate: nav } }) => (
  <View style={styles.container}>
    <Image
      style={styles.image}
      source={require('../../images/bucketlist_front.jpg')}
    />
    <AppIntro
      onDoneBtnClick={() => navigateToLogin(nav)}
      onSkipBtnClick={() => navigateToLogin(nav)}
      customStyles={{ btnContainer: { flex: 1 } }}
    >
      {features.map(feature => (
        <View style={styles.slide} key={feature.icon}>
          <View level={-10}>
            {feature.image ?
              <Image
                style={styles.logo}
                source={require('../../assets/icons/icon.png')}
              /> :
              <Icon
                name={feature.icon}
                type="material-icons"
                size={150}
                color="#00bcd4"
                containerStyle={styles.icon}
                underlayColor="#00bcd4"
              />
            }
          </View>
          <View level={20}>
            <Text style={feature.image ? styles.title : styles.text}>
              {feature.description}
            </Text>
          </View>
        </View>
      ))}
    </AppIntro>
  </View>
);

Intro.propTypes = {
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, dispatch => ({
  actions: bindActionCreators({ navigate }, dispatch),
}))(Intro);
