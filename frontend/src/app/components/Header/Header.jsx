import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBackIos';

import Drawer from '../../components/Drawer';

const Header = ({ onIconClick, link, title, onMenuClick, onBackClick, toggleMenu }) => {
  const renderIconButton = () => link.url ? (
    <IconButton component={Link} to={link.url}
      className={`header__element ${link.className || ''}`}
      onClick={onIconClick} color="inherit">
      <link.Component />
    </IconButton>
  ) : (
    <IconButton className={`header__element ${link.className || ''}`} onClick={onIconClick} color="inherit">
      <link.Component />
    </IconButton>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" className="header">
        <Toolbar disableGutters={true} className="header__toolbar">
          {onMenuClick && (
            <IconButton color="inherit"
              className="header__element header__menubutton"
              onClick={() => {
                toggleMenu();
                onMenuClick();
              }}>
              <MenuIcon />
            </IconButton>
          )}
          {onBackClick && (
            <IconButton color="inherit" className="header__element header__backbutton" onClick={onBackClick}>
              <BackIcon />
            </IconButton>
          )}
          {!onBackClick && !onMenuClick && <div className="empty"/>}
          {title && (
            <Typography variant="h6" component="h1" color="inherit" className="header__element header__title">
              {title}
            </Typography>
          )}
          {onIconClick && renderIconButton()}
          {!onIconClick && <div className="empty"/>}
        </Toolbar>
      </AppBar>
      {onMenuClick && <Drawer />}
    </React.Fragment>
  );
};

Header.propTypes = {
  title:       PropTypes.string.isRequired,
  onBackClick: PropTypes.func,
  onIconClick: PropTypes.func,
  link:        PropTypes.shape({
    url:       PropTypes.string,
    className: PropTypes.string,
    Component: PropTypes.func.isRequired,
  }),
  openMenu:   PropTypes.func.isRequired,
  closeMenu:  PropTypes.func.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

export default Header;
