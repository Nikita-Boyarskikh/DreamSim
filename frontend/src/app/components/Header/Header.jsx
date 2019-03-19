import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Drawer from 'app/components/Drawer';
import LeftHeaderPart from './LeftHeaderPart';
import Menu from './Menu';
import RightHeaderPart from './RightHeaderPart';

const Header = ({ onMenuClick, onBackClick, menuItems }) => (
  <React.Fragment>
    <AppBar position="fixed" className="header">
      <Toolbar disableGutters={true} className="header__toolbar">
        <LeftHeaderPart onBackClick={onBackClick} onMenuClick={onMenuClick} />
        <Menu menuItems={menuItems} />
        <RightHeaderPart />
      </Toolbar>
    </AppBar>
    {onMenuClick && <Drawer />}
  </React.Fragment>
);

Header.propTypes = {
  ...LeftHeaderPart.propTypes,
  ...Menu.propTypes,
  ...RightHeaderPart.propTypes,
};

export default Header;
