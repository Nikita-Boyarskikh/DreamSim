import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Drawer from 'app/components/Drawer';
import PageTitleHandler from 'app/components/PageTitleHandler';
import LeftHeaderPart from './LeftHeaderPart';
import Menu from './Menu';
import RightHeaderPart from './RightHeaderPart';

const Header = ({ onBackClick, menuItems, onMenuClick, isAuthorized, title }) => (
  <React.Fragment>
    <PageTitleHandler title={title} />
    <AppBar position="fixed" className="header">
      <Toolbar disableGutters className="header__toolbar">
        <LeftHeaderPart onBackClick={onBackClick} onMenuClick={onMenuClick} />
        <Menu menuItems={menuItems} />
        <RightHeaderPart isAuthorized={isAuthorized} />
      </Toolbar>
    </AppBar>
    {onMenuClick && <Drawer menuItems={menuItems} />}
  </React.Fragment>
);

Header.propTypes = {
  ...PageTitleHandler.propTypes,
  ...LeftHeaderPart.propTypes,
  ...Menu.propTypes,
  ...RightHeaderPart.propTypes,
};

export default Header;
