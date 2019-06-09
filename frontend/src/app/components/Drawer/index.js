import { connect } from 'react-redux';

import './styles.scss';
import { closeMenu, openMenu } from 'app/state/actions/ui/menu';
import Component from './Drawer';

const mapStateToProps = (state) => ({
  isOpen: state.local.ui.menu.isOpen,
});
const mapDispatchToProps = (dispatch) => ({
  onOpen:  () => dispatch(openMenu()),
  onClose: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
