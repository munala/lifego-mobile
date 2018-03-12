import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  View,
  TouchableHighlight,
  DatePickerIOS,
  DatePickerAndroid,
  Platform,
  Picker,
} from 'react-native';
import styles from './styles';
import categories from '../../miscellaneous/categories';

class BucketListForm extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params ? `${navigation.state.params.context.type} ${navigation.state.params.context.name}` : '',
  });

  state = {
    disabled: true,
    content: this.props.navigation.state.params ?
      this.props.navigation.state.params.content :
      this.props.content,
    context: this.props.navigation.state.params ?
      this.props.navigation.state.params.context :
      this.props.context,
    showDatePicker: false,
    showCategoryPicker: false,
  };

  onChange = (text, type) => {
    const content = { ...this.state.content };
    content[type] = text;
    this.setState({
      content,
      disabled: !content.name || content === this.props.content,
      showCategoryPicker: false,
    });
  }

  onSave = () => {
    const { onSave } = this.props.navigation.state.params;
    onSave(this.state.content, this.state.context.type);
    this.props.navigation.goBack();
  }

  onDateChange = (date) => {
    const { content } = { ...this.state };
    content.dueDate = date;
    this.setState({
      content,
      showDatePicker: false,
    });
  }

  showDatePicker = async () => {
    const { content } = { ...this.state };
    if (Platform.OS === 'ios') {
      this.setState({
        showDatePicker: true,
      });
    } else {
      const { year, month, day, action } = await DatePickerAndroid.open({
        date: content.dueDate ? new Date(content.dueDate) : new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        this.onDateChange(new Date(year, month, day));
      }
    }
  }

  showCategoryPicker = () => {
    this.setState({
      showCategoryPicker: true,
    });
  }

  renderCategories = () => categories.map(category => (
    <Picker.Item
      key={category}
      value={category}
      label={category}
    />
  ))

  render() {
    const { navigation: { goBack } } = this.props;
    const { content, context, showDatePicker, showCategoryPicker } = this.state;
    const minDate = new Date(Date.now());
    return (
      <View
        style={styles.container}
      >
        <Text style={styles.title}>{`${context.type} ${context.name}`}</Text>
        <View style={styles.hr} />
        <Text style={styles.grey}>name</Text>
        <TextInput
          defaultValue={content.name}
          style={styles.input}
          onChangeText={text => this.onChange(text, 'name')}
          selectTextOnFocus={context.type === 'Edit'}
          enablesReturnKeyAutomatically
          returnKeyType="next"
          underlineColorAndroid="#00bcd4"
          placeholderTextColor="#bbb"
          placeholder={`name of ${context.name}`}
        />
        <Text style={styles.grey}>description</Text>
        <TextInput
          defaultValue={content.description}
          multiline
          numberOfLines={4}
          textAlignVertical={'top'}
          style={[styles.input, { height: 80 }]}
          onChangeText={text => this.onChange(text, 'description')}
          underlineColorAndroid="#00bcd4"
          placeholderTextColor="#bbb"
          placeholder={`tell us more about your ${context.name}`}
          maxLength={100}
        />
        {
          context.name === 'bucketlist' &&
          <View>
            <Text style={styles.grey}>location</Text>
            <TextInput
              defaultValue={content.location}
              style={styles.input}
              onChangeText={text => this.onChange(text, 'location')}
              selectTextOnFocus={context.type === 'Edit'}
              enablesReturnKeyAutomatically
              returnKeyType="next"
              underlineColorAndroid="#00bcd4"
              placeholderTextColor="#bbb"
              placeholder="location of bucketlist"
            />
            <Text style={styles.grey}>due date</Text>
            <TextInput
              defaultValue={
                content.dueDate ? (new Date(content.dueDate)).toString() : ''
              }
              style={styles.input}
              selectTextOnFocus={context.type === 'Edit'}
              enablesReturnKeyAutomatically
              returnKeyType="next"
              underlineColorAndroid="#00bcd4"
              placeholderTextColor="#bbb"
              placeholder="due date for bucketlist"
              onFocus={this.showDatePicker}
            />
            {showDatePicker && Platform.OS === 'ios' &&
              <View>
                <DatePickerIOS
                  mode="date"
                  date={content.dueDate ? new Date(content.dueDate) : minDate}
                  minimumDate={minDate}
                  onDateChange={this.onDateChange}
                />
              </View>
            }
            <Text style={styles.grey}>category</Text>
            {
              Platform.OS === 'android' &&
              <View style={styles.categoryAndroid}>
                <Picker
                  selectedValue={content.category}
                  style={styles.categoryAndroid}
                  mode="dropdown"
                  onValueChange={text => this.onChange(text, 'category')}
                >
                  <Picker.Item
                    value={null}
                    label={'Select Category'}
                  />
                  {this.renderCategories()}
                </Picker>
              </View>
            }
            {
              Platform.OS === 'ios' &&
              <View>
                <TextInput
                  defaultValue={content.category || ''}
                  style={styles.input}
                  selectTextOnFocus={context.type === 'Edit'}
                  enablesReturnKeyAutomatically
                  returnKeyType="next"
                  underlineColorAndroid="#00bcd4"
                  placeholderTextColor="#bbb"
                  placeholder="category for bucketlist"
                  onFocus={this.showCategoryPicker}
                />
                {showCategoryPicker &&
                  <Picker
                    selectedValue={content.category}
                    itemStyle={styles.input}
                    mode="dropdown"
                    onValueChange={text => this.onChange(text, 'category')}
                  >
                    {this.renderCategories()}
                  </Picker>
                }
              </View>
            }
          </View>
        }
        <View style={styles.buttons}>
          <TouchableHighlight
            style={[styles.button, styles.cancelButton]}
            onPress={() => goBack()}
            underlayColor="transparent"
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>{Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onSave}
            disabled={this.state.disabled}
            underlayColor="transparent"
          >
            <Text style={styles.buttonText}>{Platform.OS === 'ios' ? 'Save' : 'SAVE'}</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
BucketListForm.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    state: PropTypes.shape({
      params: PropTypes.shape({
        onSave: PropTypes.func,
        content: PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
        }),
        context: PropTypes.shape({}),
      }),
    }),
  }).isRequired,
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }),
  content: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
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
