import { connect } from 'react-redux';

import User from '../../components/App';

const mapStateToProps = ({
  authNavigator: { routeName },
}) => ({
  routeName,
});

export default connect(mapStateToProps)(User);
