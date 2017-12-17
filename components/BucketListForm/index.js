import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { Card } from 'react-native-elements';
import styles from './styles';

class BucketListForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state ? `${navigation.state.params.context.type} ${navigation.state.params.context.name}` : '',
    headerRight: (<View />),
  });

  state = {
    disabled: true,
    content: this.props.content,
  };

  onChange = (text, type) => {
    const content = { ...this.state.content };
    content[type] = text;
    this.setState({
      content,
      disabled: !content.name || content === this.props.content,
    });
  }

  onSave = () => {
    const { onSave, showModal } = this.props;
    onSave(this.state.content, this.props.context.type);
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
