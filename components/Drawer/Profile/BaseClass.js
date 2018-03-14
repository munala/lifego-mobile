import { Component } from 'react';
import {
  Animated,
} from 'react-native';

import propTypes from './propTypes';

class BaseClass extends Component {
  isFriend = (person) => {
    const { friends } = this.props.profile;
    const isaFriend = friends
      .map(friend => friend.id)
      .indexOf(person.id) !== -1;
    return isaFriend;
  }

  isLastPerson = (index) => {
    const { activeType } = this.state;
    const { profile } = this.props;
    const isLast = profile[activeType.toLowerCase()].length === index + 1;
    return isLast;
  }

  toggleType = (activeType) => {
    this.setState({ activeType });
  }

  handleHeader = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.offset ? 'down' : 'up';
    const showHeader = direction === 'up';
    if (showHeader) {
      return Animated.spring(this.marginTop, {
        toValue: -250,
        duration: 200,
      }).start();
    }
    return Animated.spring(this.marginTop, {
      toValue: 0,
      duration: 200,
    }).start();
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
