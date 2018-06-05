import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BaseClass from './BaseClass';
import Comments from './Comments';
import Items from './Items';
import CardHeader from './CardHeader';
import CardContent from './CardContent';
import * as likeActions from '../../../../actions/likeActions';
import * as commentActions from '../../../../actions/commentActions';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import * as navigationActions from '../../../../actions/navigationActions';
import { getOtherProfile } from '../../../../actions/userActions';
import { setLikeColor, getTags, setTime } from '../../../../utils';
import styles from '../styles/';
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
    const cardHeaderProps = {
      bucketlist,
      goToBucketlist,
      createdAt,
      time,
      openMenu: this.props.openMenu,
      goToProfile: this.goToProfile,
      scrollView: this.props.scrollView,
    };

    const cardContentProps = {
      bucketlist,
      imageDimensions,
      getTags,
      setLikeColor,
      profile,
      mode,
      like: this.like,
      toggleItems: this.toggleItems,
      toggleComments: this.toggleComments,
      openMenu: this.props.openMenu,
      scrollView: this.props.scrollView,
      goToBucketlist,
    };

    return (
      <TouchableWithoutFeedback
        onPress={this.props.closeMenu}
        style={styles.touchArea}
      >
        <View
          key={bucketlist.id}
          style={styles.bucketlist}
        >
          <TouchableOpacity
            onPress={goToBucketlist}
            style={styles.bucketlistBody}
            activeOpacity={1}
          >
            <CardHeader {...cardHeaderProps} />
            <CardContent {...cardContentProps} />
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
