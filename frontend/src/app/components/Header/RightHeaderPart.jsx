import React from 'react';
import { Link } from 'react-router-dom';

import IconButton from '@material-ui/core/IconButton';
import ProfileIcon from '@material-ui/icons/PermIdentity';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

const RightHeaderPart = () => (
  <React.Fragment>
    <IconButton
      component={Link}
      to={'/profile'}
      className="header__element header__profile"
    >
      <ProfileIcon />
    </IconButton>
    <IconButton
      component={Link}
      to={'/settings'}
      className="header__element header__settings"
    >
      <SettingsIcon />
    </IconButton>
    <IconButton
      component={Link}
      to={'/logout'}
      className="header__element header__logout"
    >
      <LogoutIcon />
    </IconButton>
  </React.Fragment>
);

export default RightHeaderPart;
