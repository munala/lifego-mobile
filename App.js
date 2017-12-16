import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StackNavigator } from 'react-navigation';
import {
  Alert,
  AlertIOS,
  Platform,
  View,
  AsyncStorage,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import * as bucketlistActions from './actions/bucketlistActions';
import * as userActions from './actions/authActions';
import BucketList from './components/BucketList';
import Items from './components/Items';
import BucketListForm from './components/BucketListForm';
import UserForm from './components/UserForm';


class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.initialRouteName = null;
    this.props.actions.checkToken();
    this.setInitialRoute(this.props);
    this.styles = {
      activity: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
      },
    };
    AsyncStorage.setItem('first_run', 'true');
  }
  componentWillReceiveProps = (nextProps) => {
    if (this.props.auth.loggedIn !== nextProps.auth.loggedIn) {
      this.setInitialRoute(nextProps);
    }
    if (nextProps.error.value) {
      (Platform.OS === 'ios' ? AlertIOS : Alert).alert(nextProps.error.value);
    }
    this.setState({
      isLoading: nextProps.currentApiCalls > 0,
    });
  }
  setInitialRoute=(props) => {
    const stack = {
      user: {
        screen: UserForm,
      },
      bucketlist: {
        screen: BucketList,
      },
      items: {
        screen: Items,
        navigationOptions: ({ navigation }) => ({
          title: navigation.state.params.bucketlist.name,
          headerLeft: (
            <Icon
              name="chevron-left"
              color="#00bcd4"
              size={40}
              containerStyle={{ marginLeft: 10 }}
              onPress={() => { navigation.goBack(); }}
            />
          ),
          headerRight: (
            <Icon
              name="search"
              color="#00bcd4"
              containerStyle={{ marginRight: 10 }}
              onPress={this.toggleSearch}
            />
          ),
        }),
      },
      bucketlistform: {
        screen: BucketListForm,
        navigationOptions: ({ navigation }) => ({
          title: `${navigation.state.params.context.type} ${navigation.state.params.context.name}`,
          headerRight: (<View />),
        }),
      },
    };
    if (props.auth.loggedIn) {
      delete stack.user;
    }
    this.rootApp = StackNavigator(stack, {
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTitleStyle: {
          alignSelf: 'center',
          textAlign: 'center',
          color: '#00bcd4',
        },
      },
    });
  }

  render() {
    const RootApp = this.rootApp;
    return (
      <RootApp />
    );
  }
}
App.propTypes = {
  actions: PropTypes.object,
  auth: PropTypes.object,
  error: PropTypes.object,
  currentApiCalls: PropTypes.number.isRequired,
  data: PropTypes.object,
};
function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...bucketlistActions, ...userActions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
