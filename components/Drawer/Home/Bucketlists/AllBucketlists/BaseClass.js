import { Component } from 'react';
import {
  Image,
  Dimensions,
} from 'react-native';

import moment from 'moment';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = async () => {
    await this.props.actions.loadAllBucketlists(0, 100);
    this.getImageHeights(this.props.allData.bucketlists);
  }

  onChange = (text) => {
    this.setState({
      comment: { ...this.state.comment, content: text },
    });
  }

  onTextChange = (event, index, value) => {
    const bucketlist = { ...this.state.bucketlist };
    if (value) {
      bucketlist.category = value;
    } else {
      bucketlist[event.name] = event.value;
    }
    this.setState({
      bucketlist,
    });
  }

  onDateChange = (date) => {
    const bucketlist = { ...this.state.bucketlist };
    bucketlist.dueDate = date;
    this.setState({ bucketlist });
  }

  onSearchChange = (search) => {
    this.props.actions.loadAllBucketlists(null, null, search);
    this.setState({
      search,
    });
  }

  onSubmit = () => {
    const { comment, bucketlist } = this.state;
    if (comment.content) {
      this.props.actions.addComment(bucketlist, comment);
      this.setState({
        comment: {
          id: '',
          content: '',
        },
      });
    }
  }

  onSave = (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      actions.saveBucketlist(bucketlist);
    } else {
      actions.updateBucketlist({ ...bucketlist });
    }
  }

  getImageHeights = async (bucketlists) => {
    const imageHeights = {};
    await bucketlists.forEach((bucketlist) => {
      if (bucketlist.pictureUrl) {
        Image.getSize(bucketlist.pictureUrl.replace('http', 'https'), (width, height) => {
          const { width: windowWidth } = Dimensions.get('window');
          const factor = width / windowWidth;
          imageHeights[bucketlist.name] = { width: windowWidth - 10, height: height / factor };
          this.setState({ imageHeights });
        });
      }
    });
  }

  setTime = (bucketlist) => {
    let time = 'm';
    const difference = moment.duration(moment(Date.now())
      .diff(moment(bucketlist.createdAt)));
    let createdAt = Math.floor(difference.asMinutes());
    if (createdAt > 59) {
      createdAt = Math.floor(difference.asHours());
      time = 'h';
      if (createdAt > 23) {
        time = '';
        if (createdAt > 365) {
          createdAt = moment(bucketlist.createdAt).format('MMMM Do YYYY, HH:mm');
        } else {
          createdAt = moment(bucketlist.createdAt).format('MMMM Do, HH:mm');
        }
      }
    }
    return ({ createdAt, time });
  }

  setLikeColor = ({ likes }) => {
    let liked = false;
    if (likes) {
      likes.forEach((like) => {
        if (like.likerId === this.props.profile.id) {
          liked = true;
        }
      });
    }
    return liked ? '#00bcd4' : 'grey';
  }

  loadMore = () => {
    // this.props.actions.loadAllBucketlists(page);
  }

  like = async (bucketlist) => {
    let liked = false;
    if (!this.state.liking) {
      this.setState({ liking: true });
      if (bucketlist.likes) {
        bucketlist.likes.forEach(async (like) => {
          if (like.likerId === this.props.profile.id) {
            liked = true;
            await this.props.actions.unlike(like);
            this.setState({ liking: false });
          }
        });
      }
      if (!liked) {
        await this.props.actions.like(bucketlist);
        this.setState({ liking: false });
      }
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
      gallery: [],
    });
  }

  openModal = () => {
    this.setState({
      bucketlist: {
        id: '',
        name: '',
        description: '',
        category: '',
        tags: '',
        location: '',
      },
      open: true,
      gallery: [],
    });
  }

  changePic = (pic) => {
    const bucketlist = { ...this.state.bucketlist };
    const galery = this.state.gallery;
    if (galery.length === 0) {
      galery.push(pic);
    } else {
      galery[0] = pic;
    }
    bucketlist.pictureUrl = pic.url;
    this.setState({ bucketlist, gallery: galery });
  }

  selectBucketlist = (bucketlist) => {
    this.setState({ bucketlist });
  }

  selectLocation = (location) => {
    this.setState({
      bucketlist: {
        ...this.state.bucketlist,
        location,
      },
    });
  }

  logout = () => {
    const { actions, naviGate } = this.props;
    actions.logout();
    naviGate('user');
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
