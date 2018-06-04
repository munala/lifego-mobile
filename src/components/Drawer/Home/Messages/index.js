import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import MessageNavigator from '../../../../navigators/messages';
import { addMessageListener } from '../../../../store/configureStore';
import styles from '../styles';

const Messages = ({ dispatch, nav }) => (
  <View style={styles.container}>
    <MessageNavigator navigation={
      addNavigationHelpers({
        dispatch,
        state: nav,
        addMessageListener,
      },
      )}
    />
  </View>
);

Messages.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
};

export default Messages;
