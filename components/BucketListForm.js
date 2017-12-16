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

const styles = StyleSheet.create({
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

class BucketListForm extends Component {
  state = {
    disabled: true,
    content: this.props.content,
  };

  onChange = (text, type) => {
    const content = { ...this.state.content };
    content[type] = text;
    this.setState({
      content,
      disabled: content.name.length === 0 || content === this.props.content,
    });
  }

  onSave = () => {
    const { onSave, showModal } = this.props;
    onSave(this.state.content, this.props.context);
    showModal('hide');
  }

  render() {
    const { context, showModal } = this.props;
    const { content } = this.state;
    return (
      <Card
        containerStyle={styles.container}
        title={`${context.type} ${context.name}`}
        titleStyle={styles.title}
        dividerStyle={styles.divider}
      >
        <TextInput
          defaultValue={content.name}
          style={styles.input}
          onChangeText={text => this.onChange(text, 'name')}
          selectTextOnFocus={context.type === 'Edit'}
          enablesReturnKeyAutomatically
          returnKeyType="next"
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#eee"
          placeholder="name"
        />
        <TextInput
          defaultValue={content.description}
          multiline
          style={styles.input}
          onChangeText={text => this.onChange(text, 'description')}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholderTextColor="#eee"
          placeholder="description"
        />
        <View style={styles.buttons}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSave}
            disabled={this.state.disabled}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[styles.button, styles.cancelButton]}
            onPress={() =>
              showModal('hide')}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </Card>
    );
  }
}
BucketListForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }),
  content: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  showModal: PropTypes.func.isRequired,
};
BucketListForm.defaultProps = {
  content: {
    description: '',
    name: '',
  },
  context: {
    type: 'Add',
    name: '',
  },
};

export default BucketListForm;
