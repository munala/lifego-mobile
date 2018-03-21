/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Text from '../../../../Common/SuperText';
import styles from '../../styles/';
import propTypes from './propTypes';

const getTags = (bucketlist) => {
  if (bucketlist.tags) {
    const tags = bucketlist.tags.split(',').map((tag, index) => ({
      key: index,
      name: tag,
      label: tag,
    }));
    tags.shift();
    return tags;
  }
  return [];
};

const SingleCard = ({
  bucketlist, createdAt, time, showComments, setLikeColor, like, imageHeights,
  bucketList, toggleComments, profile, comm, onSubmit, selectBucketlist, onChange,
}) => (
  <View
    key={bucketlist.id}
    style={styles.bucketlist}
  >
    <View style={styles.bucketlistHeader}>
      <Image
        style={styles.avatar}
        source={
          bucketlist.userPictureUrl ?
            { uri: (
              bucketlist.userPictureUrl.replace(
                (bucketlist.userPictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
                'https://',
              )
            ) } :
            require('../../../../../assets/images/user.png')
        }
      />
      <View style={styles.nameTime}>
        <View style={styles.headDetails}>
          <Text style={styles.leftHeaderContent}>{`${bucketlist.userDisplayName}\n`}</Text>
          <Text style={styles.time}>{createdAt}{time}</Text>
        </View>
        <View style={styles.headDetails}>
          {
            bucketlist.location ?
              <View style={styles.locationCategory}>
                <View style={styles.location}>
                  <Icon style={styles.titleIcon} size={10} name="place" />
                  <Text style={styles.rightHeaderContent}>{`${bucketlist.location || ''}\n`}</Text>
                </View>
                {!!bucketlist.category &&
                  <View style={styles.location}>
                    <Icon style={styles.titleIcon} size={10} name="event-note" />
                    <Text style={styles.rightHeaderContent}>{bucketlist.category || ''}</Text>
                  </View>
                }
              </View> :
              <View style={styles.location}>
                {!!bucketlist.category && <Icon style={styles.titleIcon} size={10} name="event-note" />}
                <Text style={styles.rightHeaderContent}>{`${bucketlist.category || ''}\n`}</Text>
              </View>
          }
        </View>
      </View>
    </View>
    <View style={styles.bucketlistBody}>
      <View style={styles.description}>
        <TouchableOpacity style={styles.link} href={`bucketlists/${bucketlist.id}`}>
          <View>
            <Text style={styles.blue}>{bucketlist.name}</Text>
            {
              !!bucketlist.description &&
              <Text style={styles.grey}>{bucketlist.description}</Text>
            }
          </View>
        </TouchableOpacity>
      </View>
      {!!bucketlist.pictureUrl &&
        <Image
          source={{ uri: (
            bucketlist.pictureUrl.replace(
              (bucketlist.pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
              'https://',
            )
          ) }}
          style={[styles.image, imageHeights[bucketlist.name]]}
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
        <View style={[styles.likesComments, { width: 40 }]}>
          <TouchableOpacity
            style={styles.iconStyle}
            onPress={() => like(bucketlist)}
            hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
          >
            <Icon name="star" size={20} color={setLikeColor(bucketlist)} />
          </TouchableOpacity>
          {
            bucketlist.likes && bucketlist.likes.length > 0 &&
            <Text style={styles.span}>
              {bucketlist.likes.length}
            </Text>
          }
        </View>
        <Button
          onPress={() => toggleComments(bucketlist)}
          textStyle={styles.commentButton}
          buttonStyle={styles.buttonStyle}
          text={`${bucketlist.comments.length} comment${bucketlist.comments.length !== 1 ? 's' : ''}`}
        />
      </View>
      {
        showComments &&
        bucketList.id === bucketlist.id &&
        <View>
          <View style={styles.commentSection}>
            {
              bucketlist.comments.map(comment => (
                <View
                  key={comment.id}
                  style={styles.comment}
                >
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              ))
            }
          </View>
          <View style={styles.newComment}>
            <Image
              style={styles.currentAvatar}
              source={profile.pictureUrl ? { uri: profile.pictureUrl } : require('../../../../../assets/images/user.png')}
            />
            <TextInput
              type="text"
              placeholder="type comment"
              style={[
                styles.inputText, {
                  flexBasis: (
                    comm.content.length > 0 &&
                    bucketList.id === bucketlist.id
                  ) ? '70%' : '85%',
                },
              ]}
              onFocus={() => selectBucketlist(bucketlist)}
              value={bucketList.id === bucketlist.id ? comm.content : ''}
              onChangeText={onChange}
            />
            {
              comm.content.length > 0 &&
              bucketList.id === bucketlist.id &&
              <TouchableOpacity
                text="POST"
                style={styles.value}
                onPress={event => onSubmit(event)}
              >
                <View>
                  <Text style={styles.label}>POST</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
        </View>
      }
    </View>
  </View>
);

SingleCard.propTypes = propTypes;

SingleCard.defaultProps = {
  bucketList: {
    id: '',
    comments: [],
    items: [],
  },
  selectBucketlist: () => {},
};

export default SingleCard;
