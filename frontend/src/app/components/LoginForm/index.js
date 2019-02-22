import { connect } from 'react-redux';

import './styles.scss';
import Component from './LoginForm';

import { login, logout, signup } from 'app/state/actions/user/authorization';

const mapStateToProps = (state) => ({
  isAuthorized: state.local.user.isAuthorized,
  username: state.db.user.username,
  name: state.db.user.name,
  surname: state.db.user.surname,
  email: state.db.user.email,
});

const mapDispatchToProps = (dispatch) => ({ login, logout, signup });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
