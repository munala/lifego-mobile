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
        displayName: newDisplayName,
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

  isFriend = (person) => {
    const { friends } = this.props.profile;
    const isaFriend = friends
      .map(friend => friend.id)
      .indexOf(person.id) !== -1;
    return isaFriend;
  }

  isLastPerson = (index) => {
    const { activeType } = this.state;
    const { profile } = this.props;
    const isLast = profile[activeType.toLowerCase()].length === index + 1;
    return isLast;
  }

  toggleType = (activeType) => {
    this.setState({ activeType });
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
      params: { viewProfile: true, from: 'Profile', previousIds: [previousId, ...ids], previousRoutes: ['Profile', ...routes] },
    });
    this.props.actions.getOtherProfile(id);
  }

  goBack = async () => {
    const [from, ...routes] = this.props.previousRoutes;
    const [newFrom] = routes;
    if (from === 'Profile') {
      const [previousId, ...newIds] = this.props.previousIds;
      this.props.actions.navigate({
        params: { viewProfile: true, previousIds: newIds, previousRoutes: routes, from: newFrom },
        navigator: 'DrawerNav',
        route: 'Profile',
      });
      this.props.actions.getOtherProfile(previousId || this.props.profile.id);
    } else {
      await this.props.actions.navigate({
        navigator: 'DrawerNav',
        route: 'Profile',
        params: {
          previousRoutes: undefined,
          from: undefined,
          viewProfile: false,
          previousIds: undefined,
        },
      });
      this.props.actions.navigate({
        navigator: 'DrawerNav',
        route: from,
      });
    }
  }

  sendMessage = async (receiver) => {
    const newConversation = {
      senderId: this.props.profile.id,
      senderDisplayName: this.props.profile.displayName,
      senderUsername: this.props.profile.username,
      senderPictureUrl: this.props.profile.pictureUrl,
      receiverId: receiver.id,
      receiverPictureUrl: receiver.pictureUrl,
      receiverUsername: receiver.username,
      receiverDisplayName: receiver.displayName,
    };
    await this.props.actions.navigate({
      route: 'Home',
      navigator: 'DrawerNav',
    });
    await this.props.actions.navigate({
      route: 'Messages',
      navigator: 'HomeTabNav',
    });
    this.props.actions.navigate({
      route: 'Conversation',
      navigator: 'MessageNavigator',
      params: { id: null, newConversation },
    });
  }
}

BaseClass.propTypes = propTypes;

export default BaseClass;
