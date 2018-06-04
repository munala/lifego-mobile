import { connect } from 'react-redux';
import Drawer from '../../containers/Drawer';

const mapStateToProps = ({
  DrawerNav: nav,
}) => ({
  nav,
});

export default connect(mapStateToProps)(Drawer);
