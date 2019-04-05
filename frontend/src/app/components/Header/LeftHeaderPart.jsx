import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBackIos';

import IconLogo from 'app/components/icons/IconLogo';
import { APP_NAME } from 'app/constants/view';
import { toggleMenu } from 'app/state/actions/ui/menu';

const LeftHeaderPart = ({ onMenuClick, onBackClick }) => (
  <React.Fragment>
    {onMenuClick && (
      <IconButton
        className="header__element header__menubutton"
        onClick={() => {
          toggleMenu();
          onMenuClick();
        }}
      >
        <MenuIcon />
      </IconButton>
    )}
    {onBackClick && (
      <IconButton
        className="header__element header__backbutton"
        onClick={onBackClick}
      >
        <BackIcon />
      </IconButton>
    )}
    {!onBackClick && !onMenuClick && (
      <div className="header__element header__element_empty" />
    )}
  </React.Fragment>
);

LeftHeaderPart.propTypes = {
  onBackClick: PropTypes.func,
  onMenuClick: PropTypes.func,
  isRootPage: PropTypes.bool,
};

export default LeftHeaderPart;
