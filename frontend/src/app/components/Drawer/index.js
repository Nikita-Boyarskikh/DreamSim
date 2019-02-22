import { connect } from 'react-redux';

import './styles.scss';
import { closeMenu, openMenu } from '../../state/actions/ui/menu';
import Component from './Drawer';

const mapStateToProps = (state) => ({ isOpen: state.local.ui.menu.isOpen }),

      mapDispatchToProps = (dispatch) => ({
        onOpen:  openMenu,
        onClose: closeMenu,
      });

export default connect(mapStateToProps)(Component);
