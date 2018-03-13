import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DatePickerAndroid,
  Platform,
  Picker,
} from 'react-native';
import Form from './Form';
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
    datePickerMode: false,
    categoryPickerMode: false,
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
    const { content, context, datePickerMode, categoryPickerMode, disabled } = this.state;
    const formProps = {
      content,
      context,
      datePickerMode,
      categoryPickerMode,
      goBack,
      disabled,
      showDatePicker: this.showCategoryPicker,
      showCategoryPicker: this.showCategoryPicker,
      onChange: this.onChange,
      onDateChange: this.onDateChange,
      renderCategories: this.renderCategories,
      onSave: this.onSave,
    };
    return (<Form {...formProps} />);
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
