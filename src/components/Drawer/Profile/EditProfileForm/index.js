import React from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';

import Text from '../../../Common/SuperText';
import Fields from './Fields';
import Buttons from './Buttons';
import styles from '../styles';

const EditProfileForm = ({
  uploading,
  formHeight,
  changePhoto,
  displayName,
  onChange,
  cancel,
  profile,
  avatar,
  onSave,
}) => (
  <View style={styles.fullWidth}>
    {uploading && <Text style={styles.uploading}>saving...</Text>}
    <Animated.View style={[styles.editProfileView, {
      justifyContent: uploading ? 'center' : 'flex-start',
      height: formHeight,
    }]}
    >
      {
        uploading ?
          <ActivityIndicator color="#fff" size="large" /> :
          <View style={styles.formBody}>
            <TouchableOpacity
              style={[styles.profileAction, styles.photoButton]}
              onPress={changePhoto}
            >
              <Text style={[styles.profileActionText, styles.photoButtonText]}>
                {avatar ? 'Change' : 'Add'} Photo
              </Text>
            </TouchableOpacity>
            <View style={[styles.profileBody, styles.editForm]}>
              <Text style={styles.title}>Edit Profile</Text>
              <View style={styles.hr} />
              <Fields
                onChange={onChange}
                displayName={displayName}
              />
              <Buttons
                cancel={cancel}
                onSave={onSave}
                profile={profile}
              />
            </View>
          </View>
      }
    </Animated.View>
  </View>
);

EditProfileForm.propTypes = {
  uploading: PropTypes.bool.isRequired,
  formHeight: PropTypes.shape({}).isRequired,
  changePhoto: PropTypes.func.isRequired,
  displayName: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  profile: PropTypes.shape({}).isRequired,
  avatar: PropTypes.string,
  onSave: PropTypes.func.isRequired,
};

EditProfileForm.defaultProps = {
  avatar: null,
};

export default EditProfileForm;
