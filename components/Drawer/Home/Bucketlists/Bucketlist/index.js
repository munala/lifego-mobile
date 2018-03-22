import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Text from '../../../../Common/SuperText';
import SingleCard from '../SingleCard/SingleCard';
import styles from '../../styles';

class Bucketlist extends Component {
  state = {
    submitted: true,
    comm: { content: '' },
  }

  componentWillReceiveProps = ({ bucketlist: { comments } }) => {
    if (comments.length !== this.props.bucketlist.comments.length) {
      this.setState({ submitted: true });
    }
  }

  onChange = (content) => {
    this.props.navigation.state.params.onChange(content);
    this.setState({ comm: { content } });
  }

  onSubmit = () => {
    this.props.navigation.state.params.onSubmit();
    this.setState({ comm: { content: '' } });
  }

  render() {
    const {
      bucketlist, navigation: { navigate, state: { params: { setTime }, params } },
    } = this.props;
    const { createdAt, time } = setTime(bucketlist);
    const bucketlistProps = {
      ...params,
      bucketlist,
      bucketList: bucketlist,
      createdAt,
      time,
      showComments: true,
      submitted: this.state.submitted,
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      comm: this.state.comm,
    };
    return (
      <ScrollView
        contentContainerStyle={styles.container}
      >
        <TouchableOpacity onPress={() => navigate('bucketlists')}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <SingleCard {...bucketlistProps} />
      </ScrollView>
    );
  }
}
Bucketlist.propTypes = {
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        onChange: PropTypes.func,
        onSubmit: PropTypes.func,
      }),
    }),
  }).isRequired,
  bucketlist: PropTypes.shape({
    comments: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

const mapStateToProps = ({
  allData: { bucketlists },
}, {
  navigation: { state: { params: { bucketlist: { id } } } },
  navigation,
}) => {
  const [bucketlist] = bucketlists.filter(buck => buck.id === id);
  return ({
    bucketlist,
    navigation,
  });
};

export default connect(mapStateToProps)(Bucketlist);
