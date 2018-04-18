import React from 'react';
import { ScrollView, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bucketlistActions from '../../../../../actions/bucketlistActions';
import * as commentActions from '../../../../../actions/commentActions';
import * as likeActions from '../../../../../actions/likeActions';
import * as navigationActions from '../../../../../actions/navigationActions';
import { handleHeader } from '../../../../../actions/componentActions';
import Text from '../../../../Common/SuperText';
import SingleCard from '../SingleCard/SingleCard';
import styles from '../../styles';
import propTypes from './propTypes';
import BaseClass from './BaseClass';

class Bucketlist extends BaseClass {
  state = {
    submitted: true,
    comm: { content: '' },
    imageHeights: {},
    showComments: true,
    comment: {},
  }

  componentDidMount = () => {
    const { imageHeights } = this.state;
    const { bucketlist } = this.props;
    if (!bucketlist) {
      this.props.actions.navigate({ navigator: 'allBucketlists', route: 'bucketlists' });
    } else if (bucketlist.pictureUrl) {
      Image.getSize(bucketlist.pictureUrl.replace('http', 'https'), (width, height) => {
        const { width: windowWidth } = Dimensions.get('window');
        const factor = width / windowWidth;
        imageHeights[bucketlist.name] = { width: windowWidth - 10, height: height / factor };
        this.setState({ imageHeights });
      });
    }
  }

  componentDidUpdate = ({ bucketlist, actions: { navigate } }, { submitted }) => {
    if (!bucketlist) {
      navigate({ navigator: 'allBucketlists', route: 'bucketlists' });
    } else if (!submitted) {
      this.setState({ submitted: true });
    }
  }

  render() {
    const {
      bucketlist, profile, actions: { navigate, deleteComment },
      params,
    } = this.props;
    const { comment: selectedComment } = this.state;
    const navigator = params.from === 'bucketlists' ? 'allBucketlists' : 'home';
    const { createdAt, time } = this.setTime(bucketlist);
    const bucketlistProps = {
      bucketlist,
      bucketList: bucketlist,
      createdAt,
      time,
      profile,
      toggleComments: this.toggleComments,
      showComments: this.state.showComments,
      submitted: this.state.submitted,
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      like: this.like,
      setTime: this.setTime,
      comm: this.state.comm,
      setLikeColor: this.setLikeColor,
      imageHeights: this.state.imageHeights,
      selectComment: this.selectComment,
      selectedComment,
      deleteComment,
      mode: 'single',
    };
    return (
      <View style={styles.container}>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => navigate({ navigator, route: params.from })}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
        </View>
        <ScrollView >
          <SingleCard {...bucketlistProps} />
        </ScrollView>
      </View>
    );
  }
}
Bucketlist.propTypes = propTypes;

const mapStateToProps = ({
  navigationData: { allBucketlists: { params } },
  allData: { bucketlists },
  profile,
}) => {
  const [bucketlist] = bucketlists.filter(buck => buck.id === parseInt(params.id, 10));
  return ({
    bucketlist,
    profile,
    params,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...commentActions,
    ...likeActions,
    ...navigationActions,
    handleHeader,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
