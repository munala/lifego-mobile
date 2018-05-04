import React from 'react';
import { PropTypes } from 'prop-types';
import { StyleSheet } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon } from 'react-native-elements';

import styles from './styles';

const optionStyles = {
  optionWrapper: {
    margin: 5,
  },
  optionText: {
    color: 'grey',
  },
};

const optionsStyles = {
  optionsContainer: {
    margin: 5,
    width: 100,
    top: 0,
    right: 10,
    position: 'absolute',
  },
};

export const ContextMenu = ({ items, name }) => (
  <Menu
    name={name}
    style={styles.menu}
  >
    <MenuTrigger />
    <MenuOptions customStyles={optionsStyles}>
      {items.map(item => (
        <MenuOption
          key={item.label}
          onSelect={item.action}
          text={item.label}
          customStyles={optionStyles}
        />
      ))}
    </MenuOptions>
  </Menu>
);

ContextMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  })).isRequired,
  name: PropTypes.string.isRequired,
};

const PopupMenu = ({ items, icon }) => (
  <ModalDropdown
    options={items.map(item => item.label)}
    dropdownStyle={[styles.dropdownStyle, {
      height: (40 + (StyleSheet.hairlineWidth * 2)) * items.length,
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
