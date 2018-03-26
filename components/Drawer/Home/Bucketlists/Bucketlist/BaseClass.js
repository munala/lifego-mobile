import { Component } from 'react';
import moment from 'moment';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = (text) => {
    this.setState({
      comm: { ...this.state.comm, content: text },
    });
  }

  onSubmit = () => {
    const { comm } = this.state;
    if (comm.content) {
      this.props.actions.addComment(this.props.bucketlist, comm);
      this.setState({
        comm: {
          id: '',
          content: '',
        },
      });
    }
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

  toggleComments = () => {
    this.setState({
      showComments: !this.state.showComments,
    });
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
}

BaseClass.propTypes = propTypes;

export default BaseClass;
