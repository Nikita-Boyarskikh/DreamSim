import './styles.scss';
import Component from './Editor';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

const mapStateToProps = () => ({});
const mapDispatchToProps = {};

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
)(Component);
