import './styles.scss';
import Component from './Login';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { login, loginWithVk } from 'app/state/actions/user/authorization';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  login,
  loginWithVk
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
