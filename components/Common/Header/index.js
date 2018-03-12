import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Animated, View, Text, Platform } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadAllBucketlists, loadBucketlists } from '../../../actions/bucketlistActions';
import { logout } from '../../../actions/userActions';
import * as searchActions from '../../../actions/searchActions';
import PopupMenu from '../PopupMenu';
import styles from './styles';

const range = 48;

class Header extends Component {
  state = {
    open: false,
    searchText: '',
  }

  componentWillReceiveProps = ({ showHeader }) => {
    if (showHeader !== this.props.showHeader) {
      Animated.spring(this.animatedValue, {
        toValue: showHeader ? 0 : -range,
        duration: 200,
      }).start();
    }
  }

  animatedValue = new Animated.Value(this.props.showHeader ? 0 : -range)

  search = (searchText) => {
    this.setState({ searchText });
    const action = this.props.mode === 'bucketlists' ? this.props.actions.loadAllBucketlists : this.props.actions.loadBucketlists;
    this.props.handleResults(searchText);
    if (searchText) {
      action(null, null, searchText);
      this.props.actions.search(searchText);
    } else {
      this.clearSearch();
      action();
    }
  }

  clearSearch = () => {
    this.props.actions.clearSearch();
  }

  logout = () => {
    const { actions, navigate } = this.props;
    actions.logout();
    navigate('user');
  }

  hide = () => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.animatedValue } } }]);
  }

  render() {
    const { leftIcon, onPressLeft, mode, title } = this.props;
    const searchProps = this.state.searchText ? { clearIcon: { color: '#eee', name: 'close' } } : {};
    const menuItems = [
      {
        label: 'Logout',
        action: this.logout,
      },
    ];
    return (
      <Animated.View style={[styles.headerStyle, {
        marginTop: Platform.OS === 'ios' ? 0 : this.animatedValue.interpolate({
          inputRange: [0, range],
          outputRange: [0, range],
        }),
      }]}
      >
        <Icon
          name={leftIcon}
          color="#fff"
          containerStyle={styles.iconLeftStyle}
          onPress={onPressLeft}
          underlayColor="#00bcd4"
        />
        {
          (mode === 'bucketlists' || mode === 'my_bucketlists') ?
            <SearchBar
              lightTheme
              containerStyle={styles.search}
              inputStyle={styles.searchInput}
              placeholderTextColor="#eee"
              placeholder="Search"
              onChangeText={this.search}
              icon={{ color: '#eee', name: 'search' }}
              {...searchProps}
              onClearText={this.clearSearch}
            /> :
            <Text style={styles.titleText}>
              {title}
            </Text>
        }
        {
          (mode === 'bucketlists' || mode === 'my_bucketlists') &&
          <PopupMenu
            icon="more-vert"
            style={styles.iconRightStyle}
            items={menuItems}
          />
        }
        {
          mode === 'items' &&
          <View style={styles.iconRightStyle} />
        }
      </Animated.View>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    loadAllBucketlists: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    clearSearch: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  leftIcon: PropTypes.string.isRequired,
  onPressLeft: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  handleResults: PropTypes.func,
};

Header.defaultProps = {
  handleResults: (() => {}),
};

const mapStateToProps = ({ searchText, components: { showHeader } }, ownProps) => ({
  searchText,
  showHeader,
  ...ownProps,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    loadAllBucketlists,
    loadBucketlists,
    logout,
    ...searchActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
