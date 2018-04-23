/* eslint-disable global-require */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../../../../Common/SuperText';
import { setTime } from '../../../../../../utils';
import styles from '../../../styles';

class Comments extends Component {
  state = {
    page: Math.floor(this.props.bucketlist.comments.length / 10),
    comment: {
      id: '',
      content: '',
    },
    selectedComment: {
      id: '',
      content: '',
    },
    typing: false,
    submitting: false,
  }

  onChange = (text) => {
    this.setState({
      comment: { ...this.state.comment, content: text },
    });
  }

  onSubmit = async () => {
    const { comment } = this.state;
    this.setState(() => ({ submitting: true }));
    if (comment.content) {
      const { error } = await this.props.actions.addComment(this.props.bucketlist, comment);
      this.setState(() => ({ submitting: false }));
      if (!error) {
        this.setState(() => ({
          comment: {
            id: '',
            content: '',
          },
        }));
        this.setState(() => ({ typing: false }));
      }
    }
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
            await this.props.actions.deleteComment(this.props.bucketlist, comment);
          },
        },
      ],
      { cancelable: true },
    );
  }

  focus = () => {
    this.setState({ typing: true });
  }

  selectComment = (selectedComment) => {
    this.setState({ selectedComment });
  }

  renderComments = bucketlist => bucketlist.comments
    .slice(this.state.page * 10, (this.state.page * 10) + 10)
    .map(comment => (
      <TouchableOpacity
        key={comment.id}
        onLongPress={() => (
          (comment.senderId === this.props.profile.id) ?
            this.selectComment(comment) :
            () => {}
        )}
        delayLongPress={500}
      >
        <View
          style={styles.comment}
        >
          <Text style={styles.commentUser}>{comment.user}</Text>
          <Text style={styles.commentContent} >{comment.content}</Text>
          {this.state.selectedComment.id === comment.id &&
          <Icon
            containerStyle={[styles.deleteButton, { marginLeft: 20 }]}
            onPress={() => this.deleteComment(comment)}
            name="delete"
            color="red"
            size={16}
          />
          }
        </View>
        {this.props.mode &&
          <Text
            style={[styles.timeSent, styles.commentTime]}
          >
            {`${setTime(comment).createdAt}${setTime(comment).time}`}
          </Text>
        }
      </TouchableOpacity>
    ))

  render = () => {
    const { bucketlist, profile } = this.props;
    const { page, typing, comment, submitting } = this.state;
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
          {this.renderComments(bucketlist) }
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
            source={profile.pictureUrl ? { uri: profile.pictureUrl } : require('../../../../../../assets/images/user.png')}
          />
          <TextInput
            type="text"
            placeholder="type comment"
            style={[
              styles.inputText, {
                flexBasis: typing ? '70%' : '85%',
              },
            ]}
            onFocus={this.focus}
            value={typing ? comment.content : ''}
            onChangeText={this.onChange}
          />
          {
            typing &&
            <TouchableOpacity
              style={styles.value}
              onPress={event => this.onSubmit(event)}
              disabled={submitting}
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
  actions: PropTypes.shape({
    addComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  mode: PropTypes.string,
};

Comments.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
};

export default Comments;
