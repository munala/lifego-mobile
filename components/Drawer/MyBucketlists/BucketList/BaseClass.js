import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = () => {
    this.props.actions.loadBucketlists(0, 10, '');
  }

  onSave = async (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      await actions.saveBucketlist(bucketlist, 'myBucketlists');
    } else {
      await actions.updateBucketlist({ ...bucketlist }, 'myBucketlists');
    }
    this.props.actions.navigate({ navigator: 'MyBucketlistNavigator', route: 'MyBucketlists' });
  }

  onDelete = (content) => {
    this.props.actions.deleteBucketlist(content, 'myBucketlists');
  }

  onFocus = () => {
    this.setState({
      searchMode: true,
    });
  }

  showModal = async (type, content = {}) => {
    this.props.actions.navigate({
      route: 'newBucketlistForm',
      navigator: 'MyBucketlistNavigator',
      params: {
        context: {
          ...this.state.context,
          type,
        },
        content,
        onSave: this.onSave,
        goBack: () => this.props.actions.navigate({ navigator: 'MyBucketlistNavigator', route: 'MyBucketlists' }),
      },
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

  goToBucketlistForm = async (bucketlist) => {
    await this.props.actions.navigate({
      params: {
        bucketlist,
      },
      navigator: 'MyBucketlistNavigator',
      route: 'items',
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
