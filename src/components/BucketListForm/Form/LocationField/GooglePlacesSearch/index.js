import React from 'react';
import PropTypes from 'prop-types';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from '../../../styles';

const GooglePlacesInput = ({ onChange, content, listViewDisplayed }) => (
  <GooglePlacesAutocomplete
    placeholder="Location"
    minLength={2}
    autoFocus={false}
    returnKeyType={'search'}
    listViewDisplayed={listViewDisplayed}
    fetchDetails
    renderDescription={row => row.description}
    onPress={({ description }) => onChange(description, 'location')}
    getDefaultValue={() => content.location || ''}
    query={{
      key: 'AIzaSyC5OHz3Meqursf6NShRLXk4EdpH8z7Sh8Q',
      language: 'en',
      types: '(cities)',
    }}
    styles={{
      listView: styles.listView,
      poweredContainer: styles.poweredContainer,
      textInputContainer: styles.textInputContainer,
      textInput: styles.textInput,
      description: styles.description,
    }}
    nearbyPlacesAPI="GooglePlacesSearch"
    GooglePlacesSearchQuery={{
      rankby: 'distance',
      types: 'food',
    }}
    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
    debounce={200}
  />
);

GooglePlacesInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  content: PropTypes.shape({}).isRequired,
  listViewDisplayed: PropTypes.bool.isRequired,
};

export default GooglePlacesInput;
