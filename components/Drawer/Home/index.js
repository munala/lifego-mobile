import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addNavigationHelpers } from 'react-navigation';

import * as navigationActions from '../../../actions/navigationActions';
import Header from '../../Common/Header';
import SearchResults from '../../Common/SearchResults';
import styles from './styles';
import HomeTabNavigator from '../../../navigators/home';
import { addHomeListener } from '../../../store/configureStore';

class Home extends Component {
  state = {
    searchMode: false,
  }

  onFocus = () => {
    this.setState({
      searchMode: true,
    });
  }

  onItemPress = (bucketlist) => {
    this.setState(() => ({
      searchMode: false,
    }));
    const params = {
      bucketlist,
      navigator: 'AllBucketlistNavigator',
      from: 'bucketlists',
    };
    this.navigateToAll(params, 'bucketlist');
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  navigateToAll = async (params, routeName) => {
    const { AllBucketlistNavigator: { routes }, actions: { navigate } } = this.props;
    const [, route] = routes;
    const param = route && route.params;
    const from = param && param.from;
    const navigator = param && param.navigator;
    await navigate({
      navigator: navigator || 'AllBucketlistNavigator',
      route: routeName || from,
      params: params || { bucketlist: undefined, from: undefined },
    });
    if (from === 'Notifications') {
      navigate({ navigator: from === 'Notifications' ? 'HomeTabNav' : navigator, route: from });
      navigate({ navigator, route: 'bucketlists' });
    }
  }

  openDrawer = () => {
    this.props.actions.navigate({ route: 'DrawerOpen', navigator: 'DrawerNav' });
  }

  render() {
    const { AllBucketlistNavigator: { routes } } = this.props;
    const route = routes[routes.length - 1];
    const params = route && route.params;
    const bucketlist = params && params.bucketlist;
    const name = bucketlist ? (bucketlist.name) : 'bucketlist';
    const title = `${name.slice(0, 30)}${name.length > 20 && ' ...'}`;
    const singleBucketlistMode = route && route.routeName === 'bucketlist';
    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={title}
          leftIcon={singleBucketlistMode ? 'arrow-back' : 'menu'}
          onPressLeft={singleBucketlistMode ? () => this.navigateToAll() : this.openDrawer}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode={singleBucketlistMode ? 'bucketlist' : 'bucketlists'}
        />
        {
          this.state.searchMode ?
            <SearchResults
              onItemPress={this.onItemPress}
            /> :
            <HomeTabNavigator
              navigation={
                addNavigationHelpers({
                  dispatch: this.props.dispatch,
                  state: this.props.nav,
                  addHomeListener,
                })
              }
            />
        }
      </View>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({
    routeName: PropTypes.string.isRequired,
  }).isRequired,
  AllBucketlistNavigator: PropTypes.shape({
    routeName: PropTypes.string.isRequired,
  }).isRequired,
};
const mapStateToProps = ({ HomeTabNav: nav, AllBucketlistNavigator }) => ({
  nav,
  AllBucketlistNavigator,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
