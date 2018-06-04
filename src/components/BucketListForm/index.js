import React, { Component } from 'react';
import {
  DatePickerAndroid,
  Platform,
  Picker,
  View,
  Alert,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import Form from './Form';
import categories from '../../miscellaneous/categories';
import propData from './propTypes';

const { propTypes, defaultProps } = propData;

class BucketListForm extends Component {
  state = {
    disabled: true,
    content: this.props.navigation.state && this.props.navigation.state.params ?
      { ...this.props.navigation.state.params.content } :
      { ...this.props.content },
    contentCopy: this.props.navigation.state && this.props.navigation.state.params ?
      { ...this.props.navigation.state.params.content } :
      { ...this.props.content },
    context: this.props.navigation.state && this.props.navigation.state.params ?
      { ...this.props.navigation.state.params.context } :
      { ...this.props.context },
    datePickerMode: false,
    categoryPickerMode: false,
    uploading: false,
    saving: false,
    image: {
      uri: this.props.navigation.state && this.props.navigation.state.params &&
      this.props.navigation.state.params.content.pictureUrl ?
        this.props.navigation.state.params.content.pictureUrl.replace(
          (this.props.navigation.state.params.content.pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
          'https://',
        )
        : null,
    },
    listViewDisplayed: false,
  };

  componentDidMount =() => {
    this.setState({ listViewDisplayed: false });
  }

  onChange = (text, type) => {
    const content = { ...this.state.content };
    const { contentCopy } = this.state;
    content[type] = text || null;
    const disabled = !content.name && content[type] === contentCopy[type];
    this.setState({
      content,
      disabled,
      showCategoryPicker: false,
    });
  }

  onSave = async () => {
    const content = { ...this.state.content };
    if (this.state.addToCalendar && !content.dueDate) {
      Alert.alert('Missing due date', 'Due date is required to add the buckeltist to your calendar.');
    } else {
      const { onSave } = this.props.navigation.state.params;
      this.setState({ saving: true });
      if (
        this.props.navigation.state.params.content.pictureUrl !==
      (this.state.image.origURL || this.state.image.uri)
      ) {
        if (this.state.image.origURL || this.state.image.uri) {
          this.setState({ uploading: true });
          let response = await this.uploadFile(this.state.image);
          this.setState({ uploading: false });
          response = await response.json();
          content.pictureUrl = response.url;
        } else {
          content.pictureUrl = null;
        }
      }
      await onSave(content, this.state.context.type, this.state.addToCalendar);
      this.setState({ saving: false });
    }
  }

  onDateChange = (date) => {
    const { content, contentCopy } = { ...this.state };
    content.dueDate = date || null;
    const disabled = !content.name && content.dueDate === contentCopy.dueDate;
    this.setState({
      content,
      showDatePicker: false,
      disabled,
    });
  }

  showDatePicker = async () => {
    const { content } = { ...this.state };
    if (Platform.OS === 'ios') {
      this.setState({
        datePickerMode: true,
      });
    } else {
      const {
        year, month, day, action,
      } = await DatePickerAndroid.open({
        date: content.dueDate ? new Date(content.dueDate) : new Date(),
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const date = new Date(year, month, day);
        this.onDateChange(new Date(
          Date.UTC(date.getFullYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
          )));
      }
    }
  }

  showCategoryPicker = () => {
    this.setState({
      categoryPickerMode: true,
    });
  }

  uploadFile = (file) => {
    const uri = Platform.OS === 'ios' ? file.origURL : file.uri;
    return RNFetchBlob.fetch('POST', 'https://api.cloudinary.com/v1_1/lifego/image/upload?upload_preset=dl5sqcqz', {
      'Content-Type': 'multipart/form-data',
    }, [
      { name: 'file', filename: file.fileName, data: RNFetchBlob.wrap(uri) },
    ]);
  }

  changePhoto = async () => {
    const options = {
      title: 'Select Photo',
      allowsEditing: true,
      storageOptions: {
        cameraRoll: true,
        skipBackup: true,
        path: 'images',
      },
      customButtons: (this.state.image.origURL || this.state.image.uri) ? [{
        name: 'removePicture',
        title: 'Remove Photo',
      }] : [],
    };

    ImagePicker.showImagePicker(options, async (response) => {
      const { error, didCancel, customButton } = response;
      const { content } = this.state;
      if (customButton) {
        this.setState({ image: { ...this.state.image, uri: null }, disabled: !content.name });
      } else if (!error && !didCancel) {
        this.setState({ image: response, disabled: !content.name });
      }
    });
  }

  toggleCalendar = () => {
    this.setState({ addToCalendar: !this.state.addToCalendar });
  }

  renderCategories = () => categories.map(category => (
    <Picker.Item
      key={category}
      value={category}
      label={category}
    />
  ))

  render() {
    const { navigation: { state: { params: { goBack } } } } = this.props;

    const {
      content, context, datePickerMode, categoryPickerMode, disabled,
      saving, image, addToCalendar, listViewDisplayed,
    } = this.state;

    const formProps = {
      content,
      context,
      datePickerMode,
      categoryPickerMode,
      goBack,
      disabled,
      saving,
      image,
      listViewDisplayed,
      showDatePicker: this.showDatePicker,
      showCategoryPicker: this.showCategoryPicker,
      onChange: this.onChange,
      onDateChange: this.onDateChange,
      renderCategories: this.renderCategories,
      onSave: this.onSave,
      changePhoto: this.changePhoto,
      toggleCalendar: this.toggleCalendar,
      addToCalendar,
    };

    if (!context || !content) {
      return (<View />);
    }

    return (<Form {...formProps} />);
  }
}

BucketListForm.propTypes = propTypes;

BucketListForm.defaultProps = defaultProps;

export default BucketListForm;
