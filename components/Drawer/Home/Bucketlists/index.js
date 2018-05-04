import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Icon } from 'react-native-elements';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';

import AllBucketlistNavigator from '../../../../navigators/allBucketlists';
import styles from '../styles';
import { addAllListener } from '../../../../store/configureStore';

class HomeView extends Component {
  static navigationOptions = {
    tabBarIcon: ({ focused }) => (<Icon name="home" size={25} color={focused ? '#fff' : 'grey'} />),
  }

  render() {
    return (
      <View style={styles.container}>
        <AllBucketlistNavigator navigation={
          addNavigationHelpers({
            dispatch: this.props.dispatch,
            state: this.props.nav,
            addAllListener,
          },
          )}
        />
      </View>
    );
  }
}

HomeView.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
};

const mapStateToProps = ({ AllBucketlistNavigator: nav }) => ({
  nav,
});

export default connect(mapStateToProps)(HomeView);
