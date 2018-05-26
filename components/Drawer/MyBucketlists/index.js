import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions } from 'react-navigation';

import SearchResults from '../../Common/SearchResults';
import Header from '../../Common/Header';
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

  render() {
    const { dispatch, nav: { routes }, nav } = this.props;
    const route = routes[routes.length - 1];
    const params = route && route.params;
    const bucketlist = params && params.bucketlist;
    const name = bucketlist && bucketlist.name ? bucketlist.name : 'bucketlist';
    const title = `${name.slice(0, 20)}${name.length > 20 ? ' ...' : ''}`;
    const singleBucketlistMode = route && route.routeName === 'bucketlist';

    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title={title}
          leftIcon={singleBucketlistMode ? 'arrow-back' : 'menu'}
          onPressLeft={() => this.navigate(dispatch, singleBucketlistMode)}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode={singleBucketlistMode ? 'bucketlist' : 'bucketlists'}
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
};

const mapStateToProps = ({ MyBucketlistNavigator: nav }) => ({
  nav,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(StackNav);
