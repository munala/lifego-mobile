import React from 'react';
import {
  View,
  Platform,
  ScrollView,
  CheckBox,
} from 'react-native';

import Text from '../../Common/SuperText';
import ButtonRow from './ButtonRow';
import NameField from './NameField';
import DescriptionField from './DescriptionField';
import LocationField from './LocationField';
import DueDateField from './DueDateField';
import DatePickerIOS from './DatePickerIOS';
import CategoryField from './CategoryField';
import PrivacyField from './PrivacyField';
import PhotoField from './PhotoField';
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
  listViewDisplayed,
}) => (
  <View style={styles.flexOne}>
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.container}
        style={styles.flex1}
      >
        <NameField
          context={context}
          content={content}
          onChange={onChange}
        />
        <DescriptionField
          context={context}
          content={content}
          onChange={onChange}
        />
        {
          context.name === 'bucketlist' &&
            <View>
              <LocationField
                onChange={onChange}
                content={content}
                listViewDisplayed={listViewDisplayed}
              />
              <DueDateField
                onDateChange={onDateChange}
                showDatePicker={showDatePicker}
                content={content}
                context={context}
              />
              {
                datePickerMode && Platform.OS === 'ios' &&
                <DatePickerIOS
                  date={content.dueDate ? new Date(content.dueDate) : minDate}
                  minimumDate={minDate}
                  onDateChange={onDateChange}
                />
              }
              <CategoryField
                content={content}
                context={context}
                onChange={onChange}
                renderCategories={renderCategories}
                showCategoryPicker={showCategoryPicker}
                categoryPickerMode={categoryPickerMode}
              />
              <PrivacyField
                content={content}
                context={context}
                onChange={onChange}
              />
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
              <PhotoField
                content={content}
                image={image}
                changePhoto={changePhoto}
              />
            </View>
        }
      </ScrollView>
      <ButtonRow
        goBack={goBack}
        onSave={onSave}
        disabled={disabled}
        saving={saving}
      />
    </View>
  </View>
);

Form.propTypes = propTypes;

export default Form;
