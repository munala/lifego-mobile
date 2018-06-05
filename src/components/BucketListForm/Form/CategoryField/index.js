import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Platform,
  Picker,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const CategoryField = ({
  content,
  context,
  onChange,
  renderCategories,
  showCategoryPicker,
  categoryPickerMode,
}) => (
  <View >
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
        {
          categoryPickerMode &&
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
  </View>
);

CategoryField.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  context: PropTypes.shape({}).isRequired,
  renderCategories: PropTypes.func.isRequired,
  showCategoryPicker: PropTypes.func.isRequired,
  categoryPickerMode: PropTypes.bool.isRequired,
};

export default CategoryField;
