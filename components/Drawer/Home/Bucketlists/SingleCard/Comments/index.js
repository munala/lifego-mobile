/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';

import BaseClass from './BaseClass';
import { ContextMenu } from '../../../../../Common/PopupMenu';
import Text from '../../../../../Common/SuperText';
import { setTime } from '../../../../../../utils';
import styles from '../../../styles';
import propTypes from './propTypes';

class Comments extends BaseClass {
  state = {
    page: Math.floor(this.props.bucketlist.comments.length / 8),
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

  renderComments = bucketlist => bucketlist.comments
    .slice(this.state.page * 8, (this.state.page * 8) + 8)
    .map(comment => (
      <TouchableOpacity
        key={comment.id}
        onLongPress={() => (
          (comment.senderId === this.props.profile.id && this.props.mode) ?
            this.selectComment(comment) :
            () => {}
        )}
        delayLongPress={500}
      >
        <View
          style={styles.comment}
        >
          <TouchableOpacity onPress={() => this.props.goToProfile({ id: comment.senderId })}>
            <Text style={styles.commentUser}>{comment.user}</Text>
          </TouchableOpacity>
          <Text style={styles.commentContent} >{comment.content}</Text>
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
    const { page, typing, comment, submitting, editMode } = this.state;
    const lastPage = Math.floor(this.props.bucketlist.comments.length / 8);
    const items = [
      { label: 'Edit', action: this.editComment },
      { label: 'Delete', action: this.deleteComment },
    ];

    return (
      <MenuProvider ref={(mc) => { this.menuContext = mc; }} >
        <ContextMenu items={items} name="comments" />
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
                onPress={this.saveComment}
                disabled={submitting}
              >
                <View>
                  <Text style={styles.label}>{editMode ? 'SAVE' : 'POST'}</Text>
                </View>
              </TouchableOpacity>
            }
          </View>
        </View>
      </MenuProvider>
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
