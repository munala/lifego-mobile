import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../../../actions/navigationActions';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import BaseClass from '../CommonClass';
import SingleCard from '../SingleCard';
import ContextMenu from '../../../Common/ContextMenu';
import Dialog from '../../../Common/Dialog';

import styles from '../../Home/styles';
import propTypes from './propTypes';

class Bucketlist extends BaseClass {
  state = {
    items: [],
    selectedBucketlist: {},
  }

  componentDidMount = () => {
    const { bucketlist } = this.props;
    if (!bucketlist) {
      this.props.actions.navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists' });
    }
    this.setItems([
      { label: 'Edit', action: this.editBucketlist },
      { label: 'Delete', action: this.deleteBucketlist },
    ]);
    this.setButtons([{
      label: 'Delete',
      action: this.delete,
    }]);
  }

  componentDidUpdate = ({ bucketlist, actions: { navigate } }) => {
    if (!bucketlist) {
      navigate({ navigator: this.props.params.navigator, route: 'bucketlists' });
    }
  }

  goToBucketlist = () => {
    this.closeMenu();
  }

  render() {
    const { bucketlist, navigator, params: { fromRoute } } = this.props;
    const bucketlistProps = {
      bucketlist,
      mode: 'single',
      setItems: this.setItems,
      setButtons: this.setButtons,
      setOtherItems: this.setOtherItems,
      setOtherButtons: this.setOtherButtons,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
      goToBucketlist: this.goToBucketlist,
      showMenu: this.state.showMenu,
      currentRoute: 'bucketlists',
      fromRoute,
      navigator,
    };
    const showMenu = this.state.showMenu || this.state.showItemMenu;
    const items = this.state.showItemMenu ? this.state.otherItems : this.state.items;
    const buttons = this.state.showItemMenu ? this.state.otherButtons : this.state.buttons;
    const dialogProps = {
      text: 'Are you sure? This action cannot be undone.',
      buttons,
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (bucketlist) {
      return (
        <View style={styles.container}>
          <ScrollView
            ref={(el) => { this.scrollView = el; }}
            onContentSizeChange={() => this.scrollView.scrollToEnd()}
          >
            <SingleCard {...bucketlistProps} />
          </ScrollView>
          {
            showMenu && <ContextMenu items={items} />
          }
          {
            this.state.showDialog && <Dialog {...dialogProps} />
          }
        </View>
      );
    }
    return <View />;
  }
}

Bucketlist.propTypes = propTypes;

const mapStateToProps = ({
  allData: { bucketlists }, profile,
},
{
  navigation: { state },
}) => {
  let bucketlist;
  let param = {};
  let navigator = '';
  if (state && state.params) {
    param = state.params;
    navigator = param.navigator;
    bucketlist = bucketlists
      .filter(buck => buck.id === parseInt(param.bucketlist.id, 10))[0];
  }
  return ({
    profile,
    bucketlist,
    navigator,
    params: param,
    current: 'bucketlist',
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
    ...bucketlistActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
