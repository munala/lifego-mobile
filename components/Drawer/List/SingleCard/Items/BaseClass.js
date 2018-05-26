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
        route: this.props.fromRoute,
        params: {
          bucketlist,
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
    this.openForm('Edit', this.state.selectedItem);
  }

  cancel = () => {
    this.setState({
      item: {},
      editMode: false,
    });
  }

  openForm = (type, content = {}) => {
    this.props.actions.navigate({
      params: {
        context: {
          name: 'item',
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
            navigator: this.props.navigator,
            route: this.props.fromRoute,
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
    this.props.openMenu(this.props.bucketlist);
  }

  closeMenu = () => {
    this.props.closeMenu();
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
