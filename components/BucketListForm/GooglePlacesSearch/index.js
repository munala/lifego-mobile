import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import styles from '../styles';

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
      listView: {
        borderRadius: 5,
        backgroundColor: '#f7f7f7',
      },
      poweredContainer: {
        display: 'none',
      },
      textInputContainer: {
        display: 'flex',
        marginHorizontal: 0,
        marginTop: 2,
        marginBottom: -15,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      textInput: {
        display: 'flex',
        flex: 1,
        color: 'grey',
        fontWeight: '600',
        fontSize: 14,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 5,
        borderRadius: 0,
        paddingVertical: 5,
        paddingHorizontal: 0,
        left: -5,
        right: -5,
        fontFamily: 'Roboto',
        borderBottomWidth: 0,
        borderBottomColor: '#00bcd4',
      },
      description: {
        fontWeight: 'bold',
        color: 'grey',
      },
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

export default GooglePlacesInput;
