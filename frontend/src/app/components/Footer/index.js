import { connect } from 'react-redux';

import './styles.scss';
import Component from './Footer';

const mapStateToProps = (state) => ({ buttons: state.db.enums.menuItems });

export default connect(mapStateToProps)(Component);
