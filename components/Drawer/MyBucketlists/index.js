import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import BucketList from './BucketList/';
import Items from './Items';
import BucketListForm from '../../BucketListForm';
import { navigate } from '../../../actions/navigationActions';
import styles from './styles';

class StackNav extends Component {
  goBack = () => {
    this.props.actions.navigate({ route: this.props.previousRoute, navigator: 'myBucketlists' });
  }

  render() {
    const { route, params } = this.props;
    const Navigator = () => (
      <BucketList
        handleResults={this.handleResults}
        navigation={this.props.navigation}
      />
    );
    Navigator.propTypes = {
      navigation: PropTypes.shape({}).isRequired,
    };

    const screens = {
      bucketlist: {
        screen: Navigator,
      },
      items: {
        screen: Items,
      },
      bucketlistForm: {
        screen: () => (
          <View style={styles.container}>
            <BucketListForm goBack={this.goBack} params={params} />
          </View>
        ),
      },
    };

    const Stack = StackNavigator(screens, {
      initialRouteName: route,
      navigationOptions: {
        header: null,
      },
    });
    return (
      <Stack />
    );
  }
}

StackNav.propTypes = {
  route: PropTypes.string.isRequired,
  previousRoute: PropTypes.string.isRequired,
  params: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = ({
  navigationData: { myBucketlists: { route, previousRoute, params } },
}, ownProps) => ({
  ...ownProps,
  route,
  params,
  previousRoute,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ navigate }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(StackNav);
