/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { View, TouchableOpacity, Image as Img } from 'react-native';
import styles from '../../styles/';
import Text from '../../../../Common/SuperText';

const CardHeader = ({
  goToBucketlist,
  bucketlist,
  createdAt,
  time,
  openMenu,
  goToProfile,
}) => (
  <TouchableOpacity
    activeOpacity={1}
    onPress={goToBucketlist}
    onLongPress={() => openMenu(bucketlist, 'showMenu')}
    delayLongPress={500}
    style={styles.bucketlistHeader}
  >
    <TouchableOpacity
      onPress={() => goToProfile({ id: bucketlist.userId })}
      onLongPress={() => openMenu(bucketlist, 'showMenu')}
      delayLongPress={500}
      activeOpacity={1}
    >
      <Img
        style={styles.avatar}
        source={
          bucketlist.userPictureUrl ?
            {
              uri: (
                bucketlist.userPictureUrl.replace(
                  (bucketlist.userPictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
                  'https://',
                )
              ),
            } :
            require('../../../../../assets/images/user.png')
        }
      />
    </TouchableOpacity>
    <View style={styles.nameTime}>
      <View style={styles.headDetails}>
        <TouchableOpacity
          onPress={() => goToProfile({ id: bucketlist.userId })}
          style={styles.leftUser}
        >
          <Text style={styles.leftHeaderContent} numberOfLines={1}>
            {`${bucketlist.userDisplayName}\n`}
          </Text>
        </TouchableOpacity>
        <Text style={styles.time} numberOfLines={1}>
          {`${createdAt}${time}`}
        </Text>
      </View>
      <View style={styles.headDetails}>
        <View style={styles.location}>
          <Text style={styles.rightHeaderContent} numberOfLines={1}>
            {`${bucketlist.location || bucketlist.category || ' '}`}
          </Text>
          {
            (bucketlist.location || bucketlist.category) &&
            <Icon
              style={styles.locationIcon}
              size={10}
              name={bucketlist.location ? 'place' : 'event-note'}
            />
          }
        </View>
        <View style={styles.location}>
          <Text style={styles.rightHeaderContent} numberOfLines={1}>
            {bucketlist.location ? (bucketlist.category || ' ') : ' '}
          </Text>
          {
            bucketlist.location &&
            bucketlist.category &&
            <Icon
              style={styles.titleIcon}
              size={10}
              name="event-note"
            />
          }
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

CardHeader.propTypes = {
  bucketlist: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      done: PropTypes.bool,
    })),
    comments: PropTypes.arrayOf(PropTypes.shape({
      content: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
    })),
  }).isRequired,
  goToBucketlist: PropTypes.func.isRequired,
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  time: PropTypes.string.isRequired,
  openMenu: PropTypes.func.isRequired,
  goToProfile: PropTypes.func.isRequired,
};

export default CardHeader;
