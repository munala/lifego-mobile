/* eslint-disable global-require */
import React from 'react';
import { View, TouchableHighlight, Image, TextInput } from 'react-native';
import { PropTypes } from 'prop-types';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../styles/';

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
            { uri: bucketlist.userPictureUrl.replace('http://', 'https://') } :
            require('../../../../../assets/images/user.png')
        }
      />
      <View style={styles.nameTime}>
        <View style={styles.headDetails}>
          <Text style={styles.leftHeaderContent}>{`${bucketlist.userDisplayName}\n`}</Text>
          <Text style={{ fontSize: 10, fontWeight: 'normal', color: 'grey' }}>{createdAt}{time}</Text>
        </View>
        <View style={styles.headDetails}>
          {
            bucketlist.location ?
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', height: 12, alignItems: 'center' }}>
                  <Icon style={styles.titleIcon} name="place" />
                  <Text style={styles.rightHeaderContent}>{`${bucketlist.location || ''}\n`}</Text>
                </View>
                {!!bucketlist.category &&
                  <View style={{ display: 'flex', flexDirection: 'row', height: 12, alignItems: 'center' }}>
                    <Icon style={styles.titleIcon} name="event-note" />
                    <Text style={styles.rightHeaderContent}>{bucketlist.category || ''}</Text>
                  </View>
                }
              </View> :
              <View style={{ display: 'flex', flexDirection: 'row', height: 12, alignItems: 'center' }}>
                {!!bucketlist.category && <Icon style={styles.titleIcon} name="event-note" />}
                <Text style={styles.rightHeaderContent}>{`${bucketlist.category || ''}\n`}</Text>
              </View>
          }
        </View>
      </View>
    </View>
    <View style={styles.bucketlistBody}>
      <View style={styles.description}>
        <TouchableHighlight style={styles.link} href={`bucketlists/${bucketlist.id}`}>
          <View>
            <Text style={styles.blue}>{bucketlist.name}</Text>
            {
              !!bucketlist.description &&
              <Text style={styles.grey}>{bucketlist.description}</Text>
            }
          </View>
        </TouchableHighlight>
      </View>
      {!!bucketlist.pictureUrl &&
        <Image
          source={{ uri: bucketlist.pictureUrl.replace('http://', 'https://') }}
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
          <TouchableHighlight
            style={styles.iconStyle}
            onPress={() => like(bucketlist)}
            underlayColor="#fff"
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
          >
            <Icon name="star" color={setLikeColor(bucketlist)} />
          </TouchableHighlight>
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
          buttonStyle={{
            backgroundColor: '#f7f7f7',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: 5,
          }}
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
              source={profile.pictureUrl ? { uri: profile.pictureUrl.replace('http', 'https') } : require('../../../../../assets/images/user.png')}
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
              <TouchableHighlight
                text="POST"
                style={styles.value}
                underlayColor="#f7f7f7"
                onPress={event => onSubmit(event)}
              >
                <View>
                  <Text style={styles.label}>POST</Text>
                </View>
              </TouchableHighlight>
            }
          </View>
        </View>
      }
    </View>
  </View>
);

SingleCard.propTypes = {
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
  createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  time: PropTypes.string.isRequired,
  showComments: PropTypes.bool.isRequired,
  bucketList: PropTypes.shape({}),
  toggleComments: PropTypes.func.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  comm: PropTypes.shape({}).isRequired,
  imageHeights: PropTypes.shape({}).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLikeColor: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  selectBucketlist: PropTypes.func,
  onChange: PropTypes.func.isRequired,
};

SingleCard.defaultProps = {
  bucketList: {
    id: '',
    comments: [],
    items: [],
  },
  selectBucketlist: () => {},
};

export default SingleCard;
