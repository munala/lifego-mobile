import { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
} from 'react-native';

import RenderAndroid from './RenderRow.android';
import RenderIos from './RenderRow.ios';

class BucketListRow extends Component {
  constructor(props, context) {
    super(props, context);
    this.styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        height: 70,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#05A5D1',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      label: {
        padding: 5,
        color: '#fafafa',
        fontSize: 20,
        fontWeight: '600',
      },
      doneButton: {
        padding: 5,
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
        borderRadius: 5,
        backgroundColor: '#eaeaea',
      },
    });
  }
  render() {
    const Render = Platform.OS === 'ios' ? RenderIos : RenderAndroid;
    return Render.bind(this)(this.styles);
  }
}

BucketListRow.propTypes = {
  bucketlist: PropTypes.object,
};

export default BucketListRow;
