import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  ListView,
  Text,
  View,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import * as bucketlistActions from '../../../../../actions/bucketlistActions';
import * as userActions from '../../../../../actions/userActions';
import * as commentActions from '../../../../../actions/commentActions';
import * as likeActions from '../../../../../actions/likeActions';
import * as tagActions from '../../../../../actions/tagActions';
import { handleHeader } from '../../../../../actions/componentActions';
import SingleCard from '../SingleCard/SingleCard';
import styles from '../../styles';

const dataSources = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
});

class AllBucketlists extends Component {
  state = {
    visibleModal: false,
    context: {
      name: 'bucketlist',
    },
    content: {},
    isOpen: false,
    searchText: '',
    searchMode: false,
    bucketlist: {
      id: '',
      name: '',
      description: '',
      category: '',
      location: '',
      tags: '',
    },
    comment: {
      id: '',
      content: '',
    },
    open: false,
    showComments: false,
    tagText: '',
    page: 0,
    imageHeights: {},
  };

  componentWillMount = async () => {
    this.props.actions.loadAllBucketlists();
    const { error } = this.props;
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    }
  }

  componentWillReceiveProps = async ({ allData: { bucketlists }, error }) => {
    if (error) {
      if (error === 'Unauthorised' || error === 'Invalid token') {
        this.logout();
      }
    } else
    if (bucketlists.length !== this.props.allData.bucketlists.length) {
      this.getImageHeights(bucketlists);
    }
  }

  onRefresh = () => {
    this.props.actions.loadAllBucketlists();
  }

  onChange = (text) => {
    this.setState({
      comment: { ...this.state.comment, content: text },
    });
  }

  onTextChange = (event, index, value) => {
    const bucketlist = { ...this.state.bucketlist };
    if (value) {
      bucketlist.category = value;
    } else {
      bucketlist[event.name] = event.value;
    }
    this.setState({
      bucketlist,
    });
  }

  onDateChange = (date) => {
    const bucketlist = { ...this.state.bucketlist };
    bucketlist.dueDate = date;
    this.setState({ bucketlist });
  }

  onSearchChange = (search) => {
    this.props.actions.loadAllBucketlists(null, null, search);
    this.setState({
      search,
    });
  }

  onSubmit = () => {
    const { comment, bucketlist } = this.state;
    if (comment.content) {
      this.props.actions.addComment(bucketlist, comment);
      this.setState({
        comment: {
          id: '',
          content: '',
        },
      });
    }
  }

  onSave = (bucketlist, type) => {
    const { actions } = this.props;
    if (type === 'Add') {
      actions.saveBucketlist(bucketlist);
    } else {
      actions.updateBucketlist({ ...bucketlist });
    }
  }

  getImageHeights = async (bucketlists) => {
    const imageHeights = {};
    await bucketlists.forEach((bucketlist) => {
      if (bucketlist.pictureUrl) {
        Image.getSize(bucketlist.pictureUrl.replace('http', 'https'), (width, height) => {
          const { width: windowWidth } = Dimensions.get('window');
          const factor = width / windowWidth;
          imageHeights[bucketlist.name] = { width: windowWidth - 10, height: height / factor };
          this.setState({ imageHeights });
        });
      }
    });
  }

  setTime = (bucketlist) => {
    let time = 'm';
    const difference = moment.duration(moment(Date.now())
      .diff(moment(bucketlist.createdAt)));
    let createdAt = Math.floor(difference.asMinutes());
    if (createdAt > 59) {
      createdAt = Math.floor(difference.asHours());
      time = 'h';
      if (createdAt > 23) {
        time = '';
        if (createdAt > 365) {
          createdAt = moment(bucketlist.createdAt).format('MMMM Do YYYY, HH:mm');
        } else {
          createdAt = moment(bucketlist.createdAt).format('MMMM Do, HH:mm');
        }
      }
    }
    return ({ createdAt, time });
  }

  setLikeColor = ({ likes }) => {
    let liked = false;
    if (likes) {
      likes.forEach((like) => {
        if (like.likerId === this.props.profile.id) {
          liked = true;
        }
      });
    }
    return liked ? '#00bcd4' : 'grey';
  }

  loadMore = () => {
    // this.props.actions.loadAllBucketlists(page);
  }

  like = (bucketlist) => {
    let liked = false;
    if (bucketlist.likes) {
      bucketlist.likes.forEach((like) => {
        if (like.likerId === this.props.profile.id) {
          liked = true;
          this.props.actions.unlike(like);
        }
      });
    }
    if (!liked) {
      this.props.actions.like(bucketlist);
    }
  }

  handleClose = () => {
    this.setState({
      open: false,
      gallery: [],
    });
  }

  openModal = () => {
    this.setState({
      bucketlist: {
        id: '',
        name: '',
        description: '',
        category: '',
        tags: '',
        location: '',
      },
      open: true,
      gallery: [],
    });
  }

  changePic = (pic) => {
    const bucketlist = { ...this.state.bucketlist };
    const galery = this.state.gallery;
    if (galery.length === 0) {
      galery.push(pic);
    } else {
      galery[0] = pic;
    }
    bucketlist.pictureUrl = pic.url;
    this.setState({ bucketlist, gallery: galery });
  }

  selectBucketlist = (bucketlist) => {
    this.setState({ bucketlist });
  }

  selectLocation = (location) => {
    this.setState({
      bucketlist: {
        ...this.state.bucketlist,
        location,
      },
    });
  }

  toggleComments = async (bucketlist) => {
    if (this.state.bucketlist.id !== bucketlist.id) {
      this.selectBucketlist(bucketlist);
      this.setState({
        showComments: true,
      });
    } else {
      this.setState({
        showComments: !this.state.showComments,
      });
    }
  }

  showModal = async (type, content = {}) => {
    this.props.navigation.navigate('bucketlistForm', {
      context: {
        ...this.state.context,
        type,
      },
      content,
      onSave: this.onSave,
    });
  }

  toggleSideMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  offset = 0

  handleHeader = (event) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    const direction = currentOffset > this.offset ? 'down' : 'up';
    const showHeader = direction === 'up';
    if (showHeader !== this.props.components.showHeader) {
      this.props.actions.handleHeader(showHeader);
    }
  }

  logout = () => {
    const { actions, naviGate } = this.props;
    actions.logout();
    naviGate('user');
  }

  renderRow = (bucketlist) => {
    const { createdAt, time } = this.setTime(bucketlist);
    const bucketlistProps = {
      bucketlist,
      createdAt,
      time,
      openModal: this.openModal,
      setTime: this.setTime,
      setGrid: this.setGrid,
      setLikeColor: this.setLikeColor,
      percentWidth: this.state.percentWidth,
      toggleComments: this.toggleComments,
      showComments: this.state.showComments,
      comm: this.state.comment,
      bucketList: this.state.bucketlist,
      selectBucketlist: this.selectBucketlist,
      onSubmit: this.onSubmit,
      onChange: this.onChange,
      like: this.like,
      profile: this.props.profile,
      push: this.props.navigation.navigate,
      imageHeights: this.state.imageHeights,
    };
    return (
      <SingleCard {...bucketlistProps} />
    );
  }

  render() {
    const {
      currentApiCalls,
      allData,
    } = this.props;
    const { searchText } = this.state;
    const bucketlists = allData.bucketlists
      .filter(bucketlist => bucketlist.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    return (
      <View style={styles.container}>
        {
          allData.bucketlists.length === 0 && currentApiCalls === 0 ?
            <View style={{ backgroundColor: 'transparent' }}>
              <Text style={styles.empty}>
                No bucketlists to display
              </Text>
            </View> :
            <ListView
              enableEmptySections
              key={allData.bucketlists}
              dataSource={dataSources.cloneWithRows(bucketlists)}
              renderRow={this.renderRow}
              style={styles.listView}
              onScroll={this.handleHeader}
              refreshControl={
                <RefreshControl
                  refreshing={currentApiCalls > 0}
                  onRefresh={this.onRefresh}
                  colors={['#00bcd4']}
                  tintColor="#eee"
                />
              }
            />
        }
        <ActionButton
          size={40}
          buttonColor="#00bcd4"
          fixNativeFeedbackRadius
          icon={<Icon name="add" color="#fff" />}
          onPress={() => this.showModal('Add')}
        />
      </View>
    );
  }
}

AllBucketlists.propTypes = {
  actions: PropTypes.shape({
    loadAllBucketlists: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired,
    unlike: PropTypes.func.isRequired,
    updateComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    saveBucketlist: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    addTag: PropTypes.func.isRequired,
    getTags: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired,
    handleHeader: PropTypes.func.isRequired,
  }).isRequired,
  allData: PropTypes.shape({
    bucketlists: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string,
      description: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
        done: PropTypes.bool,
      })),
      comments: PropTypes.arrayOf(PropTypes.shape({
        content: PropTypes.string,
        id: PropTypes.number,
        createdAt: PropTypes.string,
        updatedAt: PropTypes.string,
      })),
    })),
    count: PropTypes.number.isRequired,
    nextUrl: PropTypes.string,
    previousUrl: PropTypes.string,
  }).isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    pictureUrl: PropTypes.string,
    friends: PropTypes.arrayOf(PropTypes.shape({})),
    searchUsers: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    setParams: PropTypes.func.isRequired,
  }).isRequired,
  naviGate: PropTypes.func.isRequired,
  nav: PropTypes.shape({}).isRequired,
  currentApiCalls: PropTypes.number.isRequired,
  components: PropTypes.shape({
    showHeader: PropTypes.bool.isRequired,
  }).isRequired,
};

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...bucketlistActions,
      ...userActions,
      ...commentActions,
      ...likeActions,
      ...tagActions,
      handleHeader,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBucketlists);
