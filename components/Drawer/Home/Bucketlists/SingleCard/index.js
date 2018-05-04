/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, Image as Img } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import BaseClass from './BaseClass';
import Comments from './Comments';
import Text from '../../../../Common/SuperText';
import * as likeActions from '../../../../../actions/likeActions';
import * as commentActions from '../../../../../actions/commentActions';
import * as navigationActions from '../../../../../actions/navigationActions';
import { getOtherProfile } from '../../../../../actions/userActions';
import { setLikeColor, getTags, setTime } from '../../../../../utils';
import styles from '../../styles/';
import propTypes from './propTypes';

class SingleCard extends BaseClass {
  state = {
    showComments: !!this.props.mode,
    imageDimensions: {},
  }

  componentDidMount = () => {
    this.getImageDimensions();
  }

  render() {
    const { bucketlist, goToBucketlist, profile, mode } = this.props;
    const { imageDimensions, showComments } = this.state;
    const { createdAt, time } = setTime(bucketlist);

    return (
      <View
        key={bucketlist.id}
        style={styles.bucketlist}
      >
        <TouchableOpacity onPress={goToBucketlist} style={styles.bucketlistHeader}>
          <TouchableOpacity onPress={() => this.goToProfile({ id: bucketlist.userId })}>
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
              <TouchableOpacity onPress={() => this.goToProfile({ id: bucketlist.userId })}>
                <Text style={styles.leftHeaderContent}>
                  {`${bucketlist.userDisplayName}\n`}
                </Text>
              </TouchableOpacity>
              <Text style={styles.time}>{`${createdAt}${time}`}</Text>
            </View>
            <View style={styles.headDetails}>
              {
                bucketlist.location ?
                  <View style={styles.locationCategory}>
                    <View style={styles.location}>
                      <Icon style={styles.locationIcon} size={10} name="place" />
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
        </TouchableOpacity>
        <TouchableOpacity onPress={goToBucketlist} style={styles.bucketlistBody}>
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
            <View style={[styles.likesComments, { width: 40 }]}>
              <TouchableOpacity
                style={styles.iconStyle}
                onPress={() => this.like(bucketlist)}
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
              onPress={() => this.toggleComments(bucketlist)}
              textStyle={styles.commentButton}
              buttonStyle={styles.buttonStyle}
              text={`${bucketlist.comments.length} comment${bucketlist.comments.length !== 1 ? 's' : ''}`}
            />
          </View>
          {
            showComments &&
            <Comments
              bucketlist={bucketlist}
              profile={profile}
              actions={this.props.actions}
              mode={mode}
              goToProfile={this.goToProfile}
            />
          }
        </TouchableOpacity>
      </View>
    );
  }
}

SingleCard.propTypes = propTypes;

SingleCard.defaultProps = {
  bucketList: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
  goToBucketlist: () => {},
};

export default connect(
  ({ profile }) => ({ profile }),
  dispatch => ({
    actions: bindActionCreators({
      ...likeActions,
      ...commentActions,
      ...navigationActions,
      getOtherProfile,
    }, dispatch),
  }),
)(SingleCard);
