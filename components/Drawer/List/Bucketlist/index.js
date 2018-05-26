import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../../../actions/navigationActions';
import * as bucketlistActions from '../../../../actions/bucketlistActions';
import BaseClass from '../CommonClass';
import Text from '../../../Common/SuperText';
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

  goBack = async () => {
    const {
      actions: { navigate },
      params: { navigator, from },
    } = this.props;
    await navigate({ navigator, route: from, params: { id: undefined } });
    if (from === 'Notifications') {
      navigate({ navigator: from === 'Notifications' ? 'HomeTabNav' : navigator, route: from });
      navigate({ navigator, route: 'bucketlists' });
    }
  }

  goToBucketlist = () => {
    this.closeMenu();
  }

  render() {
    const { bucketlist, params: { navigator: nav, from } } = this.props;
    const navigator = from === 'Notifications' ? 'HomeTabNav' : nav;
    const bucketlistProps = {
      bucketlist,
      mode: 'single',
      setItems: this.setItems,
      setButtons: this.setButtons,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
      goToBucketlist: this.goToBucketlist,
      showMenu: this.state.showMenu,
      fromRoute: 'bucketlist',
      navigator,
    };
    const items = this.state.items;
    const buttons = this.state.buttons;
    const dialogProps = {
      text: 'Are you sure? This action cannot be undone.',
      buttons,
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (bucketlist) {
      return (
        <View style={styles.container}>
          <View style={styles.navButtons}>
            <TouchableOpacity
              onPress={this.goBack}
            >
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <SingleCard {...bucketlistProps} />
          </ScrollView>
          {
            this.state.showMenu && <ContextMenu items={items} />
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
  if (state && state.params) {
    param = state.params;
    bucketlist = bucketlists
      .filter(buck => buck.id === parseInt(state.params.bucketlist.id, 10))[0];
  }
  return ({
    profile,
    bucketlist,
    params: param,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
    ...bucketlistActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
