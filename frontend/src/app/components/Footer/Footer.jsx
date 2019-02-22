import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar/AppBar';
import BottomNavigation from '@material-ui/core/BottomNavigation/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction/BottomNavigationAction';

const Footer = ({ buttons }) => {
  const activeIndex = buttons.findIndex((btn) => btn.active);

  return (
    <AppBar position="fixed" className="footer" component="footer">
      <BottomNavigation value={activeIndex} showLabels>
        {buttons.map((button) => <BottomNavigationAction component={Link}
          to={button.url}
          label={button.title}
          icon={button.icon}
          key={button.id}
          onClick={(e) => button.id === activeIndex && e.preventDefault()}
          className={`footer__tab ${button.className || ''}`} />)}
      </BottomNavigation>
    </AppBar>
  );
};

Footer.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    id:        PropTypes.number.isRequired,
    url:       PropTypes.string.isRequired,
    title:     PropTypes.string,
    className: PropTypes.string,
    icon:      PropTypes.func,
    active:    PropTypes.bool.isRequired,
  })).isRequired,
};

export default Footer;
