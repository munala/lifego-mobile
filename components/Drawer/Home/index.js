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

  onItemPress = async (bucketlist) => {
    await this.setState(() => ({
      searchMode: false,
    }));
    this.props.actions.navigate({
      route: 'bucketlist',
      navigator: 'AllBucketlistNavigator',
      params: { id: bucketlist.id, from: 'bucketlists' },
    });
  }

  clearSearch = () => {
    this.setState({
      searchMode: false,
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.iPhoneX]}>
        <Header
          title="Home"
          leftIcon="menu"
          onPressLeft={() => this.props.actions.navigate({ route: 'DrawerOpen', navigator: 'DrawerNav' })}
          onFocus={this.onFocus}
          clearSearch={this.clearSearch}
          mode="bucketlists"
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
};
const mapStateToProps = ({ HomeTabNav: nav }) => ({
  nav,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...navigationActions,
  }, dispatch),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
