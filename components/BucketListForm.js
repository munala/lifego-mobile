import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import SideMenu from 'react-native-side-menu';
import MenuComponent from '../components/SideMenu';

class BucketListForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.content = this.props.navigation.state.params.context.content ?
      this.props.navigation.state.params.context.content :
      { name: '' };
    this.state = {
      disabled: true,
      content: this.content,
    };
    this.params = this.props.navigation.state.params.context;
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f7f7f7',
      },
      input: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 3,
        marginTop: 2,
        padding: Platform.OS === 'ios' ? 15 : 5,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderBottomColor: '#00bcd4',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: 'transparent',
      },
      button: {
        borderRadius: 20,
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 45 : 40,
        alignSelf: 'stretch',
        marginTop: 10,
        marginLeft: 70,
        marginRight: 70,
        backgroundColor: '#00bcd4',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButton: {
        backgroundColor: '#666',
      },
      image: {
        opacity: 0.5,
        backgroundColor: '#fff',
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    });
  }
  onChange(text) {
    const content = { ...this.content, name: text };
    this.setState({
      disabled: text.length === 0,
      content,
    });
  }
  onSave() {
    this.props.screenProps.onSave(this.state.content, this.props.navigation.state.params.context);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <SideMenu menu={MenuComponent(this.props.screenProps.actions.logout)}>
        <View style={this.styles.container}>
          <Image
            style={this.styles.image}
            source={require('../images/bucketlist_front.jpg')}
          />
          <TextInput
            defaultValue={this.state.content.name}
            style={this.styles.input}
            onChangeText={this.onChange}
            selectTextOnFocus={this.props.navigation.state.params.context === 'Edit'}
            enablesReturnKeyAutomatically
            returnKeyType="done"
            underlineColorAndroid="rgba(0,0,0,0)"
          />
          <TouchableHighlight
            style={this.styles.button}
            onPress={this.onSave}
            disabled={this.state.disabled}
          >
            <Text style={this.styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[this.styles.button, this.styles.cancelButton]}
            onPress={() =>
              this.props.navigation.goBack()}
          >
            <Text style={this.styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </SideMenu>
    );
  }
}
BucketListForm.propTypes = {
  onSave: PropTypes.func,
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
};

export default BucketListForm;
