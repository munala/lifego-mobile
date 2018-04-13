/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../../Common/SuperText';
import styles from '../../styles';

class Comments extends Component {
  state = {
    page: Math.floor(this.props.bucketlist.comments.length / 10),
  }

  navigatePage = (direction) => {
    this.setState({
      page: this.state.page + (direction === 'next' ? 1 : -1),
    });
  }

  deleteComment = (comment) => {
    Alert.alert(
      'Delete comment?',
      null,
      [
        { text: 'Cancel', onPress: () => {} },
        {
          text: 'OK',
          onPress: async () => {
            await this.props.deleteComment(this.props.bucketlist, comment);
          },
        },
      ],
      { cancelable: true },
    );
  }

  render = () => {
    const {
      bucketlist, bucket, profile, onChange, selectBucketlist,
      onSubmit, comm, setTime, selectComment, selectedComment,
    } = this.props;
    const { page } = this.state;
    const lastPage = Math.floor(this.props.bucketlist.comments.length / 10);
    return (
      <View>
        <View style={styles.commentSection}>
          {
            bucketlist.comments.length > 0 &&
            page < lastPage &&
            <TouchableOpacity
              style={styles.value}
              onPress={() => this.navigatePage('next')}
            >
              <Text style={styles.commentNavigator}>more comments</Text>
            </TouchableOpacity>
          }
          {
            bucketlist.comments.slice(page * 10, (page * 10) + 10)
            .map(comment => (
              <TouchableOpacity
                key={comment.id}
                onLongPress={() => (
                  bucketlist.userId === profile.id || (comment.senderId === profile.id) ?
                    selectComment(comment) :
                    () => {}
                )}
                delayLongPress={500}
              >
                <View
                  style={styles.comment}
                >
                  <Text style={styles.commentUser}>{comment.user}</Text>
                  <Text style={styles.commentContent} >{comment.content}</Text>
                  {selectedComment.id === comment.id &&
                    <Icon
                      containerStyle={[styles.deleteButton, { marginLeft: 20 }]}
                      onPress={() => this.deleteComment(comment)}
                      name="delete"
                      color="red"
                      size={16}
                    />
                  }
                </View>
                <Text
                  style={[styles.timeSent, styles.commentTime]}
                >
                  {`${setTime(comment).createdAt}${setTime(comment).time}`}
                </Text>
              </TouchableOpacity>
            ))
          }
          {
            bucketlist.comments.length > 0 && page > 0 &&
            <TouchableOpacity
              style={styles.value}
              onPress={() => this.navigatePage('previous')}
            >
              <Text style={styles.commentNavigator}>previous comments</Text>
            </TouchableOpacity>
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
                  bucket.id === bucketlist.id
                ) ? '70%' : '85%',
              },
            ]}
            onFocus={() => selectBucketlist(bucketlist)}
            value={bucket.id === bucketlist.id ? comm.content : ''}
            onChangeText={onChange}
          />
          {
            bucket.id === bucketlist.id &&
            <TouchableOpacity
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
    );
  }
}

Comments.propTypes = {
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
  bucket: PropTypes.shape({}),
  comm: PropTypes.shape({}).isRequired,
  selectedComment: PropTypes.shape({}),
  selectBucketlist: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setTime: PropTypes.func.isRequired,
  selectComment: PropTypes.func,
  deleteComment: PropTypes.func,
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

Comments.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  selectedComment: {},
  selectComment: () => {},
  selectBucketlist: () => {},
  deleteComment: () => {},
};

export default Comments;
