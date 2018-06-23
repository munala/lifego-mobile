import { Component } from 'react';
import {
  Animated,
  Platform,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

import propTypes from './propTypes';

class BaseClass extends Component {
  onChange = (text, name) => {
    const { profile } = { ...this.state };
    const [firstName, lastName] = (profile.displayName || '').split(' ');
    const displayName = {};
    displayName['first name'] = firstName.trim();
    displayName['last name'] = lastName.trim();
    displayName[name] = text.trim();

    const newDisplayName = `${displayName['first name']} ${displayName['last name']}`;
    this.setState({
      profile: {
        ...profile,
        displayName: this.titleCase(newDisplayName).trim(),
      },
    });
  }

  onSave = async () => {
    const {
      id, createdAt, updatedAt, userId, ...profile
    } = { ...this.state.profile };
    this.setState({ uploading: true });
    if (this.state.image) {
      let response = await this.uploadFile(this.state.image);
      response = await response.json();
      profile.pictureUrl = response.secure_url;
    }
    await this.props.actions.updateProfile(profile, 'profile');
    this.cancel();
  }

  setPhoto = (url) => {
    const { profile } = this.state;
    this.setState({
      profile: {
        ...profile,
        pictureUrl: url,
      },
      uploadingImg: false,
    });
  }

  animationFactor = new Animated.Value(0)

  titleCase = (name) => {
    let [first, middle, last] = name.split(' ');
    if (first) {
      first = `${first.charAt(0).toUpperCase()}${first.substr(1, first.length - 1)}`;
    }

    if (middle) {
      middle = `${middle.charAt(0).toUpperCase()}${middle.substr(1, middle.length - 1)}`;
    }

    if (last) {
      last = `${last.charAt(0).toUpperCase()}${last.substr(1, last.length - 1)}`;
    }

    return `${first || ''} ${last || ''} ${middle || ''}`;
  }

  toggleType = (activeType) => {
    this.setState({ activeType });
  }

  uploadFile = (file) => {
    const uri = Platform.OS === 'ios' ? file.origURL : file.uri;

    return RNFetchBlob.fetch(
      'POST',
      'https://api.cloudinary.com/v1_1/lifego/image/upload?upload_preset=dl5sqcqz',
      { 'Content-Type': 'multipart/form-data' },
      [{
        name: 'file',
        filename: file.fileName,
        data: RNFetchBlob.wrap(uri),
      }]);
  }

  changePhoto = async () => {
    const options = {
      title: 'Select Profile Photo',
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      customButtons: [{
        name: 'removePicture',
        title: 'Remove Photo',
      }],
    };
    this.openImagePicker(options);
  }

  openImagePicker = (options) => {
    ImagePicker.showImagePicker(options, async (response) => {
      const { error, didCancel, customButton } = response;
      if (error || didCancel) {
        this.setState({
          uploadingImg: false,
        });
      } else if (customButton) {
        this.setPhoto(null);
      } else {
        const uri = Platform.OS === 'ios' ? response.origURL : response.uri;
        this.setPhoto(uri);
        this.setState({
          image: response,
        });
      }
    });
  }

  openEditProfileMode = () => {
    Animated.timing(this.animationFactor, {
      toValue: 1,
      duration: 200,
    }).start();
    this.setState({
      scrollEnabled: false,
      editMode: true,
    });
  }

  cancel = async () => {
    await Animated.timing(this.animationFactor, {
      toValue: 0,
      duration: 200,
    }).start();
    await this.setState(() => ({
      scrollEnabled: true,
      editMode: false,
      image: null,
      uploading: false,
    }));
    this.setPhoto(this.props.profile.pictureUrl);
  }

  handleHeader = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.offset ? 'down' : 'up';
    const showHeader = direction === 'up';
    if (showHeader) {
      return Animated.spring(this.marginTop, {
        toValue: -250,
        duration: 200,
      }).start();
    }
    return Animated.spring(this.marginTop, {
      toValue: 0,
      duration: 200,
    }).start();
  }

  goToProfile = (id) => {
    const { otherProfile: { id: previousId }, previousIds, previousRoutes } = this.props;
    const ids = previousIds || [];
    const routes = previousRoutes || [];
    this.props.actions.navigate({
      route: 'Profile',
      navigator: 'DrawerNav',
      params: {
        viewProfile: true,
        fromRoute: 'Profile',
        previousIds: [previousId, ...ids],
        previousRoutes: ['Profile', ...routes] },
    });
    this.props.actions.getOtherProfile(id);
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
