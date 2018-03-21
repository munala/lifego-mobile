import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.props.actions.loadBucketlists(0, 20, '');
    this.setState({ refreshing: false });
  }

  onDelete = (content) => {
    this.props.actions.deleteItem(this.state.bucketlist, content);
  }

  onDone = (item) => {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(this.state.bucketlist, newItem);
  }

  onSave = (item = {}, type) => {
    const { actions } = this.props;
    const { bucketlist } = this.state;
    if (type === 'Add') {
      actions.saveItem(bucketlist, item);
    } else {
      actions.updateItem(bucketlist, { ...item });
    }
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

  toggleFilter = () => {
    const filter = this.state.filter === 'all' ? 'pending' : 'all';
    this.setState({
      filter,
      data: this.state.bucketlist.items
        .filter(item => (filter === 'all' || (filter === 'pending' && !item.done))),
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
