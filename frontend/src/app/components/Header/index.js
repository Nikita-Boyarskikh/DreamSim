import { connect } from 'react-redux';

import './styles.scss';
import Component from './Header';

import { closeMenu, openMenu, toggleMenu } from 'app/state/actions/ui/menu';

const mapStateToProps = (state) => ({ title: state.local.ui.pageTitle }),

      mapDispatchToProps = (dispatch) => ({ openMenu, closeMenu, toggleMenu });

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
