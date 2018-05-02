import { Component } from 'react';
import propTypes from './propTypes';

class BaseClass extends Component {
  onRefresh = async () => {
    this.setState(() => ({ refreshing: true }));
    await this.props.actions.loadBucketlists(0, 10, '');
    this.setState(() => ({ refreshing: false }));
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

  onSave = async (item = {}, type) => {
    const { actions, bucketlist } = this.props;
    if (type === 'Add') {
      await actions.saveItem(bucketlist, item);
    } else {
      await actions.updateItem(bucketlist, { ...item });
    }
    this.props.actions.navigate({
      navigator: 'MyBucketlistNavigator',
      route: 'items',
      params: {
        bucketlist,
      } });
  }

  showModal = async (type, content = {}) => {
    await this.props.actions.navigate({
      params: {
        context: {
          ...this.state.context,
          type,
        },
        content,
        bucketlist: this.props.bucketlist,
        onSave: this.onSave,
        goBack: async () => {
          await this.props.actions.navigate({
            params: {
              bucketlist: this.props.bucketlist,
            },
            navigator: 'MyBucketlistNavigator',
            route: 'items',
          });
        },
      },
      navigator: 'MyBucketlistNavigator',
      route: 'newBucketlistForm',
    });
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
