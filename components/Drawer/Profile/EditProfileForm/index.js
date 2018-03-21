import React from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  TouchableOpacity,
  Animated,
  TextInput,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
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
      {!uploading &&
        <TouchableOpacity
          style={[styles.profileAction, styles.photoButton]}
          onPress={changePhoto}
        >
          <Text style={[styles.profileActionText, styles.photoButtonText]}>{avatar ? 'Change' : 'Add'} Photo</Text>
        </TouchableOpacity>
      }
      {uploading ?
        <ActivityIndicator color="#fff" size="large" /> :
        <View style={[styles.profileBody, styles.editForm]}>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.hr} />
          {
            ['first name', 'last name'].map(name => (
              <View key={name}>
                <Text style={styles.grey}>{name}</Text>
                <TextInput
                  defaultValue={displayName[name]}
                  style={styles.input}
                  onChangeText={text => onChange(text, name)}
                  selectTextOnFocus={name === 'first name'}
                  enablesReturnKeyAutomatically
                  returnKeyType="next"
                  underlineColorAndroid="#00bcd4"
                  placeholderTextColor="#bbb"
                  placeholder={`enter your ${name}`}
                />
              </View>
            ))
          }
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => cancel()}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>{Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={onSave}
              disabled={!(profile.displayName)}
            >
              <Text style={styles.buttonText}>{Platform.OS === 'ios' ? 'Save' : 'SAVE'}</Text>
            </TouchableOpacity>
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
  avatar: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileForm;
