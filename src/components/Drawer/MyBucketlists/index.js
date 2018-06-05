import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import SearchResults from '../../../containers/SearchResults';
import Header from '../../../containers/Header';
import MyBucketlistNavigator from '../../../navigators/myBucketlists';
import { addMyListener } from '../../../store/configureStore';
import styles from '../Home/styles';

class StackNav extends Component {
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
    this.props.dispatch({
      navigator: 'MyBucketlistNavigator',
      ...NavigationActions.navigate({
        navigator: 'MyBucketlistNavigator',
        routeName: 'bucketlist',
        params,
      }),
    });
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  navigate = (dispatch, singleBucketlistMode) => {
    if (singleBucketlistMode) {
      dispatch({
        navigator: 'MyBucketlistNavigator',
        ...NavigationActions.navigate({
          routeName: 'bucketlists',
        }),
      });
    } else {
      dispatch({
        navigator: 'DrawerNav',
        ...NavigationActions.navigate({
          routeName: 'DrawerOpen',
        }),
      });
    }
  };

  openDrawer = () => {
    this.props.actions.navigate({
      route: 'DrawerOpen',
      navigator: 'DrawerNav',
    });
  }

  render() {
    const {
      dispatch,
      nav: { routes },
      nav,
    } = this.props;

    const route = routes[routes.length - 1];
    const params = route && route.params;
    const bucketlist = params && params.bucketlist;
    const context = params && params.context;
    const headerTitle = context && `${context.type} ${context.name}`;
    const name = bucketlist && bucketlist.name ? (bucketlist.name) : 'bucketlist';
    const title = context ? headerTitle : name;
    const mode = route && route.routeName === 'bucketlists' ? 'bucketlists' : 'other';
    const singleBucketlistMode = route.routeName === 'bucketlist';

    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={title}
          leftIcon={mode === 'bucketlists' ? 'menu' : 'arrow-back'}
          onPressLeft={
            mode === 'bucketlists' ?
              this.openDrawer :
              () => this.navigate(dispatch, singleBucketlistMode)
          }
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode={mode}
        />
        {
          this.state.searchMode ?
            <SearchResults
              onItemPress={this.onItemPress}
            /> :
            <MyBucketlistNavigator navigation={
              addNavigationHelpers({
                dispatch,
                state: nav,
                addMyListener,
              },
              )}
            />
        }
      </View>
    );
  }
}

StackNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
  actions: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default StackNav;
