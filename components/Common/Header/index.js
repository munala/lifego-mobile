import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { View, Platform } from 'react-native';
import { Icon, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Text from '../SuperText';
import { searchBucketlists, clearSearch as clearBucketlists } from '../../../actions/bucketlistActions';
import { logout, searchUsers } from '../../../actions/userActions';
import * as searchActions from '../../../actions/searchActions';
import PopupMenu from '../PopupMenu';
import styles from './styles';

class Header extends Component {
  state = {
    searchText: '',
    focused: false,
  }

  onFocus = () => {
    this.setState({ focused: true });
    this.props.onFocus();
  }

  search = (searchText) => {
    this.setState({ searchText });
    this.props.actions.searchBucketlists(null, null, searchText);
    this.props.actions.searchUsers(searchText);
  }

  clearSearch = () => {
    this.setState({ focused: false, searchText: '' });
    this.el.blur();
    this.props.clearSearch();
    this.props.actions.clearSearch();
  }

  logout = () => {
    this.props.actions.logout();
  }

  render() {
    const {
      leftIcon, onPressLeft, mode, title,
    } = this.props;

    const searchProps = this.state.focused ? {
      clearIcon: {
        olor: '#eee',
        name: 'close',
      },
    } : {};

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
          (mode === 'bucketlists') ?
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
        <PopupMenu
          icon="more-vert"
          style={styles.iconRightStyle}
          items={menuItems}
        />
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
    searchBucketlists: PropTypes.func.isRequired,
    clearBucketlists: PropTypes.func.isRequired,
    search: PropTypes.func,
    searchUsers: PropTypes.func,
    clearSearch: PropTypes.func,
    getProfile: PropTypes.func,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  leftIcon: PropTypes.string.isRequired,
  onPressLeft: PropTypes.func.isRequired,
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
    searchBucketlists,
    clearBucketlists,
    logout,
    searchUsers,
    ...searchActions,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
