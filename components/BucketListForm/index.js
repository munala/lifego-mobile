import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DatePickerAndroid,
  Platform,
  Picker,
} from 'react-native';
import { connect } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import Form from './Form';
import categories from '../../miscellaneous/categories';

class BucketListForm extends Component {
  state = {
    disabled: true,
    content: this.props.params ?
      this.props.params.content :
      this.props.content,
    context: this.props.params ?
      this.props.params.context :
      this.props.context,
    datePickerMode: false,
    categoryPickerMode: false,
    uploading: false,
    image: {},
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

  onSave = async () => {
    this.setState({ uploading: true });
    const { onSave } = this.props.params;
    const content = { ...this.state.content };
    if (this.state.image.origURL || this.state.image.uri) {
      let response = await this.uploadFile(this.state.image);
      this.setState({ uploading: false });
      response = await response.json();
      content.pictureUrl = response.url;
    }
    await onSave(content, this.state.context.type);
    this.props.params.goBack();
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
      if (customButton) {
        this.setState({ image: {} });
      } else if (!error && !didCancel) {
        this.setState({
          image: response,
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
    const { params: { goBack } } = this.props;
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
    return (<Form {...formProps} />);
  }
}
BucketListForm.propTypes = {
  params: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    onSave: PropTypes.func,
    content: PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
    }),
    context: PropTypes.shape({}),
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

export default connect(({
  navigationData: { allBucketlists: { params: allParams }, myBucketlists: { params: myParams } },
}) => ({
  params: allParams.context ? allParams : myParams,
}))(BucketListForm);
