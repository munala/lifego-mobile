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
      this.props.actions.navigate({ navigator: 'allBucketlists', route: 'bucketlists' });
    }
  }

  componentDidUpdate = ({ bucketlist, actions: { navigate } }) => {
    if (!bucketlist) {
      navigate({ navigator: 'allBucketlists', route: 'bucketlists' });
    }
  }

  render() {
    const {
      bucketlist, actions: { navigate },
      params,
    } = this.props;
    const navigator = params.from === 'bucketlists' ? 'allBucketlists' : 'home';
    const bucketlistProps = {
      bucketlist,
      mode: 'single',
    };
    return (
      <View style={styles.container}>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => navigate({ navigator, route: params.from })}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView >
          <SingleCard {...bucketlistProps} />
        </ScrollView>
      </View>
    );
  }
}

Bucketlist.propTypes = propTypes;

const mapStateToProps = ({
  navigationData: { allBucketlists: { params } },
  allData: { bucketlists },
}) => {
  const [bucketlist] = bucketlists.filter(buck => buck.id === parseInt(params.id, 10));
  return ({
    bucketlist,
    params,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
