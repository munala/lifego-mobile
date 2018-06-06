import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import styles from '../../styles';

const ProfilePic = ({
  height,
  avatar,
}) => (
  <Animated.View
    style={[styles.profilePicWrapper, {
      height,
      width: height,
      borderRadius: 50,
    }]}
  >
    <Image
      style={styles.profilePic}
      indicator={Progress.Pie}
      source={{
        uri: avatar ? avatar.replace('http://', 'https://') :
          'https://res.cloudinary.com/lifego/image/upload/v1515139053/user.png',
      }}
    />
  </Animated.View>
);

ProfilePic.propTypes = {
  height: PropTypes.shape({}).isRequired,
  avatar: PropTypes.string,
};

ProfilePic.defaultProps = {
  avatar: null,
};

export default ProfilePic;
