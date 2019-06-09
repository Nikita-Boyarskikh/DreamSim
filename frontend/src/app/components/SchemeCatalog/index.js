import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

import './styles.scss';
import Component from './SchemeCatalog';

const mapStateToProps = state => ({
  scheme: state.db.scheme.schemes
});

export default compose(
  withTranslation(),
  connect(mapStateToProps)
)(Component);
