import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../../../../actions/navigationActions';
import Text from '../../../../Common/SuperText';
import SingleCard from '../SingleCard';
import ContextMenu from '../../../../Common/ContextMenu';
import Dialog from '../../../../Common/Dialog';

import styles from '../../styles';
import propTypes from './propTypes';

class Bucketlist extends Component {
  state = { items: [] }

  componentDidMount = () => {
    const { bucketlist } = this.props;
    if (!bucketlist) {
      this.props.actions.navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists' });
    }
  }

  componentDidUpdate = ({ bucketlist, actions: { navigate } }) => {
    if (!bucketlist) {
      navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists' });
    }
  }

  setItems = (items) => {
    this.setState({ items });
  }

  setButtons = (buttons) => {
    this.setState({ buttons });
  }

  openMenu = () => {
    this.setState({
      showMenu: true,
    });
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

  goBack = async () => {
    const {
      actions: { navigate },
      params,
    } = this.props;
    const navigator = params.from === 'bucketlists' ? 'AllBucketlistNavigator' : 'HomeTabNav';
    await navigate({ navigator: 'AllBucketlistNavigator', route: 'bucketlists', params: { id: undefined } });
    if (params.from === 'Notifications') {
      navigate({ navigator, route: params.from });
    }
  }

  render() {
    const { bucketlist } = this.props;
    const bucketlistProps = {
      bucketlist,
      mode: 'single',
      setItems: this.setItems,
      setButtons: this.setButtons,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      openDialog: this.openDialog,
      closeDialog: this.closeDialog,
    };
    const items = this.state.items;
    const buttons = this.state.buttons;
    const dialogProps = {
      text: 'Delete comment? This action cannot be undone.',
      buttons,
      cancelable: true,
      onCancel: this.closeDialog,
    };

    if (bucketlist) {
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.closeMenu} style={styles.touchArea}>
            <View>
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
            </View>
          </TouchableWithoutFeedback>
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
  allData: { bucketlists },
},
{
  navigation: { state },
}) => {
  let bucketlist;
  let param = {};
  if (state && state.params) {
    param = state.params;
    bucketlist = bucketlists.filter(buck => buck.id === parseInt(state.params.id, 10))[0];
  }
  return ({
    bucketlist,
    params: param,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
