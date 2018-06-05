import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import Text from '../../../Common/SuperText';
import styles from '../../styles';

const PhotoField = ({
  content,
  image,
  changePhoto,
}) => (
  <View >
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
  </View>
);

PhotoField.propTypes = {
  image: PropTypes.shape({}).isRequired,
  content: PropTypes.shape({}).isRequired,
  changePhoto: PropTypes.func.isRequired,
};

export default PhotoField;
