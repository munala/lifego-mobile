import React, { Component } from 'react';
import {
  DatePickerAndroid,
  Platform,
  Picker,
  View,
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
    context: this.props.navigation.state && this.props.navigation.state.params ?
      { ...this.props.navigation.state.params.context } :
      { ...this.props.context },
    datePickerMode: false,
    categoryPickerMode: false,
    uploading: false,
    image: {
      uri: this.props.navigation.state && this.props.navigation.state.params &&
      this.props.navigation.state.params.content.pictureUrl ?
        this.props.navigation.state.params.content.pictureUrl.replace(
          (this.props.navigation.state.params.content.pictureUrl.indexOf('https://') !== -1 ? 'https://' : 'http://'),
          'https://',
        )
        : null,
    },
  };

  onChange = (text, type) => {
    const content = { ...this.state.content };
    content[type] = text;
    this.setState({
      content,
      disabled: !content.name,
      showCategoryPicker: false,
    });
  }

  onSave = async () => {
    const { onSave } = this.props.navigation.state.params;
    const content = { ...this.state.content };
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
      }
    }
    await onSave(content, this.state.context.type);
  }

  onDateChange = (date) => {
    const { content } = { ...this.state };
    content.dueDate = date;
    this.setState({
      content,
      showDatePicker: false,
      disabled: !content.name || content === this.props.content,
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
        this.onDateChange(new Date(year, month, day));
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
      const { content } = { ...this.state };
      if (customButton) {
        this.setState({ image: {} });
      } else if (!error && !didCancel) {
        this.setState({
          image: response,
          disabled: !content.name || content === this.props.content,
        });
      }
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
    const { navigation: { state: { params: { goBack } } } } = this.props;
    const {
      content, context, datePickerMode, categoryPickerMode, disabled, uploading, image,
    } = this.state;
    const formProps = {
      content,
      context,
      datePickerMode,
      categoryPickerMode,
      goBack,
      disabled,
      uploading,
      image,
      showDatePicker: this.showDatePicker,
      showCategoryPicker: this.showCategoryPicker,
      onChange: this.onChange,
      onDateChange: this.onDateChange,
      renderCategories: this.renderCategories,
      onSave: this.onSave,
      changePhoto: this.changePhoto,
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
