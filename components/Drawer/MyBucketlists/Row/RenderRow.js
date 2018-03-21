import React from 'react';
import { PropTypes } from 'prop-types';
import {
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Card, Icon, CheckBox } from 'react-native-elements';
import Modal from 'react-native-modal';

import Text from '../../../Common/SuperText';
import styles from './styles';

const { baseStyles, localStyles } = styles;

const RenderRow = ({
  handleTouch,
  setModalVisible,
  showModal,
  onDone,
  onDelete,
  content,
  context,
  visibleModal,
  properties,
}) => {
  const buttons = [
    {
      component: (
        <CheckBox
          checked={content.done}
          onIconPress={() => onDone(content)}
          containerStyle={localStyles.checkbox}
          checkedColor="#00bcd4"
          uncheckedColor="#00bcd4"
        />
      ),
      backgroundColor: 'transparent',
      color: '#273539',
      underlayColor: '#273539',
    },
    {
      component: <Icon name="info" color="#00bcd4" iconStyle={localStyles.iconStyles} />,
      backgroundColor: 'transparent',
      color: '#00bcd4',
      underlayColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      onPress: () => setModalVisible(true),
    },
    {
      component: <Icon name="edit" color="#00bcd4" iconStyle={localStyles.iconStyles} />,
      backgroundColor: 'transparent',
      color: '#00bcd4',
      underlayColor: 'white',
      onPress: () => showModal('Edit', content),
    },
    {
      component: <Icon name="delete" color="red" iconStyle={localStyles.iconStyles} />,
      backgroundColor: 'transparent',
      color: '#fff',
      underlayColor: 'white',
      onPress: () => Alert.alert(
        `Delete ${content.name}`,
        'Are you sure?',
        [
          { text: 'Cancel', onPress: () => {} },
          { text: 'OK',
            onPress: () => onDelete(content, context) },
        ],
        { cancelable: true },
      ),
    },
  ];

  return (
    <Card
      containerStyle={localStyles.bucketlist}
      title={content.name}
      titleStyle={localStyles.title}
      dividerStyle={localStyles.divider}
    >
      <Modal
        isVisible={visibleModal}
        backdropColor={'black'}
        backdropOpacity={0.5}
        animationIn={'zoomInDown'}
        animationOut={'zoomOutUp'}
        animationInTiming={200}
        animationOutTiming={200}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        style={localStyles.modal}
      >
        <Card
          containerStyle={localStyles.card}
          title={content.name}
          titleStyle={{ color: 'rgb(5, 165, 209)' }}
        >
          {
            properties.map(property => (
              <View style={localStyles.detailRow} key={property.name}>
                <Text style={localStyles.property}>{property.name}:</Text>
                <Text style={localStyles.propertyValue}>{property.text}</Text>
              </View>
            ))
          }
          <TouchableOpacity
            style={localStyles.button}
            onPress={() => setModalVisible(false)}
          >
            <Text style={{ color: '#fff' }}>Close</Text>
          </TouchableOpacity>
        </Card>
      </Modal>
      <Swipeout
        autoClose
        right={!content.userId ? buttons : buttons.splice(1, 3)}
        style={localStyles.swipeout}
      >
        <View style={[baseStyles.container, localStyles.row]}>
          <TouchableOpacity
            onPress={() => handleTouch()}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 250 }}
            style={localStyles.handleTouch}
          >
            <Text
              style={localStyles.description}
              ellipsizeMode="tail"
              numberOfLines={3}
            >
              {`${content.description || 'No description'}`}
            </Text>
          </TouchableOpacity>
          <View style={localStyles.drag}>
            <Text style={localStyles.text}>..{'\n'}..{'\n'}..{'\n'}..</Text>
          </View>
        </View>
      </Swipeout>
    </Card>
  );
};

RenderRow.propTypes = {
  handleTouch: PropTypes.func.isRequired,
  setModalVisible: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  context: PropTypes.shape({
    type: PropTypes.string,
    name: PropTypes.string,
  }),
  content: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
  }),
  visibleModal: PropTypes.bool.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    description: PropTypes.string,
  })).isRequired,
};

RenderRow.defaultProps = {
  content: {
    description: '',
    name: '',
  },
  context: {
    type: 'Add',
    name: '',
  },
};

export default RenderRow;
