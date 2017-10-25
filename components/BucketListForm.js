import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  Platform,
  StyleSheet,
  View,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-elements';

class BucketListForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.content = this.props.context.type === 'Edit' ?
      this.props.content :
      { name: '', description: '' };
    this.state = {
      disabled: true,
      content: this.content,
    };
    this.context = this.props.context;
    this.styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignContent: 'center',
        backgroundColor: '#f7f7f7',
        borderRadius: 5,
      },
      input: {
        color: '#fff',
        fontWeight: '600',
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 3,
        flexBasis: '100%',
        marginTop: 2,
        padding: Platform.OS === 'ios' ? 15 : 5,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomColor: '#00bcd4',
      },
      buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        backgroundColor: 'transparent',
      },
      button: {
        borderRadius: 5,
        flexDirection: 'row',
        flexBasis: '45%',
        backgroundColor: '#00bcd4',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
      },
      cancelButton: {
        backgroundColor: '#666',
      },
      buttons: {
        flexBasis: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: '20%',
        marginTop: 5,
        marginBottom: 5,
      },
      title: {
        color: '#00bcd4',
      },
      divider: {
        backgroundColor: '#00bcd4',
      },
    });
  }
  onChange(type, text) {
    const content = { ...this.state.content };
    content[type] = text;
    Promise.resolve().then(() => this.setState({
      content,
    }))
      .then(() => {
        this.setState({
          disabled: this.state.content.name.length === 0 || this.state.content === this.content,
        });
      });
  }
  onSave() {
    this.props.onSave(this.state.content, this.props.context);
    this.props.showModal('hide');
  }

  render() {
    return (
      <Card
        containerStyle={this.styles.container}
        title={`${this.props.context.type} ${this.props.context.name}`}
        titleStyle={this.styles.title}
        dividerStyle={this.styles.divider}
      >
        <TextInput
          defaultValue={this.state.content.name}
          style={this.styles.input}
          onChangeText={this.onChange.bind(null, 'name')}
          selectTextOnFocus={this.props.context === 'Edit'}
          enablesReturnKeyAutomatically
          returnKeyType="next"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#eee"
          placeholder="name"
        />
        <TextInput
          defaultValue={this.state.content.description}
          multiline
          style={this.styles.input}
          onChangeText={this.onChange.bind(null, 'description')}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#eee"
          placeholder="description"
        />
        <View style={this.styles.buttons}>
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
              this.props.showModal('hide', this.state.content)}
          >
            <Text style={this.styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Card>
    );
  }
}
BucketListForm.propTypes = {
  onSave: PropTypes.func,
  context: PropTypes.object,
  content: PropTypes.object,
  showModal: PropTypes.func,
};

export default BucketListForm;
