/* eslint-disable global-require */
import React from 'react';
import { PropTypes } from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import styles from '../../../Home/styles/';
import Text from '../../../../Common/SuperText';

const CardContent = ({
  bucketlist,
  imageDimensions,
  getTags,
  setLikeColor,
  profile,
  like,
  toggleItems,
  toggleComments,
  goToBucketlist,
}) => (
  <TouchableWithoutFeedback onPress={goToBucketlist}>
    <View>
      <View style={styles.description}>
        <View style={styles.link} >
          <Text style={styles.blue}>{bucketlist.name}</Text>
          {
            !!bucketlist.description &&
            <Text style={styles.grey}>{bucketlist.description}</Text>
          }
        </View>
      </View>
      {!!bucketlist.pictureUrl &&
      <Image
        indicator={Progress.Pie}
        color="#fff"
        resizeMethod="resize"
        source={{
          uri: (
            bucketlist.pictureUrl.replace(
              (bucketlist.pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
              'https://',
            )
          ),
        }}
        style={[styles.image, imageDimensions]}
      />
      }
      <View style={styles.tagList}>
        {
          getTags(bucketlist).map(tag => (
            <Text
              key={getTags(bucketlist).indexOf(tag)}
              style={styles.hashTag}
            >
    #{tag.label}
            </Text>
          ))
        }
      </View>
      <View style={styles.likesComments}>
        <View style={[styles.likesComments, { width: 100, justifyContent: 'flex-start' }]}>
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => like(bucketlist)}
            hitSlop={{
              top: 10, left: 10, bottom: 10, right: 10,
            }}
          >
            <Icon name="star" size={20} color={setLikeColor(bucketlist, profile)} />
          </TouchableOpacity>
          {
            bucketlist.likes && bucketlist.likes.length > 0 &&
            <Text style={styles.span}>
              {bucketlist.likes.length}
            </Text>
          }
        </View>
        <Button
          onPress={() => toggleItems(bucketlist)}
          textStyle={styles.commentButton}
          buttonStyle={styles.buttonStyle}
          text={`${bucketlist.items.length} item${bucketlist.items.length !== 1 ? 's' : ''}`}
        />
        <Button
          onPress={() => toggleComments(bucketlist)}
          textStyle={styles.commentButton}
          buttonStyle={styles.buttonStyle}
          text={`${bucketlist.comments.length} comment${bucketlist.comments.length !== 1 ? 's' : ''}`}
        />
      </View>
    </View>
  </TouchableWithoutFeedback>
);

CardContent.propTypes = {
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
  imageDimensions: PropTypes.shape({}).isRequired,
  getTags: PropTypes.func.isRequired,
  setLikeColor: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  toggleItems: PropTypes.func.isRequired,
  toggleComments: PropTypes.func.isRequired,
  goToBucketlist: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default CardContent;
