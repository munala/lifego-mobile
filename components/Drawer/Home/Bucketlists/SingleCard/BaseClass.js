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
      Image.getSize(bucketlist.pictureUrl.replace('http', 'https'), (width, height) => {
        const { width: windowWidth } = Dimensions.get('window');
        const factor = width / windowWidth;
        this.setState({
          imageDimensions: {
            width: windowWidth - 10, height: height / factor,
          },
        });
      });
    }
  }

  like = async (bucketlist) => {
    let liked = false;
    if (!this.state.liking) {
      this.setState(() => ({ liking: true }));
      if (bucketlist.likes) {
        bucketlist.likes.forEach(async (like) => {
          if (like.likerId === this.props.profile.id) {
            liked = true;
            await this.props.actions.unlike(like);
            this.setState(() => ({ liking: false }));
          }
        });
      }
      if (!liked) {
        await this.props.actions.like(bucketlist);
        this.setState(() => ({ liking: false }));
      }
    }
  }

  goToProfile = async ({ id }) => {
    const {
      actions: { navigate, setParams, getOtherProfile },
      profile,
    } = this.props;

    if (profile.id !== id) {
      await setParams({
        params: { viewProfile: true },
        navigator: 'profile',
      });
      getOtherProfile(id);
    }
    await navigate({ route: 'Profile', navigator: 'drawer' });
  }

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
