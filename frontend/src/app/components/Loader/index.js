import { connect } from 'react-redux';

import './styles.scss';
import Component from './Loader';

const mapStateToProps = (state) => ({
  isActive: state.local.ui.loader.active,
});

export default connect(mapStateToProps)(Component);
