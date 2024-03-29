import React from 'react';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import BackIcon from '@material-ui/icons/ArrowBackIos';

import { toggleMenu } from 'app/state/actions/ui/menu';

const LeftHeaderPart = ({ onMenuClick, onBackClick }) => (
  <React.Fragment>
    {onMenuClick && !onBackClick && (
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
};

export default LeftHeaderPart;
