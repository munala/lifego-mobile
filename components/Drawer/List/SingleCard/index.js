/* eslint-disable global-require */
import React from 'react';
import { View, TouchableOpacity, Image as Img, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';

import BaseClass from './BaseClass';
import Comments from './Comments';
import Items from './Items';
import Text from '../../../Common/SuperText';
import * as likeActions from '../../../../actions/likeActions';
import * as commentActions from '../../../../actions/commentActions';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as navigationActions from '../../../../actions/navigationActions';
import { getOtherProfile } from '../../../../actions/userActions';
import { setLikeColor, getTags, setTime } from '../../../../utils';
import styles from '../../Home/styles/';
import propTypes from './propTypes';

class SingleCard extends BaseClass {
  state = {
    showMode: this.props.mode ? 'items' : '',
    imageDimensions: {},
  }

  componentDidMount = () => {
    this.getImageDimensions();
  }

  render() {
    const { bucketlist, goToBucketlist, profile, mode, ...rest } = this.props;
    const { imageDimensions, showMode } = this.state;
    const { createdAt, time } = setTime(bucketlist);

    return (
      <TouchableWithoutFeedback onPress={this.props.closeMenu} style={styles.touchArea}>
        <View
          key={bucketlist.id}
          style={styles.bucketlist}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={goToBucketlist}
            onLongPress={() => this.props.openMenu(bucketlist)}
            delayLongPress={500}
            style={styles.bucketlistHeader}
          >
            <TouchableOpacity
              onPress={() => this.goToProfile({ id: bucketlist.userId })}
              onLongPress={() => this.props.openMenu(bucketlist)}
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
                    require('../../../../assets/images/user.png')
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
          <TouchableOpacity
            onPress={goToBucketlist}
            onLongPress={() => this.props.openMenu(bucketlist)}
            delayLongPress={500}
            style={styles.bucketlistBody}
            activeOpacity={1}
          >
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
              <View style={[styles.likesComments, { width: 100, justifyContent: 'flex-start' }]}>
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
                onPress={() => this.toggleItems(bucketlist)}
                textStyle={styles.commentButton}
                buttonStyle={styles.buttonStyle}
                text={`${bucketlist.items.length} item${bucketlist.items.length !== 1 ? 's' : ''}`}
              />
              <Button
                onPress={() => this.toggleComments(bucketlist)}
                textStyle={styles.commentButton}
                buttonStyle={styles.buttonStyle}
                text={`${bucketlist.comments.length} comment${bucketlist.comments.length !== 1 ? 's' : ''}`}
              />
            </View>
            {
              showMode === 'comments' &&
              <Comments
                bucketlist={bucketlist}
                profile={profile}
                actions={this.props.actions}
                mode={mode}
                goToProfile={this.goToProfile}
                {...rest}
              />
            }
            {
              showMode === 'items' &&
              <Items
                bucketlist={bucketlist}
                profile={profile}
                actions={this.props.actions}
                mode={mode}
                goToProfile={this.goToProfile}
                {...rest}
              />
            }
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
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
};

export default connect(
  ({ profile }) => ({ profile }),
  dispatch => ({
    actions: bindActionCreators({
      ...likeActions,
      ...commentActions,
      ...navigationActions,
      ...bucketlistActions,
      getOtherProfile,
    }, dispatch),
  }),
)(SingleCard);
