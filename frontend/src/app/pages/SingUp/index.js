import './styles.scss';
import Component from './SignUp';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import { signUp, connectVk } from 'app/state/actions/user/authorization';

const mapStateToProps = () => ({});
const mapDispatchToProps = {
  signUp,
  connectVk
};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(Component);
