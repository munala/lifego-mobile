/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback } from 'react-native';

import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import { setTime } from '../../../../../utils';
import styles from '../../../Home/styles';
import propTypes from './propTypes';

class Comments extends BaseClass {
  state = {
    page: 0,
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
    editMode: false,
  }

  componentDidMount = () => {
    if (this.props.setItems) {
      this.props.setItems([
        { label: 'Edit', action: this.editComment },
        { label: 'Delete', action: this.deleteComment },
      ]);
    }
    if (this.props.setButtons) {
      this.props.setButtons([{
        label: 'Delete',
        action: this.delete,
      }]);
    }
  }

  renderComments = bucketlist => bucketlist.comments
    .slice(
      ((this.state.page * 8)),
      ((this.state.page * 8) + 8))
    .map(comment => (
      <TouchableOpacity
        key={comment.id}
        onLongPress={() => (
          (comment.senderId === this.props.profile.id && this.props.mode) ?
            this.openMenu(comment) :
            () => {}
        )}
        delayLongPress={500}
        activeOpacity={1}
      >
        <View style={styles.comment}>
          <TouchableOpacity onPress={() => this.props.goToProfile({ id: comment.senderId })}>
            <Text style={styles.commentUser} numberOfLines={1}>{comment.user}</Text>
          </TouchableOpacity>
          <Text selectable style={styles.commentContent} >{comment.content}</Text>
        </View>
        {this.props.mode &&
          <Text numberOfLines={1} style={[styles.timeSent, styles.commentTime]}>
            {`${setTime(comment).createdAt}${setTime(comment).time}`}
          </Text>
        }
      </TouchableOpacity>
    ))

  render = () => {
    const { bucketlist, profile } = this.props;
    const { page, typing, comment, submitting, editMode } = this.state;
    const lastPage = Math.floor(this.props.bucketlist.comments.length / 8);

    return (
      <TouchableWithoutFeedback onPress={this.props.closeMenu} style={styles.touchArea}>
        <View>
          <View style={styles.commentSection}>
            {
              bucketlist.comments.length > 0 && page > 0 &&
              <TouchableOpacity
                style={styles.value}
                onPress={() => this.navigatePage('previous')}
              >
                <Text style={styles.commentNavigator}>more comments</Text>
              </TouchableOpacity>
            }
            {this.renderComments(bucketlist) }
            {
              bucketlist.comments.length > 0 &&
              page < lastPage &&
              <TouchableOpacity
                style={styles.value}
                onPress={() => this.navigatePage('next')}
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
                onPress={this.saveComment}
                disabled={submitting}
              >
                <View>
                  <Text style={styles.label}>{editMode ? 'SAVE' : 'POST'}</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
          {
            this.state.editMode &&
            <TouchableOpacity onPress={this.cancel} style={styles.cancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          }
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Comments.propTypes = propTypes;

Comments.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
};

export default Comments;
