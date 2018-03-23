import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = () => {
    this.props.actions.loadBucketlists(0, 20, '');
  }

  onSave = (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      actions.saveBucketlist(bucketlist);
    } else {
      actions.updateBucketlist({ ...bucketlist });
    }
  }

  onDelete = (content) => {
    this.props.actions.deleteBucketlist(content);
  }

  onFocus = () => {
    this.setState({
      searchMode: true,
    });
  }

  showModal = (type, content = {}) => {
    this.props.navigation.navigate('bucketlistForm', {
      context: {
        ...this.state.context,
        type,
      },
      content,
      onSave: this.onSave,
    });
  }

  search = (text) => {
    if (text) {
      this.props.actions.search(text);
      this.setState({
        searchMode: true,
      });
    } else {
      this.clearSearch();
    }
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  logout = () => {
    const { actions, navigateTopStack } = this.props;
    actions.logout();
    navigateTopStack('user');
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
