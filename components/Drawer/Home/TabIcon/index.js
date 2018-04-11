
import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import { connect } from 'react-redux';

import Text from '../../../Common/SuperText';
import styles from '../styles';

const TabIcon = ({
  name,
  tintColor,
  count,
}) => (
  <IconBadge
    MainElement={
      <Icon
        name={name}
        size={20}
        color={tintColor}
        containerStyle={styles.tabIcon}
      />
    }
    BadgeElement={
      <Text style={styles.badgeElement}>{count}</Text>
    }
    IconBadgeStyle={styles.iconBadge}
    Hidden={count === 0}
  />
);

TabIcon.propTypes = {
  name: PropTypes.string.isRequired,
  tintColor: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let count = 0;
  if (ownProps.type === 'conversations') {
    state[ownProps.type].forEach((conversation) => {
      let unread = false;
      conversation.messages.forEach((message) => {
        if (!message.read && message.receiverId === state.profile.id) { unread = true; }
      });
      if (unread) { count += 1; }
    });
  } else if (ownProps.type !== 'allData') {
    state[ownProps.type].forEach((alert) => {
      if (!alert.read) {
        count += 1;
      }
    });
  }
  return ({
    ...ownProps,
    count,
  });
};

export default connect(mapStateToProps)(TabIcon);
