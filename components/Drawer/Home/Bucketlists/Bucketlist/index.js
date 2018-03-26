import React from 'react';
import { ScrollView, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as bucketlistActions from '../../../../../actions/bucketlistActions';
import * as commentActions from '../../../../../actions/commentActions';
import * as likeActions from '../../../../../actions/likeActions';
import * as tagActions from '../../../../../actions/tagActions';
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
  }

  componentWillMount = () => {
    const { imageHeights } = this.state;
    const { bucketlist } = this.props;
    if (!bucketlist) {
      this.props.navigation.navigate('bucketlists', {});
    } else if (bucketlist.pictureUrl) {
      Image.getSize(bucketlist.pictureUrl.replace('http', 'https'), (width, height) => {
        const { width: windowWidth } = Dimensions.get('window');
        const factor = width / windowWidth;
        imageHeights[bucketlist.name] = { width: windowWidth - 10, height: height / factor };
        this.setState({ imageHeights });
      });
    }
  }

  componentWillReceiveProps = ({ bucketlist, bucketlist: { comments } }) => {
    if (!bucketlist) {
      this.props.navigation.navigate('bucketlists', {});
    } else if (comments.length !== this.props.bucketlist.comments.length) {
      this.setState({ submitted: true });
    }
  }

  render() {
    const {
      bucketlist, profile, screenProps: {
        tabNavigation: { navigate },
      }, navigation: { state, navigate: navigateStack },
    } = this.props;
    const from = state && state.params && state.params.from ? state.params.from : 'bucketlists';
    const nav = from === 'bucketlists' ? navigateStack : navigate;
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
      comm: this.state.comm,
      setLikeColor: this.setLikeColor,
      imageHeights: this.state.imageHeights,
    };
    return (
      <View style={styles.container}>
        <View style={styles.navButtons}>
          <TouchableOpacity onPress={() => nav(from)}>
            <Text style={styles.backButton}>Back</Text>
          </TouchableOpacity>
          {from !== 'bucketlists' && <Text style={styles.separator}>|</Text>}
          {
            from !== 'bucketlists' &&
            <TouchableOpacity onPress={() => navigateStack('bucketlists', { id: undefined })}>
              <Text style={styles.backButton}>Home</Text>
            </TouchableOpacity>
          }
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
  allData: { bucketlists },
  profile,
}, {
  navigation: { state: { params: { id, from } } },
  navigation,
}) => {
  const [bucketlist] = bucketlists.filter(buck => buck.id === parseInt(id, 10));
  return ({
    bucketlist,
    navigation,
    profile,
    from,
  });
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...bucketlistActions,
    ...commentActions,
    ...likeActions,
    ...tagActions,
    handleHeader,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bucketlist);
