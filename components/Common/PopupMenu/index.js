import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';
import styles from './styles';


const PopupMenu = ({ items, icon }) => (
  <ModalDropdown
    options={items.map(item => item.label)}
    dropdownStyle={[styles.dropdownStyle, {
      height: (34 + (StyleSheet.hairlineWidth * 2)) * items.length,
    }]}
    showsVerticalScrollIndicator={false}
    dropdownTextStyle={styles.dropdownTextStyle}
    onSelect={index => items[index].action()}
  >
    <Icon
      name={icon}
      color="#fff"
      containerStyle={styles.iconStyle}
      underlayColor="#00bcd4"
    />
  </ModalDropdown>
);

PopupMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
  })).isRequired,
  icon: PropTypes.string.isRequired,
};

export default PopupMenu;
