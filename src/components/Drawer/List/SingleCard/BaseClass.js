import { Component } from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

import propTypes from './propTypes';

class BaseClass extends Component {
  getImageDimensions = async () => {
    const { bucketlist } = this.props;
    if (bucketlist.pictureUrl) {
      Image.getSize(
        bucketlist.pictureUrl.replace('http', 'https'),
        (width, height) => {
          const { width: windowWidth } = Dimensions.get('window');
          const factor = width / windowWidth;
          this.setState({
            imageDimensions: {
              width: windowWidth, height: height / factor,
            },
          });
        },
      );
    }
  }

  like = async (bucketlist) => {
    let liked = false;
    if (!this.state.liking) {
      this.setState(() => ({ liking: true }));
      if (bucketlist.likes) {
        let singleLike;
        liked = bucketlist.likes.some(async (like) => {
          const userLiked = like.likerId === this.props.profile.id;
          if (userLiked) {
            singleLike = like;
          }
          return userLiked;
        });
        if (liked) {
          await this.props.actions.unlike(singleLike);
        }
        this.setState(() => ({ liking: false }));
      }
      if (!liked) {
        await this.props.actions.like(bucketlist);
        this.setState(() => ({ liking: false }));
      }
    }
  }

  goToProfile = async ({ id }) => {
    if (this.props.showMenu) {
      this.props.closeMenu();
    } else {
      const {
        actions: { navigate, getOtherProfile },
      } = this.props;

      getOtherProfile(id);
      await navigate({
        route: 'Profile',
        navigator: 'DrawerNav',
        params: {
          fromRoute: this.props.from ? 'bucketlist' : this.props.fromRoute,
          viewProfile: true },
      });
    }
  }

  toggleComments = () => {
    this.setState({
      showMode: this.state.showMode === 'comments' ? '' : 'comments',
    });
  }

  toggleItems = () => {
    this.setState({
      showMode: this.state.showMode === 'items' ? '' : 'items',
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
