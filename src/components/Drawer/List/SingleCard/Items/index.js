import React from 'react';
import { View, TouchableOpacity, CheckBox, TouchableWithoutFeedback } from 'react-native';

import BaseClass from './BaseClass';
import Text from '../../../../Common/SuperText';
import styles from '../../styles';
import propTypes from './propTypes';

class Items extends BaseClass {
  state = {
    page: 0,
    comment: {
      id: '',
      content: '',
    },
    selectedItem: {
      id: '',
      content: '',
    },
    typing: false,
    submitting: false,
    editMode: false,
  }

  componentDidMount = () => {
    if (this.props.setOtherItems) {
      this.props.setOtherItems([
        {
          label: 'Edit',
          action: this.editItem,
        },
        {
          label: 'Delete',
          action: this.deleteItem,
        },
      ]);
    }

    if (this.props.setOtherButtons) {
      this.props.setOtherButtons([{
        label: 'Delete',
        action: this.delete,
      }]);
    }
  }

  renderItems = bucketlist => bucketlist.items
    .slice(this.state.page * 5, (this.state.page * 5) + 5)
    .map(item => (
      <TouchableOpacity
        key={item.id}
        onLongPress={() => (
          (this.props.bucketlist.userId === this.props.profile.id && this.props.mode) ?
            this.openMenu(item) :
            () => {}
        )}
        delayLongPress={500}
        activeOpacity={1}
      >
        <View
          style={styles.item}
        >
          <Text numberOfLines={2} style={styles.commentUser}>{item.name}</Text>
          <CheckBox
            value={item.done}
            onValueChange={() => this.onDone(item)}
            disabled={this.props.bucketlist.userId !== this.props.profile.id}
          />
        </View>
      </TouchableOpacity>
    ))

  render = () => {
    const { bucketlist } = this.props;
    const { page } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.props.closeMenu} style={styles.touchArea}>
        <View style={styles.stretch}>
          <View style={[styles.commentSection, {
            alignItems: 'stretch',
          }]}
          >
            <View style={styles.buttonRow}>
              {
                this.props.bucketlist.userId === this.props.profile.id && this.props.mode &&
                <TouchableOpacity
                  onPress={() => this.openForm({
                    type: 'Add',
                    name: 'item',
                  })}
                  style={[styles.value, { justifyContent: 'flex-start' }]}
                >
                  <Text style={styles.commentNavigator}>Add item</Text>
                </TouchableOpacity>
              }
              {
                !!bucketlist.items &&
                <View style={styles.navigationButtons}>
                  {
                    bucketlist.items.length > 0 && page > 0 &&
                    <TouchableOpacity
                      style={[styles.value, {
                        justifyContent: 'flex-start',
                      }]}
                      onPress={() => this.navigatePage('previous')}
                    >
                      <Text style={styles.commentNavigator}>previous</Text>
                    </TouchableOpacity>
                  }
                  {
                    bucketlist.items.length > 0 &&
                    bucketlist.items.length > ((page + 1) * 5) &&
                    <TouchableOpacity
                      style={[styles.value, {
                        justifyContent: 'flex-start',
                      }]}
                      onPress={() => this.navigatePage('next')}
                    >
                      <Text style={styles.commentNavigator}> next</Text>
                    </TouchableOpacity>
                  }
                </View>
              }
            </View>
            {this.renderItems(bucketlist) }
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

Items.propTypes = propTypes;

Items.defaultProps = {
  bucket: {
    id: '',
    comments: [],
    items: [],
  },
  mode: null,
};

export default Items;
