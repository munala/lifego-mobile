import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = () => {
    this.props.actions.loadBucketlists(0, 10, '');
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

  showModal = async (type, content = {}) => {
    await this.props.actions.setParams({
      navigator: 'myBucketlists',
      params: {
        context: {
          ...this.state.context,
          type,
        },
        content,
        onSave: this.onSave,
        goBack: () => this.props.actions.navigate({ navigator: 'myBucketlists', route: 'bucketlist' }),
      },
    });
    this.props.actions.navigate({ route: 'bucketlistForm', navigator: 'myBucketlists' });
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
    const { actions } = this.props;
    actions.logout();
  }

  goToBucketlistForm = async (bucketlist) => {
    await this.props.actions.setParams({
      params: {
        bucketlist,
        goBack: () => this.props.actions.navigate({ navigator: 'myBucketlists', route: 'bucketlist' }),
      },
      navigator: 'myBucketlists',
    });
    this.props.actions.navigate({ route: 'items', navigator: 'myBucketlists' });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
