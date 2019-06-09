import { connect } from 'react-redux';

import './styles.scss';
import Component from './Header';

import { openMenu } from 'app/state/actions/ui/menu';
import { menuItemsFromTools } from 'app/state/selectors/db/enums/tools';
import { firstMenuItems, lastMenuItems } from 'app/constants/view';

const mapStateToProps = (state) => ({
  title: state.local.ui.pageTitle,
  menuItems: firstMenuItems.concat(
    menuItemsFromTools(state.db.enums.tools)
  ).concat(lastMenuItems),
  isAuthorized: state.local.user.isAuthorized
});

const mapDispatchToProps = (dispatch) => ({
  onMenuClick: () => dispatch(openMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);
