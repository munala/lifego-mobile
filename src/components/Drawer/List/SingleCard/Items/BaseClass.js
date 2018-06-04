import { Component } from 'react';

import propTypes from './propTypes';

class BaseClass extends Component {
  onDone = (item) => {
    const newItem = { ...item, done: !item.done };
    this.props.actions.updateItem(
      this.props.bucketlist,
      newItem,
    );
  }

  onSave = async (item = {}, type) => {
    const { actions, bucketlist } = this.props;
    let response;
    if (type === 'Add') {
      response = await actions.saveItem(bucketlist, item);
    } else {
      response = await actions.updateItem(bucketlist, { ...item });
    }
    if (!response.error) {
      this.props.actions.navigate({
        navigator: this.props.navigator,
        route: 'bucketlist',
        params: {
          bucketlist,
          navigator: this.props.navigator,
        } });
    }
  }

  navigatePage = (direction) => {
    this.setState({
      page: this.state.page + (direction === 'next' ? 1 : -1),
    });
  }

  deleteItem = () => {
    this.closeMenu();
    this.props.openDialog();
  }

  delete = () => {
    this.props.closeDialog();
    this.props.actions.deleteItem(
      this.props.bucketlist,
      this.state.selectedItem,
    );
  }

  editItem = () => {
    this.closeMenu();
    this.openForm({
      type: 'Edit',
      name: 'item',
    }, this.state.selectedItem);
  }

  cancel = () => {
    this.setState({
      item: {},
      editMode: false,
    });
  }

  openForm = (context, content = {}) => {
    this.props.actions.navigate({
      params: {
        context,
        content,
        bucketlist: this.props.bucketlist,
        fromRoute: 'bucketlist',
        onSave: this.onSave,
        goBack: () => {
          this.props.actions.navigate({
            params: {
              bucketlist: this.props.bucketlist,
              navigator: this.props.navigator,
            },
            navigator: this.props.navigator,
            route: 'bucketlist',
          });
        },
      },
      navigator: this.props.navigator,
      route: 'bucketlistForm',
    });
  }

  openMenu = (selectedItem) => {
    this.setState({
      selectedItem,
    });
    this.props.openMenu(this.props.bucketlist, 'showItemMenu');
  }

  closeMenu = () => {
    this.props.closeMenu();
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
