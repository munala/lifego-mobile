import React from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  DatePickerIOS,
  Platform,
  Picker,
  ScrollView,
  Image,
  CheckBox,
} from 'react-native';
import { Icon } from 'react-native-elements';

import Text from '../../Common/SuperText';
import styles from '../styles';
import propTypes from './propTypes';

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
  saving,
  image,
  changePhoto,
  addToCalendar,
  toggleCalendar,
}) => (
  <View style={styles.flexOne}>
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.flex1}
      >
        <Text style={styles.grey}>Name</Text>
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
        <Text style={styles.grey}>Description</Text>
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
              <Text style={styles.grey}>Location</Text>
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
              <Text style={styles.grey}>Due date</Text>
              <TouchableOpacity
                style={styles.dateButton}
                selectTextOnFocus={context.type === 'Edit'}
                onPress={showDatePicker}
              >
                <Text style={styles.input}>
                  {content.dueDate ? (new Date(content.dueDate)).toString() : 'due date for bucketlist'}
                </Text>
                {content.dueDate && <Icon
                  name="clear"
                  color="red"
                  type="material-icons"
                  size={16}
                  onPress={() => onDateChange()}
                  underlayColor="#fff"
                />}
              </TouchableOpacity>
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
              <Text style={styles.grey}>Category</Text>
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
              <Text style={styles.grey}>Photo</Text>
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
              {context.type === 'Add' &&
              <View
                style={styles.calendar}
              >
                <Text style={styles.grey}>Add to calendar</Text>
                <CheckBox
                  style={styles.checkbox}
                  value={addToCalendar}
                  onValueChange={toggleCalendar}
                />
              </View>}
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
          disabled={disabled || saving}
        >
          {saving ?
            <Text style={styles.buttonText}>saving...</Text> :
            <Text style={styles.buttonText}>{Platform.OS === 'ios' ? 'Save' : 'SAVE'}</Text>}
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

Form.propTypes = propTypes;

export default Form;
