import React from 'react';
import PropTypes from 'prop-types';
import {
  TextInput,
  View,
  TouchableOpacity,
  DatePickerIOS,
  Platform,
  Picker,
  ScrollView,
  Image,
} from 'react-native';
import Text from '../../Common/SuperText';

import styles from '../styles';

const minDate = new Date(Date.now());

const Form = ({
  content,
  context,
  datePickerMode,
  categoryPickerMode,
  showDatePicker,
  showCategoryPicker,
  goBack,
  onChange,
  onDateChange,
  renderCategories,
  onSave,
  disabled,
  uploading,
  image,
  changePhoto,
}) => (
  <View style={styles.flexOne}>
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>{`${context.type} ${context.name}`}</Text>
      <View style={styles.hr} />
      <Text style={styles.grey}>name</Text>
      <TextInput
        defaultValue={content.name}
        style={styles.input}
        onChangeText={text => onChange(text, 'name')}
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
        textAlignVertical="top"
        style={[styles.input, { height: 80 }]}
        onChangeText={text => onChange(text, 'description')}
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
            onChangeText={text => onChange(text, 'location')}
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
            onFocus={showDatePicker}
          />
          {datePickerMode && Platform.OS === 'ios' &&
            <View>
              <DatePickerIOS
                mode="date"
                date={content.dueDate ? new Date(content.dueDate) : minDate}
                minimumDate={minDate}
                onDateChange={onDateChange}
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
                onValueChange={text => onChange(text, 'category')}
              >
                <Picker.Item
                  value={null}
                  label="Select Category"
                />
                {renderCategories()}
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
                onFocus={showCategoryPicker}
              />
              {categoryPickerMode &&
                <Picker
                  selectedValue={content.category}
                  itemStyle={styles.input}
                  mode="dropdown"
                  onValueChange={text => onChange(text, 'category')}
                >
                  {renderCategories()}
                </Picker>
              }
            </View>
          }
          <Text style={styles.grey}>photo</Text>
          <TouchableOpacity style={styles.imageWrapper} onPress={changePhoto}>
            {(image.uri) &&
              <Image
                source={{ uri: image.uri || content.pictureUrl }}
                style={styles.image}
                resizeMode="cover"
              />}
            {(image.uri) ?
              <Text style={styles.paragraph}>change</Text> :
              <Text style={styles.plusSign}>add</Text>}
          </TouchableOpacity>

        </View>
      }
    </ScrollView>
    <View style={styles.buttons}>
      <TouchableOpacity
        style={[styles.button, styles.cancelButton]}
        onPress={() => goBack()}
      >
        <Text style={[styles.buttonText, styles.cancelButtonText]}>{Platform.OS === 'ios' ? 'Cancel' : 'CANCEL'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onSave}
        disabled={disabled || uploading}
      >
        {uploading ?
          <Text style={styles.buttonText}>uploading...</Text> :
          <Text style={styles.buttonText}>{Platform.OS === 'ios' ? 'Save' : 'SAVE'}</Text>}
      </TouchableOpacity>
    </View>
  </View>
);

Form.propTypes = {
  goBack: PropTypes.func.isRequired,
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  content: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  datePickerMode: PropTypes.bool.isRequired,
  categoryPickerMode: PropTypes.bool.isRequired,
  showDatePicker: PropTypes.func.isRequired,
  showCategoryPicker: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  renderCategories: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  uploading: PropTypes.bool.isRequired,
  image: PropTypes.shape({}).isRequired,
  changePhoto: PropTypes.func.isRequired,
};

export default Form;
