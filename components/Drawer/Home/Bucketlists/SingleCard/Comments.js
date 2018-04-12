/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';

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

  render = () => {
    const {
      bucketlist, bucket, profile, onChange, selectBucketlist, onSubmit, comm,
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
              <View
                key={comment.id}
                style={styles.comment}
              >
                <Text style={styles.commentUser}>{comment.user}</Text>
                <Text style={styles.commentContent}>{comment.content}</Text>
              </View>
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
  selectBucketlist: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
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
  selectBucketlist: () => {},
};

export default Comments;
