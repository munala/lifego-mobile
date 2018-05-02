
import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../../../Common/SuperText';
import { navigate } from '../../../../actions/navigationActions';
import styles from '../styles';

const TabIcon = ({
  navigation: { state },
  counts,
  navigate: navigateTabs,
}) => {
  const { routes } = state;
  const names = {
    HomeBucketlists: 'home',
    Messages: 'message',
    UserAlerts: 'person-add',
    Notifications: 'notifications',
  };

  const activeTintColor = '#00bcd4';
  const inactiveTintColor = 'gray';

  return (
    <View style={styles.tabBarOptions}>
      {routes && routes.map((route, index) => {
        const focused = index === state.index;
        const tintColor = focused ? activeTintColor : inactiveTintColor;
        const count = counts[route.routeName];
        return (
          <TouchableWithoutFeedback
            key={route.key}
            styles={styles.tab}
            onPress={() => navigateTabs({ route: route.routeName, navigator: 'HomeTabNav' })}
          >
            <View style={{ height: '100%', width: '25%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
              <Icon
                name={names[route.routeName]}
                size={focused ? 25 : 20}
                color={tintColor}
                containerStyle={styles.tabIcon}
              />
              {count > 0 && <Text style={styles.badgeElement}>{count}</Text> }
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
};

TabIcon.propTypes = {
  navigate: PropTypes.func.isRequired,
  counts: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      index: PropTypes.number.isRequired,
      routes: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string,
        routeName: PropTypes.string,
      })).isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const counts = {};
  let count = 0;
  const types = {
    HomeBucketlists: 'allData',
    Messages: 'conversations',
    UserAlerts: 'alerts',
    Notifications: 'notifications',
  };

  ownProps.navigationState.routes.forEach(({ routeName: type }) => {
    if (types[type] === 'conversations') {
      state[types[type]].forEach((conversation) => {
        let unread = false;
        conversation.messages.forEach((message) => {
          if (!message.read && message.receiverId === state.profile.id) { unread = true; }
        });
        if (unread) { count += 1; }
      });
    } else if (types[type] !== 'allData') {
      state[types[type]].forEach((alert) => {
        if (!alert.read) {
          count += 1;
        }
      });
    }
    counts[type] = count;
    count = 0;
  });
  return ({
    ...ownProps,
    counts,
  });
};

const mapDispatchToProps = dispatch => ({ ...bindActionCreators({ navigate }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TabIcon);
