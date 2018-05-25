import { Component } from 'react';
import PropTypes from 'prop-types';

export default class BaseClass extends Component {
  setItems = (items) => {
    this.setState({ items });
  }

  setButtons = (buttons) => {
    this.setState({ buttons });
  }

  openMenu = (selectedBucketlist) => {
    if (selectedBucketlist.userId === this.props.profile.id) {
      this.setState({
        showMenu: true,
        selectedBucketlist,
      });
    }
  }

  closeMenu = () => {
    this.setState({
      showMenu: false,
    });
  }

  openDialog = () => {
    this.setState({
      showDialog: true,
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  deleteBucketlist = () => {
    this.closeMenu();
    this.openDialog();
  }

  delete = async () => {
    this.closeDialog();
    await this.props.actions.deleteBucketlist(
      this.state.selectedBucketlist,
    );
    this.setState({ selectedBucketlist: null });
  }

  editBucketlist = () => {
    this.closeMenu();
    this.showModal('Edit', this.state.selectedBucketlist);
  }

  showModal = async (type, content = {}) => {
    const nav = this.props.navigator || this.props.params.navigator;
    const route = this.props.currentRoute || 'bucketlist';
    this.props.actions.navigate({
      navigator: nav,
      route: 'bucketlistForm',
      params: {
        context: {
          name: 'bucketlist',
          type,
        },
        content,
        onSave: this.onSave,
        goBack: () => {
          this.props.actions.navigate({
            navigator: nav,
            route,
            params: this.props.params });
        },
      },
    });
  }
}

BaseClass.propTypes = {
  actions: PropTypes.shape({
    deleteBucketlist: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
  navigator: PropTypes.string.isRequired,
  currentRoute: PropTypes.string.isRequired,
  params: PropTypes.shape({ navigator: PropTypes.string }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
