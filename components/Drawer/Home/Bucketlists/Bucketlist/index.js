import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as navigationActions from '../../../../../actions/navigationActions';
import Text from '../../../../Common/SuperText';
import SingleCard from '../SingleCard';
import styles from '../../styles';
import propTypes from './propTypes';

class Bucketlist extends Component {
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
          <ScrollView >
            <SingleCard {...bucketlistProps} />
          </ScrollView>
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
