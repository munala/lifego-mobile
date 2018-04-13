import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.actions.loadBucketlists(0, 10, '');
    this.setState({ refreshing: false });
  }

  onDelete = (content) => {
    this.props.actions.deleteItem(this.props.bucketlist, content);
  }

  onDone = (item) => {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(
      this.props.bucketlist,
      newItem,
    );
  }

  onSave = (item = {}, type) => {
    const { actions, bucketlist } = this.props;
    if (type === 'Add') {
      actions.saveItem(bucketlist, item);
    } else {
      actions.updateItem(bucketlist, { ...item });
    }
  }

  showModal = async (type, content = {}) => {
    await this.props.actions.setParams({
      params: {
        context: {
          ...this.state.context,
          type,
        },
        content,
        bucketlist: this.props.bucketlist,
        onSave: this.onSave,
        goBack: async () => {
          await this.props.actions.setParams({
            params: {
              bucketlist: this.props.bucketlist,
              goBack: () => this.props.actions.navigate({ navigator: 'myBucketlists', route: 'bucketlist' }),
            },
            navigator: 'myBucketlists',
          }),
          this.props.actions.navigate({ navigator: 'myBucketlists', route: 'items' });
        },
      },
      navigator: 'myBucketlists',
    });
    this.props.actions.navigate({ route: 'bucketlistForm', navigator: 'myBucketlists' });
  }

  toggleFilter = () => {
    const filter = this.state.filter === 'all' ? 'pending' : 'all';
    this.setState({
      filter,
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
