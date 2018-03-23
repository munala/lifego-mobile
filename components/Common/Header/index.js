import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Platform } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../SuperText';
import { loadAllBucketlists, loadBucketlists } from '../../../actions/bucketlistActions';
import { logout, searchUsers, getProfile } from '../../../actions/userActions';
import * as searchActions from '../../../actions/searchActions';
import PopupMenu from '../PopupMenu';
import styles from './styles';

class Header extends Component {
  state = {
    open: false,
    searchText: '',
    focused: false,
  }

  componentWillMount = () => {
    this.props.actions.loadAllBucketlists(0, 100);
    this.props.actions.getProfile();
  }

  onFocus = () => {
    this.setState({ focused: true, searchText: '' });
    this.props.onFocus();
  }

  search = (searchText) => {
    this.setState({ searchText });
    const action = this.props.mode === 'bucketlists' ? this.props.actions.loadAllBucketlists : this.props.actions.loadBucketlists;
    this.props.handleResults(searchText);
    if (searchText) {
      action(null, null, searchText);
      this.props.actions.search(searchText);
    } else {
      this.props.actions.clearSearch();
      action();
    }
    this.props.actions.searchUsers(searchText);
  }

  clearSearch = () => {
    this.setState({ focused: false, searchText: '' });
    this.el.blur();
    this.props.clearSearch();
    this.props.actions.clearSearch();
  }

  logout = () => {
    const { actions, navigateTopStack } = this.props;
    actions.logout();
    navigateTopStack('user');
  }

  render() {
    const { leftIcon, onPressLeft, mode, title } = this.props;
    const searchProps = this.state.focused ? { clearIcon: { color: '#eee', name: 'close' } } : {};
    const menuItems = [
      {
        label: 'Logout',
        action: this.logout,
      },
    ];
    return (
      <View style={styles.headerStyle}>
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
              textInputRef={(el) => { this.el = el; }}
              lightTheme
              round={Platform.OS === 'ios'}
              containerStyle={styles.search}
              inputStyle={styles.searchInput}
              placeholderTextColor="#eee"
              placeholder="Search"
              onFocus={this.onFocus}
              onChangeText={this.search}
              icon={{ color: '#eee', name: 'search' }}
              {...searchProps}
              onClearText={this.clearSearch}
              value={this.state.searchText}
            /> :
            <Text style={styles.titleText}>
              {title}
            </Text>
        }
        {
          mode !== 'items' &&
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
      </View>
    );
  }
}

Header.propTypes = {
  actions: PropTypes.shape({
    loadBucketlists: PropTypes.func.isRequired,
    loadAllBucketlists: PropTypes.func.isRequired,
    search: PropTypes.func,
    searchUsers: PropTypes.func,
    clearSearch: PropTypes.func,
    getProfile: PropTypes.func,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  leftIcon: PropTypes.string.isRequired,
  onPressLeft: PropTypes.func.isRequired,
  navigateTopStack: PropTypes.func.isRequired,
  clearSearch: PropTypes.func,
  mode: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  showHeader: PropTypes.bool.isRequired,
  handleResults: PropTypes.func,
  onFocus: PropTypes.func,
};

Header.defaultProps = {
  handleResults: (() => {}),
  onFocus: (() => {}),
  clearSearch: (() => {}),
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
    searchUsers,
    getProfile,
    ...searchActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
