import { Component } from 'react';
import PropTypes from 'prop-types';
import RNCalendarEvents from 'react-native-calendar-events';
import moment from 'moment';

export default class BaseClass extends Component {
  onSave = async (bucketlist, type, addToCalendar) => {
    const { actions, navigator, screen } = this.props;
    let response;
    if (type === 'Add') {
      response = await actions.saveBucketlist(bucketlist, screen);
    } else {
      response = await actions.updateBucketlist({ ...bucketlist }, screen);
    }
    if (!response.error) {
      actions.navigate({
        navigator,
        route: 'bucketlists',
      });
      if (addToCalendar === true) {
        const calendars = await RNCalendarEvents.findCalendars();
        const { id } = calendars[calendars.length - 1];
        const date = moment(response.dueDate, 'YYYY-MM-DD').utc().add(1, 'days');
        let status = RNCalendarEvents.authorizationStatus();
        if (status === 'denied' || status === 'undetermined') {
          status = RNCalendarEvents.authorizeEventStore();
        }
        if (status !== 'denied' && status !== 'undetermined') {
          const title = response.name;
          const details = {
            allDay: true,
            location: response.location || 'not specified',
            description: response.description || 'no description',
            startDate: date,
            endDate: date,
            calendarId: id,
          };
          RNCalendarEvents.saveEvent(title, details);
        }
      }
    }
  }

  onRefresh = async () => {
    await this.loadBucketlists();
  }

  setItems = (items) => {
    this.setState({ items });
  }

  setOtherItems = (otherItems) => {
    this.setState({ otherItems });
  }

  setButtons = (buttons) => {
    this.setState({ buttons });
  }

  setOtherButtons = (otherButtons) => {
    this.setState({ otherButtons });
  }

  openMenu = (selectedBucketlist, type) => {
    if (selectedBucketlist.userId === this.props.profile.id) {
      this.setState({
        showMenu: false,
        showItemMenu: false,
        [type]: true,
        selectedBucketlist,
      });
    }
  }

  closeMenu = () => {
    this.setState({
      showMenu: false,
    });
  }

  openDialog = () => {
    this.setState({
      showDialog: true,
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false,
    });
  }

  loadBucketlists = this.props.navigator === 'AllBucketlistNavigator' ?
    this.props.actions.loadAllBucketlists :
    this.props.actions.loadBucketlists

  logout = () => this.props.actions.logout();

  goToBucketlist = bucketlist => async () => {
    if (this.state.showMenu) {
      this.closeMenu();
    } else {
      this.props.actions.navigate({
        navigator: this.props.navigator,
        route: this.props.route,
        params: {
          bucketlist,
          route: this.props.route,
          from: this.props.currentRoute,
          navigator: this.props.navigator,
          fromRoute: this.props.fromRoute,
        },
      });
    }
  }

  deleteBucketlist = () => {
    this.closeMenu();
    this.openDialog();
  }

  delete = async () => {
    this.closeDialog();
    await this.props.actions.deleteBucketlist(
      this.state.selectedBucketlist,
    );
    this.setState({ selectedBucketlist: null });
  }

  editBucketlist = () => {
    this.closeMenu();
    this.showModal({
      type: 'Edit',
      name: 'bucketlist',
    }, this.state.selectedBucketlist);
  }

  showModal = async (context, content = {}) => {
    const nav = this.props.navigator;
    const route = this.props.current || this.props.currentRoute;
    this.props.actions.navigate({
      navigator: nav,
      route: 'bucketlistForm',
      params: {
        context,
        content,
        onSave: this.onSave,
        goBack: () => {
          this.props.actions.navigate({
            navigator: nav,
            route,
            params: this.props.params });
        },
      },
    });
  }
}

BaseClass.propTypes = {
  actions: PropTypes.shape({
    deleteBucketlist: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    loadAllBucketlists: PropTypes.func.isRequired,
    loadBucketlists: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.string.isRequired,
  fromRoute: PropTypes.string.isRequired,
  navigator: PropTypes.string.isRequired,
  currentRoute: PropTypes.string.isRequired,
  params: PropTypes.shape({ navigator: PropTypes.string }).isRequired,
  current: PropTypes.string.isRequired,
  profile: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};
