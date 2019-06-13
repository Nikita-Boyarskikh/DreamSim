import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ProfileIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import LoginIcon from '@material-ui/icons/ExitToApp';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

import urls from 'app/constants/urls';

const RightHeaderPart = ({ isAuthorized, logout }) => isAuthorized ? (
  <React.Fragment>
    <IconButton
      component={Link}
      to={urls.profile}
      className="header__element header__profile"
    >
      <ProfileIcon />
    </IconButton>
    <IconButton
      component={Link}
      to={urls.settings}
      className="header__element header__settings"
    >
      <SettingsIcon />
    </IconButton>
    <IconButton
      onClick={logout}
      className="header__element header__logout"
    >
      <LogoutIcon />
    </IconButton>
  </React.Fragment>
) : (
  <IconButton
    component={Link}
    to={urls.login}
    className="header__element header__login"
  >
    <LoginIcon />
  </IconButton>
);

RightHeaderPart.propTypes = {
  isAuthorized: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

export default RightHeaderPart;
