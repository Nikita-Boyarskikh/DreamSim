import { connect } from 'react-redux';

import './styles.scss';
import Component from './Header';

import { openMenu } from 'app/state/actions/ui/menu';
import { logout } from 'app/state/actions/user/authorization';
import { menuItemsFromTools } from 'app/state/selectors/db/enums/tools';
import { firstMenuItems, lastMenuItems } from 'app/constants/view';

const mapStateToProps = (state) => ({
  menuItems: firstMenuItems.concat(
    menuItemsFromTools(state.db.enums.tools)
  ).concat(lastMenuItems),
  isAuthorized: state.local.user.authKey
});

const mapDispatchToProps = (dispatch) => ({
  onMenuClick: () => dispatch(openMenu()),
  logout: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
