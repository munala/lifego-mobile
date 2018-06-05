import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { addNavigationHelpers } from 'react-navigation';

import Header from '../../../containers/Header';
import SearchResults from '../../../containers/SearchResults';
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
    };
    this.props.actions.navigate({
      navigator: 'AllBucketlistNavigator',
      route: 'bucketlist',
      params,
    });
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  navigateToAll = async () => {
    const {
      AllBucketlistNavigator: { routes },
      actions: { navigate },
    } = this.props;
    const route = routes[routes.length - 1];
    const param = route && route.params;
    const from = param && param.fromRoute;
    const goBack = param && param.goBack;
    const navigator = param && param.navigator;

    if (goBack) {
      goBack();
    } else {
      await navigate({
        navigator: navigator || 'AllBucketlistNavigator',
        route: 'bucketlists',
        params: {
          bucketlist: undefined,
          fromRoute: undefined,
        },
      });
      if (from === 'Notifications') {
        navigate({
          navigator: from === 'Notifications' ? 'HomeTabNav' : navigator,
          route: from,
        });

        navigate({
          navigator,
          route: 'bucketlists',
        });
      }
    }
  }

  openDrawer = () => {
    this.props.actions.navigate({
      route: 'DrawerOpen',
      navigator: 'DrawerNav',
    });
  }

  render() {
    const { AllBucketlistNavigator: { routes } } = this.props;
    const route = routes[routes.length - 1];
    const params = route && route.params;
    const bucketlist = params && params.bucketlist;
    const context = params && params.context;
    const headerTitle = context && `${context.type} ${context.name}`;
    const name = bucketlist && bucketlist.name ? (bucketlist.name) : 'bucketlist';
    const title = context ? headerTitle : name;
    const mode = route && route.routeName === 'bucketlists' ? 'bucketlists' : 'other';

    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={title}
          leftIcon={mode === 'bucketlists' ? 'menu' : 'arrow-back'}
          onPressLeft={mode === 'bucketlists' ? this.openDrawer : () => this.navigateToAll()}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode={mode}
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
  nav: PropTypes.shape({}).isRequired,
  AllBucketlistNavigator: PropTypes.shape({}).isRequired,
};

export default Home;
