import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

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
        justifyContent: 'flex-start',
        paddingTop: 150,
        backgroundColor: '#f7f7f7',
      },
      input: {
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderBottomWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fafafa',
      },
      button: {
        flexDirection: 'row',
        height: 45,
        alignSelf: 'stretch',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#05A5D1',
        alignItems: 'center',
        justifyContent: 'center',
      },
      cancelButton: {
        backgroundColor: '#666',
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
      <View style={this.styles.container}>
        <TextInput
          defaultValue={this.state.content.name}
          style={this.styles.input}
          onChangeText={this.onChange}
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
    );
  }
}
BucketListForm.propTypes = {
  onSave: PropTypes.func,
  navigation: PropTypes.object,
  screenProps: PropTypes.object,
};

export default BucketListForm;
